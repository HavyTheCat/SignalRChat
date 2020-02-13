using Microsoft.EntityFrameworkCore;
using SignalRChat.Data;
using SignalRChat.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Services.Repository
{
    public class RoomsRepository: IRoomsRepository
    {
        private SignalRChatContext _ctx;
        public RoomsRepository(SignalRChatContext context)
        {
            _ctx = context;
        }

        public async Task<ChatRooms> GetRoom(Guid id)
        {
            return await _ctx.ChatRooms.Where(c => c.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IList<ChatRooms>> GetUsersRooms(AppUser user)
        {
            return await _ctx.ChatRooms.Where(c => c.Users.Contains(user)).ToListAsync();
        }

        public async Task<IList<ChatRooms>> GetRooms()
        {
            return await _ctx.ChatRooms.ToListAsync();
        }

        public async Task<bool> Add(ChatRooms rooms)
        {
            await _ctx.ChatRooms.AddAsync(rooms);
            return await SaveAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return (await _ctx.SaveChangesAsync() >= 0);
        }

    }
}
