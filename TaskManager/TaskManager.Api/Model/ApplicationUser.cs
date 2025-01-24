using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Add custom properties here
        public required string FullName { get; set; }
    }
}
