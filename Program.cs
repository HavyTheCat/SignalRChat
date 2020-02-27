using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace SignalRChat
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }



        public static IWebHost BuildWebHost(string[] args)
        {
            var port = Environment.GetEnvironmentVariable("PORT");

            return WebHost.CreateDefaultBuilder(args)
                            .ConfigureAppConfiguration(SetupConfiguration)
                            .UseStartup<Startup>()
                            .UseUrls("http://*:"+port)
                            .Build();
        }

        private static void SetupConfiguration(WebHostBuilderContext ctx, IConfigurationBuilder builder)
        {
            builder.Sources.Clear();

            builder.AddJsonFile("appsettings.json", false, true)
                   .AddEnvironmentVariables();
        }

    }
}
