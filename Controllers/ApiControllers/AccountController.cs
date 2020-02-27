using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SignalRChat.Services.Repository;
using AppUser = SignalRChat.Data.Entities.AppUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using SignalRChat.Data.DTO;
using SignalRChat.Exeption;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace SignalRChat.Controllers.ApiControllers
{
    [Route("api/account")]
    public class AccountController: Controller
    {
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<AppUser> _signInManager;
        private IAccountRepository _accountRepository;
        private IAuthenticationSchemeProvider _authenticationSchemeProvider;

        public AccountController(
            IAuthenticationSchemeProvider authenticationSchemeProvider,
            IMapper mapper,
            IAccountRepository accountRepository,
            ILogger<AccountController> logger,
            SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager,
            IConfiguration config)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
            _config = config;
            _userManager = userManager;
            _logger = logger;
            _signInManager = signInManager;
            _authenticationSchemeProvider = authenticationSchemeProvider;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginVM loginVM)
        {
            if (ModelState.IsValid)
            {
                var login_result = await _accountRepository.LocalLogin(loginVM.email, loginVM.password, true);
                return Ok(login_result);
            }
            return BadRequest(ModelState);

        }



        [HttpPost]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {

            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await
                        _signInManager
                        .CheckPasswordSignInAsync(user, model.Password, false);

                    if (result.Succeeded)
                    {
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        };
                        var key = new SymmetricSecurityKey
                            (Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                        var creds = new SigningCredentials
                            (key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            _config["Tokens:Issuer"],
                            _config["Tokens:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(20),
                            signingCredentials: creds
                            );

                        var results = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo
                        };
                        return Created("", results);
                    }
                }


            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpGet("providers")]
        public async Task<List<string>> Providers()
        {
            var result = await _authenticationSchemeProvider.GetRequestHandlerSchemesAsync();
            return result.Select(s => s.DisplayName).ToList();
        }


        [HttpGet("logout")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task Logout()
        {
            var email = HttpContext.User.Identity.Name;
            var user = await _userManager.FindByEmailAsync(email);
            await _signInManager.SignOutAsync();
        }


        [HttpGet("connect/{provider}")]
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLogin(string provider, string returnUrl = null)
        {
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { provider });
            var properties = _accountRepository.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpPost("signup")]
        public async Task<UserStateResponse> SignUp([FromBody] SignUpVM vm)
        {
            return await _accountRepository.CreateNewUser(_mapper.Map<AppUser>(vm), vm.Password);
            
        }



        [HttpGet("currentuser")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<UserDTO> GetCurrentUserAsync()
        {
            return _mapper.Map<UserDTO>(await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name));
        }

        [HttpPost("updateProfile")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<UserStateResponse> UpdateProfile([FromBody] UserDTO user)
        {
            var curUser = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
            curUser.Bio = user.bio;
            curUser.FirstName = user.firstName;
            curUser.Quote = user.quote;
            curUser.PhotoUrl = string.IsNullOrEmpty(user.photoUrl) ? curUser.PhotoUrl : user.photoUrl;
            var res =  await _userManager.UpdateAsync(curUser);

            if (res.Succeeded)
            {
                var token_handler = new JwtSecurityTokenHandler();
                var token = _accountRepository.CreateToken(curUser.Email);
                return new UserStateResponse
                {
                    success = true,
                    platform = "local",
                    user = _mapper.Map<UserDTO>(curUser),
                    token = token_handler.WriteToken(token),
                    tokenExpiration = token.ValidTo
                };
            }
            else
            {
                return new UserStateResponse
                {
                    success = false,
                    platform = "local",
                    message = string.Join(Environment.NewLine, res.Errors.Select(e => e.Description).ToList())
                };
            }
        }




        [HttpGet("user/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<UserDTO> GetCurrentUserAsync(string id) => _mapper.Map<UserDTO>(await _accountRepository.GetUser(id));

        [HttpGet("connect/{provider}/callback")]
        public async Task<ActionResult> ExternalLoginCallback([FromRoute]string provider)
        {
            var model = new TokenMessageVM();
            try
            {
                var login_result = await _accountRepository.PerfromExternalLogin();
                if (login_result.success)
                {
                    model.AccessToken = login_result.token;
                    model.Platform = login_result.platform;
                    return View(model);
                }
                else
                {
                    model.Error = login_result.message;
                    model.Platform = login_result.platform;
                    return View(model);
                }
            }
            catch (OtherAccountException other_account_ex)
            {
                model.Error = "Could not login";
                model.ErrorDescription = other_account_ex.Message;
                model.Platform = provider;
                return View(model);
            }
            catch (Exception ex)
            {
                model.Error = "Could not login";
                model.ErrorDescription = "There was an error with your social login";
                model.Platform = provider;
                return View(model);
            }
        }
    }
}

