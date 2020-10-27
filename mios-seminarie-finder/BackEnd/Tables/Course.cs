using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd
{
    public class Course
    {

        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Published { get; set; }

        public ICollection<StudentCourse> Students { get; set; }


    }
}
