using SignalRChat.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Services.Repository
{
    public interface IRoomsRepository
    {
        Task<IList<ChatRooms>> GetRooms();

        Task<ChatRooms> GetRoom(Guid id);

        Task<IList<ChatRooms>> GetUsersRooms(AppUser user);

        Task<bool> Add(ChatRooms room);

        Task<bool> SaveAsync();
    }
}
