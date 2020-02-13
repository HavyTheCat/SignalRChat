
using Microsoft.AspNetCore.Identity;

using SignalRChat.Data;
using SignalRChat.Data.Entities;
using System;

using System.Linq;
using System.Threading.Tasks;

namespace SignalRChat.Data
{
    public class Seeder
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignalRChatContext _ctx;

        public Seeder(SignalRChatContext ctx,
            UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _ctx = ctx;
        }
        public async Task Seed()
        {
            _ctx.Database.EnsureCreated();


            var user = await _userManager.FindByEmailAsync("test@test.test");

            if (user == null)
            {
                user = new AppUser()
                {
                    FirstName = "Steve",
                    UserName = "Smith",
                    Email = "Steve@Smith.test",
                    PhotoUrl = "http://via.placeholder.com/150x150"

                };
                var result = await _userManager.CreateAsync(user, "P@ssw0rd!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }

                user = new AppUser()
                {
                    FirstName = "Bob",
                    UserName = "Anderson",
                    Email = "Bob@Anderson.test",
                    PhotoUrl = "http://via.placeholder.com/150x150"

                };
                result = await _userManager.CreateAsync(user, "P@ssw0rd!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }
                user = new AppUser()
                {
                    FirstName = "Sally",
                    UserName = "Jones",
                    Email = "Sally@Jones.test",
                    PhotoUrl = "http://via.placeholder.com/150x150"

                };
                result = await _userManager.CreateAsync(user, "P@ssw0rd!");
                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Failed to create default user");
                }
            }

            if (!_ctx.ChatRooms.Any())
            {

                _ctx.ChatRooms.Add(new ChatRooms { Name = "MEMES" });
                var msg1 = new Message
                {
                    ChatRoom = _ctx.ChatRooms.FirstOrDefault(),
                    Date = DateTime.Now,
                    MessageText = "Sed enim velit, condimentum nec tincidunt non, elementum sed nisi.",
                    sender = _ctx.AppUsers.Where(u => u.Email == "Steve@Smith.test").FirstOrDefault(),

                };
                _ctx.Messages.Add(msg1);

                var msg2 = new Message
                {
                    ChatRoom = _ctx.ChatRooms.FirstOrDefault(),
                    Date = DateTime.Now,
                    MessageText = "Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.",
                    sender = _ctx.AppUsers.Where(u => u.Email == "Bob@Anderson.test").FirstOrDefault(),

                };
                _ctx.Messages.Add(msg2);

                var msg3 = new Message
                {
                    ChatRoom = _ctx.ChatRooms.FirstOrDefault(),
                    Date = DateTime.Now,
                    MessageText = "Ut eu elit sodales leo ultricies pulvinar. Fusce iaculis magna gravida tempus congue. Ut sit amet nulla sed nisi cursus mattis quis at lacus. Proin commodo, justo in elementum scelerisque, sem urna vulputate enim, ac posuere purus diam ac velit. Sed enim velit, condimentum nec tincidunt non, elementum sed nisi. Cras pharetra dui eu scelerisque pharetra. Curabitur auctor feugiat nibh eget molestie. Duis scelerisque auctor mi, sit amet efficitur magna vulputate quis. Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero. Praesent eu tristique felis. Nunc vestibulum enim et justo dignissim lacinia nec et diam.",
                    sender = _ctx.AppUsers.Where(u => u.Email == "Sally@Jones.test").FirstOrDefault(),

                };
                _ctx.Messages.Add(msg3);

                var msg4 = new Message
                {
                    ChatRoom = _ctx.ChatRooms.FirstOrDefault(),
                    Date = DateTime.Now,
                    MessageText = "Quisque ornare dapibus convallis. Nam tempor dui a nisl lobortis, sed gravida lectus laoreet. Nullam ornare dui magna. Duis in nisi libero.",
                    sender = _ctx.AppUsers.Where(u => u.Email == "Sally@Jones.test").FirstOrDefault(),

                };
                _ctx.Messages.Add(msg4);
                _ctx.SaveChanges();
            }
        }
    }
}
