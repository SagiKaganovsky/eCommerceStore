using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using StoreAPI.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StoreAPI.Services
{
    public class TokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public TokenService(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        public async Task<string> GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.UserName),
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var signingKey = Convert.FromBase64String(_configuration["JWTSettings:TokenKey"]);
            var key = new SymmetricSecurityKey(signingKey);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var expirationInDays = Convert.ToDouble(_configuration["JWTSettings:ExpirationInDays"]);
            var tokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddDays(expirationInDays),
                signingCredentials: creds
                );
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

    }
}
