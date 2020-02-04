using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.DTO
{
    public class LoginResult
    {
        public bool Status { get; set; }
        public string Platform { get; set; }
        public string User { get; set; }

        public string Error { get; set; }
        public string ErrorDescription { get; set; }

        public string Token { get; set; }
    }
}
