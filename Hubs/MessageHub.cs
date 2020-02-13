using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Data.Entities;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class MessageHub : Hub 
    {
        public async Task NewMessage(Message msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}
