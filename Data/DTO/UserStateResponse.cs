using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.DTO
{
    public class UserStateResponse
    {
        public bool success { get; set; }
        public string platform { get; set; }
        public UserDTO user { get; set; }

        public string message { get; set; }
    //    public string ErrorDescription { get; set; }
        public string token { get; set; }
        public DateTime tokenExpiration { get; set; }
    }
}
