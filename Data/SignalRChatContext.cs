using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using SignalRChat.Data.Entities;


namespace SignalRChat.Data
{
    public class SignalRChatContext : IdentityDbContext<AppUser>
    {
        private readonly IConfiguration _config;
        public SignalRChatContext(DbContextOptions<SignalRChatContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>().ToTable("AspNetUsers");

            builder.Entity<IdentityUserLogin<int>>(i =>
            {
                i.ToTable("UserLogins");
                i.HasKey(x => new { x.LoginProvider, x.ProviderKey });
            });

        }

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Message> Messages { get; set; }
    }

    public class SignalRChatContextDbFactory : IDesignTimeDbContextFactory<SignalRChatContext>
    {

        public SignalRChatContextDbFactory()
        {

        }
        SignalRChatContext IDesignTimeDbContextFactory<SignalRChatContext>.CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SignalRChatContext>();
            
            optionsBuilder.UseSqlServer<SignalRChatContext>("Server=(localdb)\\mssqllocaldb;Database=helloappdb;Trusted_Connection=True;");

            return new SignalRChatContext(optionsBuilder.Options);
        }
    }

}
