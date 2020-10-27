using BackEnd.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd
{
    public class CourseViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Published { get; set; }
        public List<CourseViewModel.StudentViewModel> Students { get; set; }

        public CourseViewModel()
        {
            Students = new List<CourseViewModel.StudentViewModel>();
        }

        public class StudentViewModel
        {
            public int ID { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
        }

    }
}
