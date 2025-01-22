using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Api.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Taskk> Tasks { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

    }
}

