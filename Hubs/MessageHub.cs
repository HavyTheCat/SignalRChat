using Microsoft.AspNetCore.SignalR;
using SignalRChat.Data.Entities;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class MessageHub : Hub 
    {
        public async Task NewMessage(Message msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
