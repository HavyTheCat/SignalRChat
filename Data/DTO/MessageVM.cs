using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.DTO
{
    public class MessageVM
    {
        public string id { get; set; }
        public string message { get; set; }
        public DateTime createAt { get; set; }
        public UserDTO sender { get; set; }
    }
}
