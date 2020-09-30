using BackEnd.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd
{
    public class CourseViewModel
    {

        public string Name { get; set; }
        public List<CourseViewModel.StudentViewModel> Students { get; set; }

        public CourseViewModel()
        {
            Students = new List<CourseViewModel.StudentViewModel>();
        }

        public class StudentViewModel
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }

    }
}
