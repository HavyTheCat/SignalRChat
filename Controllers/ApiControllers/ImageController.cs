using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SignalRChat.Data.Entities;
using SignalRChat.Services.Repository;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SignalRChat.Controllers.ApiControllers
{
    [Route("api/image")]
    public class ImageController: Controller
    {
        private IWebHostEnvironment _environment;
        private IHttpContextAccessor _httpcontext;
        private readonly UserManager<AppUser> _userManager;
        private IAccountRepository _accountRepository;

        public ImageController(IWebHostEnvironment environment,
                                IHttpContextAccessor httpcontext)
        {
            _environment = environment;
            _httpcontext = httpcontext;
        }

        [HttpPost, DisableRequestSizeLimit]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> UploadProfilePic()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(_environment.WebRootPath, folderName);
                
                if (file.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    if (!Directory.Exists(pathToSave))
                    {
                        DirectoryInfo di = Directory.CreateDirectory(pathToSave);
                    }

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                       await file.CopyToAsync(stream);
                    }

                    var request = _httpcontext.HttpContext.Request;
                    var hostParam = request.Host.Value.Split(':');
                    var builder = new UriBuilder();
                    builder.Host = hostParam[0];
                    builder.Port = int.Parse(hostParam[1]);
                    builder.Scheme = request.IsHttps ? Uri.UriSchemeHttps : Uri.UriSchemeHttp;
                    builder.Path = $"{folderName.Replace('\\', '/')}/{fileName}";

                    return Ok(Json(builder.Uri.AbsoluteUri));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
