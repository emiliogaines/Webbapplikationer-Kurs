using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        // GET: api/<CoursesController>
        [HttpGet]
        public IEnumerable<CourseViewModel> Get()
        {
            return fetch();
        }

        // GET api/<CoursesController>/5
        [HttpGet("{id}")]
        public IEnumerable<CourseViewModel> Get(int id)
        {
            return fetch(id);
        }

        // POST api/<CoursesController>
        [HttpPost]
        public string Post([FromQuery] string name)
        {
            if (name == null || (name != null && name.Trim().Length == 0))
            {
                return Callback.Statement(Callback.StatusType.ERROR);
            }

            var context = new ApplicationDBContext();
            var student = new Course { Name = name };
            context.Courses.Add(student);
            context.SaveChanges();

            return Callback.Statement(Callback.StatusType.SUCCESS);
        }

        // DELETE api/<CoursesController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            var context = new ApplicationDBContext();
            var course = context.Courses.ToList().Find(x => x.ID == id);
            if (course != null)
            {
                context.Courses.Remove(course);
                var studentCourses = context.StudentCourses.ToList().FindAll(x => x.CourseID == id);
                foreach (var sc in studentCourses)
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

        private List<CourseViewModel> fetch(int id = -1)
        {
            // Allt detta är en workaround för att få ut normal JSON !!

            var context = new ApplicationDBContext();
            var courses = context.Courses.ToList();
            var students = context.Students.ToList();
            var studentCourses = context.StudentCourses.ToList();
            List<CourseViewModel> viewModelList = new List<CourseViewModel>();

            foreach (var course in courses)
            {
                if (id != -1 && course.ID != id) continue;

                var studentCourse = studentCourses.Find(x => x.CourseID == course.ID);
                CourseViewModel viewModel = new CourseViewModel
                {
                    ID = course.ID,
                    Name = course.Name,
                    Description = course.Description,
                    Published = course.Published
                };

                foreach (var sc in studentCourses)
                {
                    if (sc.CourseID == course.ID)
                    {
                        var student = students.Find(x => x.ID == sc.StudentID);

                        viewModel.Students.Add(new CourseViewModel.StudentViewModel
                        {
                            ID = student.ID,
                            Name = student.Name,
                            Email = student.Email
                        });
                    }
                }
                viewModelList.Add(viewModel);
            }
            return viewModelList;
        }
    }
}
