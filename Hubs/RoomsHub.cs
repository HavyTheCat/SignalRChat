using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Data.DTO;
using SignalRChat.Data.Entities;
using SignalRChat.Services.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class RoomsHub : Hub
    {
        private IRoomsRepository _roomRep;
        private IMessageRepository _msgRep;
        private UserManager<AppUser> _userManager;
        private IMapper _mapper;
        public RoomsHub(IRoomsRepository roomrepository,
                        IMessageRepository mesagerepository,
                         UserManager<AppUser> userManager,
                         IMapper map)
        {
            _roomRep = roomrepository;
            _msgRep = mesagerepository;
            _userManager = userManager;
            _mapper = map;
        }

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }


        public async Task JoinGroup(string roomName)
        {
            var email = Context.User.Identity.Name;
            var user = await _userManager.FindByEmailAsync(email);
            var userRoomList = await _roomRep.GetUsersRooms(user);

            foreach (var room in userRoomList)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.Id.ToString());
            }

            if (Guid.TryParse(roomName, out Guid guidId))
            {
                var room = await _roomRep.GetRoom(guidId);
                room.Users.Add(user);
                await _roomRep.SaveAsync();
                await Groups.AddToGroupAsync(Context.ConnectionId, room.Id.ToString());
            }
           
        }
        public async Task LeaveGroup(string roomName)
        {
            var email = Context.User.Identity.Name;
            var user = await _userManager.FindByEmailAsync(email);
            if (Guid.TryParse(roomName, out Guid guidId))
            {
                var room = await _roomRep.GetRoom(guidId);
                room.Users.Remove(user);
                await _roomRep.SaveAsync();
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.Id.ToString());
            }
        }

        public async Task CreateRoom(string room)
        {
            if (!string.IsNullOrEmpty(room))
            {
                var newRoom = new ChatRooms { Name = room };
                await _roomRep.Add(newRoom);
                await Clients.All.SendAsync("room", newRoom);
            }
        }

        public async Task Send(string groupid, MessageVM message)
        {
            if (Guid.TryParse(groupid, out Guid guidId))
            {
                var room = await _roomRep.GetRoom(guidId);
                var email = Context.User.Identity.Name;
                var user = await _userManager.FindByEmailAsync(email);
                var msg = new Message
                {
                    Id = Guid.NewGuid(),
                    MessageText = message.message,
                    sender = user,
                    Date = message.createAt,
                    ChatRoom = room
                };
                await _msgRep.Add(msg);
                await Clients.Group(groupid).SendAsync("message", _mapper.Map<MessageVM>(msg));
            }
        }


        public async Task GetRooms()
        {
            var roomlist = await _roomRep.GetRooms();
            foreach(var room in roomlist)
                await Clients.Caller.SendAsync("room", room);
        }
    }
}