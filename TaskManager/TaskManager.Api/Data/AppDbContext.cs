using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Model;

namespace TaskManager.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Taskk> Tasks { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

    }
}