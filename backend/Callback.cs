using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd
{
    public static class Callback
    {
        public static string Statement(StatusType input)
        {
            switch (input)
            {
                case StatusType.SUCCESS:
                    return "{\"status:\": \"success\"}";
                default:
                    return "{\"status:\": \"error\"}";
            }
        }

       public enum StatusType
        {
            SUCCESS,
            ERROR
        }
    }
}
