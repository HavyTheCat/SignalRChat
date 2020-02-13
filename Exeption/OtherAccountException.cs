using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Exeption
{
    internal class OtherAccountException : Exception
    {
        public OtherAccountException()
        {
        }

        public OtherAccountException(string message) : base(message)
        {
        }

        public OtherAccountException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected OtherAccountException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
