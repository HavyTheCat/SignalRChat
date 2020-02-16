using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.DTO
{
    public class UserDTO
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string nicname { get; set; }
        public string photoUrl { get; set; }
        public string quote { get; set; }
        public string bio { get; set; }

    }
}
