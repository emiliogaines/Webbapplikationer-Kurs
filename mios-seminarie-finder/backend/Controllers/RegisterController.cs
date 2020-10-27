using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        // GET: api/<RegisterController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return null;
        }

        // GET api/<RegisterController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return id.ToString();
        }

        // POST api/<RegisterController>
        [HttpPost]
        public IEnumerable<CourseViewModel> Post([FromBody] JSONPostRequest studentJson)
        {
            string name = studentJson.name;
            string email = studentJson.email;
            int courseId = studentJson.courseId;

            if (name.Trim().Length == 0 || email.Trim().Length == 0 || courseId == -1)
            {
                return new CoursesController().Get();
            }

            var context = new ApplicationDBContext();
            var matchingStudent = context.Students.ToList().Find(x => x.Name == name && x.Email == email);
            if(matchingStudent == null)
            {
                var student = new Student { Name = name, Email = email };
                context.Students.Add(student);
                context.SaveChanges();
                return Post(studentJson);
            }
            else
            {
                if(context.StudentCourses.ToList().Find(x => x.CourseID == courseId && x.StudentID == matchingStudent.ID) == null)
                {
                    var studentCourse = new StudentCourse { CourseID = courseId, StudentID = matchingStudent.ID };
                    context.StudentCourses.Add(studentCourse);
                    context.SaveChanges();
                    
                }
                return new CoursesController().Get();
            }
        }

        // PUT api/<RegisterController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }

        // DELETE api/<RegisterController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }

    public class JSONPostRequest
    {
        public string name { get; set; }
        public string email { get; set; }
        public int courseId { get; set; }
    }
}
