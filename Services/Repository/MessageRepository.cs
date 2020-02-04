using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SignalRChat.Data;
using SignalRChat.Data.Entities;

namespace SignalRChat.Services.Repository
{
    public class MessageRepository : IMessageRepository
    {
        private SignalRChatContext _context;
        public MessageRepository(SignalRChatContext context)
        {
            _context = context;
        }

        public async Task<Message> GetMessageAsync(Guid equipmentId)
        {
            return await _context.Messages
                .Where(m => m.Id == equipmentId)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Message>> GetMessagesAsync()
        {
            return await _context.Messages
                .ToListAsync<Message>();
        }

        public async Task<bool> UpdateMessage(Message message)
        {
            if (_context.Messages.Any(m => m.Id == message.Id))
                _context.Attach<Message>(message);
            else
                _context.Messages.Add(message);

            return (await _context.SaveChangesAsync() >= 0);


        }
    }
}
