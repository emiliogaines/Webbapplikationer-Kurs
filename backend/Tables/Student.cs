using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd
{
    public class Student
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { set; get; }

        public ICollection<StudentCourse> Course { get; set; }
    }
}