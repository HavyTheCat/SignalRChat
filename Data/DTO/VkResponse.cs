using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Data.DTO
{
    public class VkResponse
    {
        public class City
        {
            public int id { get; set; }
            public string title { get; set; }
        }

        public class Response
        {
            public int id { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public bool is_closed { get; set; }
            public bool can_access_closed { get; set; }
            public string bdate { get; set; }
            public City city { get; set; }
            public string photo_50 { get; set; }
        }

        public class VkRootObject
        {
            public List<Response> response { get; set; }
        }
    }
}
