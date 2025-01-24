using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TaskManager.Api.Model
{
    public class ApplicationUser : IdentityUser
    {
        // Custom properties here E.g Profile Picture, etc.
        public required string FullName { get; set; }
    }
}
