using System.Collections.Generic;

namespace BackEnd.Controllers
{
    public class StudentViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public List<StudentViewModel.CourseViewModal> Courses { get; set; }

        public StudentViewModel()
        {
            Courses = new List<StudentViewModel.CourseViewModal>();
        }

        public class CourseViewModal
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public string Published { get; set; }
        }
    }
}