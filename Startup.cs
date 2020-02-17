using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using SignalRChat.Data;
using SignalRChat.Data.Entities;
using SignalRChat.Hubs;
using SignalRChat.Services.Repository;
using static SignalRChat.Middleware;

namespace SignalRChat
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MapperProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            services.AddSingleton(mapper);
            services.AddHttpContextAccessor();

            services.AddIdentity<AppUser, IdentityRole>(cfg =>
            {
                cfg.User.RequireUniqueEmail = true;
                cfg.Password.RequiredLength = 6;
                cfg.Password.RequireLowercase = false;
                cfg.Password.RequireUppercase = false;
                cfg.Password.RequireNonAlphanumeric = false;
                cfg.Password.RequireDigit = false;
            }).AddEntityFrameworkStores<SignalRChatContext>()
            .AddDefaultTokenProviders();


            services.AddAuthorization();
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                sharedOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }
                )
            .AddJwtBearer(cfg =>
            {
                cfg.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidIssuer = _config["Tokens:Issuer"],
                    ValidAudience = _config["Tokens:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]))
                };

                cfg.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var authToken = context.Request.Headers["Authorization"].ToString();

                        var token = !string.IsNullOrEmpty(accessToken) ? accessToken.ToString() : !string.IsNullOrEmpty(authToken) ? authToken.Substring(7) : String.Empty;

                        var path = context.HttpContext.Request.Path;

                        // If the request is for our hub...
                        if (!string.IsNullOrEmpty(token))
                        {
                            // Read the token out of the query string
                            context.Token = token;
                        }
                        return Task.CompletedTask;
                    }
                };

            }
                );

            services.AddCors(corsOptions =>
            {
                services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .SetIsOriginAllowed((host) => true));
                });
            });

            services.AddMvc(option => option.EnableEndpointRouting = false);


          //  services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
            var connectionString = _config["connectionStrings:DefaultConnection"];
            services.AddDbContext<SignalRChatContext>(o => o.UseSqlServer(connectionString));
            services.AddTransient<Seeder>();

            services.AddScoped<IAccountRepository, AccountRepository>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IRoomsRepository, RoomsRepository>();
            services.AddSignalR().AddHubOptions<RoomsHub>(options =>
            {
                options.EnableDetailedErrors = true;
            });
            services.AddSingleton<IUserIdProvider, NameUserIdProvider>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, SignalRChatContext signalRChatContext)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected fault happend. sorry");
                    });
                });
            }
            app.UseStaticFiles();

            app.UseSignalR(options =>
            {
               // options.MapHub<MessageHub>("/MessageHub");
               
            });
            app.UseAuthentication();
            app.UseMiddleware<WebSocketsMiddleware>();
            app.UseMvc(cfg =>
            {
                cfg.MapRoute("Default",
                    "{controller}/{action}/{id?}",
                    new { Controller = "App", Action = "index" });
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<RoomsHub>("/RoomHub");
            });

            if (false)
            {
                //Seed the database
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    var seeder = scope.ServiceProvider.GetService<Seeder>();
                    seeder.Seed().Wait();
                }
            }

        }
    }
}
