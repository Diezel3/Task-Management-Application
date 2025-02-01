using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Dto
{
    public class LoginDto
    {
        [Required]
        public required string UserName { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
