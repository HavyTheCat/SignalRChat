using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.DTO
{
    public class SignUpVM
    {
        public string FirstName { get; set; }
        public string NicName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
