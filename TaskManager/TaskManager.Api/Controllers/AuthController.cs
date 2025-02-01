using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManager.Api.Model;
using TaskManager.Api.Dto;

namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        // POST: /Api/Auth/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok("User registered successfully");
        }

        // POST: /Api/Auth/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Id))
            {
                throw new InvalidOperationException("User data is invalid. Cannot generate JWT token.");
            }

            var authClaims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var jwtSecret = _configuration["JwtSettings:Key"];
            if (string.IsNullOrEmpty(jwtSecret))
            {
                throw new InvalidOperationException("JWT Secret key is missing in the configuration.");
            }

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}