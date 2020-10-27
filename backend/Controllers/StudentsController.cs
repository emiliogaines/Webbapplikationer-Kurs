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
    public class StudentsController : ControllerBase
    {
        // GET: api/<StudentsController>
        [HttpGet]
        public IEnumerable<StudentViewModel> Get()
        {
            return fetch();
        }
        // GET api/<StudentsController>/5
        [HttpGet("{id}")]
        public IEnumerable<StudentViewModel> Get(int id)
        {
            return fetch(id);
        }

        // POST api/<StudentsController>
        [HttpPost]
        public string Post([FromQuery] string name, [FromQuery] string email)
        {
            if (name == null || (name != null && name.Trim().Length == 0) && email == null || (email != null && email.Trim().Length == 0))
            {
                return Callback.Statement(Callback.StatusType.ERROR);
            }

            var context = new ApplicationDBContext();
            var student = new Student { Name = name, Email = email };
            context.Students.Add(student);
            context.SaveChanges();

            return Callback.Statement(Callback.StatusType.SUCCESS);
        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            var context = new ApplicationDBContext();
            var student = context.Students.ToList().Find(x => x.ID == id);
            if(student != null)
            {
                context.Students.Remove(student);
                var studentCourses = context.StudentCourses.ToList().FindAll(x => x.StudentID == id);
                foreach(var sc in studentCourses)
                {
                    context.StudentCourses.Remove(sc);
                }
                context.SaveChanges();
                return Callback.Statement(Callback.StatusType.SUCCESS);
            }
            else
            {
                return Callback.Statement(Callback.StatusType.ERROR);
            }
        }

        private List<StudentViewModel> fetch(int id = -1)
        {
            // Allt detta är en workaround för att få ut normal JSON !!

            var context = new ApplicationDBContext();
            var courses = context.Courses.ToList();
            var students = context.Students.ToList();
            var studentCourses = context.StudentCourses.ToList();
            List<StudentViewModel> viewModelList = new List<StudentViewModel>();

            foreach (var student in students)
            {
                if (id != -1 && student.ID != id) continue;

                var studentCourse = studentCourses.FindAll(x => x.StudentID == student.ID);
                StudentViewModel viewModel = new StudentViewModel
                {
                    Name = student.Name,
                    Email = student.Email
                };

                foreach (var sc in studentCourses)
                {
                    if (sc.StudentID == student.ID)
                    {
                        var course = courses.Find(x => x.ID == sc.CourseID);

                        viewModel.Courses.Add(new StudentViewModel.CourseViewModal
                        {
                            Name = course.Name,
                            Description = course.Description,
                            Published = course.Published
                        });
                    }
                }
                viewModelList.Add(viewModel);

            }
            return viewModelList;
        }

        
    }
}
