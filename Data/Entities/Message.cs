using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.Entities
{
    public class Message
    {
        public Guid Id { get; set; }

        public string ClientUniqueId { get; set; }
        public string Type { get; set; }
        public string MessageText { get; set; }
        public DateTime Date { get; set; }
    }
}
