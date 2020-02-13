using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.Entities
{
    public class ChatRooms
    {
        public ChatRooms()
        {
            Users = new List<AppUser>();
        }

        public Guid Id { get; set; }

        public string Name { get; set; }

        public List<AppUser> Users { get; set; }

        public string Tag { get; set; }
    }
}
