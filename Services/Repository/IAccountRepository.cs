using SignalRChat.Data.DTO;
using SignalRChat.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Services.Repository
{
    public interface IAccountRepository
    {

        Task<UserStateResponse> LocalLogin(string email, string password, bool remember);
        Task Logout();

        Task<AppUser> GetUser(string id);
        Task<AppUser> GetCurrentUser(ClaimsPrincipal userProperty);
        Task<List<AppUser>> GetUsers();

        Microsoft.AspNetCore.Authentication.AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl);
        Task<UserStateResponse> PerfromExternalLogin();

        Task<UserStateResponse> CreateNewUser(AppUser newUser, string password);
    }
}
