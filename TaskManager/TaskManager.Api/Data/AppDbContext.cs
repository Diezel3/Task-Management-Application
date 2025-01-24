using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace TaskManager.Api.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Taskk> Tasks { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

    }
}

