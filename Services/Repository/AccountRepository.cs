using Microsoft.Extensions.Configuration;

using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using SignalRChat.Data;
using SignalRChat.Data.Entities;
using SignalRChat.Data.DTO;
using Microsoft.EntityFrameworkCore;

namespace SignalRChat.Services.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private SignalRChatContext _context;
        private UserManager<AppUser> user_manager;
        private SignInManager<AppUser> signin_manager;
        private readonly IConfiguration _config;
        //       private JwtIssuerOptions jwtIssuerOptions;

        public AccountRepository(
            IConfiguration configuration,
            UserManager<AppUser> user_manager,
            SignInManager<AppUser> signin_manager,
            SignalRChatContext context)
        {
            this.user_manager = user_manager;
            this.signin_manager = signin_manager;
            this._context = context;
            this._config = configuration;

        }


    public async Task<LoginResult> LocalLogin(string email, string password, bool remember)
        {
            var user = await user_manager.FindByEmailAsync(email);
            var result = await signin_manager.PasswordSignInAsync(user, password, remember, false);
            if (result.Succeeded)
            {
                return new LoginResult
                {
                    Status = true,
                    Platform = "local",
                    User = user.Id,
                    Token = CreateToken(email)
                };
            }
            else
            {
                return new LoginResult
                {
                    Status = false,
                    Platform = "local",
                    Error = "Login attempt failed",
                    ErrorDescription = "Username or password incorrect"
                };
            }
        }

        public async Task Logout()
        {
            await signin_manager.SignOutAsync();
        }

        private string CreateToken(string email)
        {
            var key = new SymmetricSecurityKey
                           (Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var token_descriptor = new SecurityTokenDescriptor
            {
                Issuer = _config["Tokens:Issuer"],
                IssuedAt = DateTime.UtcNow,
                Audience = _config["Tokens:Audience"],
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7),
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, email)
            }),

                SigningCredentials = new SigningCredentials
                            (key, SecurityAlgorithms.HmacSha256)
        };
            var token_handler = new JwtSecurityTokenHandler();
            var token = token_handler.CreateToken(token_descriptor);
            var str_token = token_handler.WriteToken(token);
            return str_token;
        }
        private string CreateToken(ExternalLoginInfo info)
        {
            var identity = (ClaimsIdentity)info.Principal.Identity;
            var key = new SymmetricSecurityKey
                          (Encoding.UTF8.GetBytes(_config["Tokens:Key"]));

            var token_descriptor = new SecurityTokenDescriptor
            {
                Issuer = _config["Tokens:Issuer"],
                IssuedAt = DateTime.UtcNow,
                Audience = _config["Tokens:Audience"],
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddDays(7),
                Subject = identity,
                SigningCredentials = new SigningCredentials
                            (key, SecurityAlgorithms.HmacSha256)
            };
            var token_handler = new JwtSecurityTokenHandler();
            var token = token_handler.CreateToken(token_descriptor);
            var str_token = token_handler.WriteToken(token);
            return str_token;
        }

        public Microsoft.AspNetCore.Authentication.AuthenticationProperties ConfigureExternalAuthenticationProperties(string provider, string redirectUrl)
        {
            var properties = signin_manager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return properties;
        }

        public async Task<LoginResult> PerfromExternalLogin()
        {
            var info = await signin_manager.GetExternalLoginInfoAsync();
            if (info == null)
                throw new UnauthorizedAccessException();



            var user = await user_manager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                string username = info.Principal.FindFirstValue(ClaimTypes.Name);
                string email = info.Principal.FindFirstValue(ClaimTypes.Email);

                var new_user = new AppUser
                {
                    UserName = username,
                    Email = email,
                };
                var id_result = await user_manager.CreateAsync(new_user);
                if (!id_result.Succeeded)
                {
                    // User creation failed, probably because the email address is already present in the database
                    if (id_result.Errors.Any(e => e.Code == "DuplicateEmail"))
                    {
                        var existing = await user_manager.FindByEmailAsync(email);
                        var existing_logins = await user_manager.GetLoginsAsync(existing);

                        if (existing_logins.Any())
                        {
                            throw new Exception(existing_logins.ToString());
                        }
                        else
                        {
                            throw new Exception("Could not create account from social profile");
                        }
                    }
                }
                user = new_user;
                await user_manager.AddLoginAsync(user, new UserLoginInfo(info.LoginProvider, info.ProviderKey, info.ProviderDisplayName));
                
            }

            var result = await signin_manager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                return new LoginResult
                {
                    Status = true,
                    Platform = info.LoginProvider,
                    User = user.Id,
                    Token = CreateToken(info)
                };
            }
            else if (result.IsLockedOut)
            {
                throw new UnauthorizedAccessException();
            }
            else
            {
                throw new UnauthorizedAccessException();
            }
        }

        public async Task<AppUser> GetUser(string id)
        {
            return await _context.AppUsers.Where(u => u.Id == id).FirstOrDefaultAsync();
        }

        public Task<AppUser> GetCurrentUser(ClaimsPrincipal userProperty)
        {
            if (userProperty == null)
            {
                throw new ArgumentNullException(nameof(userProperty));
            }
            var claim = userProperty.FindFirst(ClaimTypes.NameIdentifier);
            return claim != null ? GetUser(claim.Value) : null;
        }

        public async Task<List<AppUser>> GetUsers()
        {
            return await _context.AppUsers.ToListAsync();
        }
    }
}
