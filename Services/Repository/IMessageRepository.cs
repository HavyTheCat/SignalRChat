using SignalRChat.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Services.Repository
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> GetMessagesAsync();

        Task<Message> GetMessageAsync(Guid equipmentId);

        Task<bool> UpdateMessage(Message equipment);

        Task<IList<Message>> GetRoomMessages(Guid roomId);

        Task<bool> Add(Message msg);
    }
}
