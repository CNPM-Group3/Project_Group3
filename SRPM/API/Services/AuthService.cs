using Microsoft.IdentityModel.Tokens;
using SRPM.API.Models;
using SRPM.Data.Entities;
using SRPM.Data.Repositories;
using SRPM.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Task = System.Threading.Tasks.Task;
using Google.Apis.Auth; 
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace SRPM.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public interface IGoogleAuthService
        {
            string GetGoogleAuthUrl(string action);
            Task<AuthResponse> HandleGoogleCallbackAsync(string code, string action);
        }
        public AuthService(IUserRepository userRepository, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _dbContext = dbContext;
        }
        private int GetRoleIdFromEmail(string email)
        {
            email = email.ToLower();

            if (email == "admin@ut.edu.vn") return 1; // ID của Admin
            if (email == "staff@ut.edu.vn") return 2; // ID của Staff
            if (email == "hdtd@ut.edu.vn") return 6; // ID của AppraisalCouncil
            if (email.EndsWith("@gv.edu.vn")) return 5; // ID của HostInstitution
            if (email.EndsWith("@ut.edu.vn")) return 4; // ID của Researcher

            return 4; // Default fallback: Researcher
        }


        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            // Check if the user exists
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // Verify the password
            if (!VerifyPasswordHash(request.Password, user.PasswordHash))
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Invalid email or password."
                };
            }

            // Generate JWT token
            var token = await GenerateJwtTokenAsync(user);

            return new AuthResponse
            {
                Success = true,
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    AvatarUrl = user.AvatarUrl,
                    Roles = (await _userRepository.GetUserRolesAsync(user.Id)).Select(r => r.Name).ToList()
                }
            };
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            // Check if the user already exists
            var existingUser = await _userRepository.GetByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Người dùng tồn tại"
                };
            }

            // Validate password
            if (string.IsNullOrWhiteSpace(request.Password) || request.Password.Length < 6)
            {
                return new AuthResponse
                {
                    Success = false,
                    Message = "Password must be at least 6 characters long."
                };
            }

            // Create password hash
            string passwordHash = CreatePasswordHash(request.Password);

            // Create a new user
            var user = new User
            {
                Email = request.Email,
                Name = request.Name,
                PasswordHash = passwordHash
            };

            await _userRepository.CreateAsync(user);

            var roleId = GetRoleIdFromEmail(request.Email);
            await _userRepository.AddUserRoleAsync(user.Id, roleId);

            // Generate JWT token
            var token = await GenerateJwtTokenAsync(user);

            return new AuthResponse
            {
                Success = true,
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    AvatarUrl = user.AvatarUrl,
                    Roles = (await _userRepository.GetUserRolesAsync(user.Id)).Select(r => r.Name).ToList()
                }
            };
        }

        public async Task<string> GenerateJwtTokenAsync(User user)
        {
            var roles = await _userRepository.GetUserRolesAsync(user.Id);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.Name)
            };

            // Add role claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT key is missing from configuration.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryInMinutes"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string CreatePasswordHash(string password)
        {
            // Generate a random salt
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Hash the password with the salt
            byte[] hash;
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256))
            {
                hash = pbkdf2.GetBytes(32);
            }

            // Combine salt and hash
            byte[] hashBytes = new byte[48];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 32);

            // Convert to base64 string
            return Convert.ToBase64String(hashBytes);
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            // Convert from base64 string
            byte[] hashBytes = Convert.FromBase64String(storedHash);

            // Extract salt
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Hash the input password with the extracted salt
            byte[] hash;
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256))
            {
                hash = pbkdf2.GetBytes(32);
            }

            // Compare the computed hash with the stored hash
            for (int i = 0; i < 32; i++)
            {
                if (hashBytes[i + 16] != hash[i])
                {
                    return false;
                }
            }

            return true;
        }
        public async Task<AuthResponse> LoginWithGoogleAsync(GoogleLoginRequest request)
        {
            var payload = await VerifyGoogleTokenAsync(request.GoogleToken);
            if (payload == null)
            {
                return new AuthResponse { Success = false, Message = "Invalid Google token." };
            }


            var user = await _userRepository.GetByEmailAsync(payload.Email);
            if (user == null)
            {
                // Auto register
                user = new User
                {
                    Email = payload.Email,
                    Name = payload.Name,
                    PasswordHash = string.Empty
                };
                await _userRepository.CreateAsync(user);
                var roleId = GetRoleIdFromEmail(user.Email);
                await _userRepository.AddUserRoleAsync(user.Id, roleId);

            }

            var token = await GenerateJwtTokenAsync(user);
            return new AuthResponse
            {
                Success = true,
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Roles = (await _userRepository.GetUserRolesAsync(user.Id)).Select(r => r.Name).ToList()
                }
            };
        }
        
        private async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleTokenAsync(string googleToken)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string> { _configuration["Google:ClientId"] }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(googleToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Google token validation failed: " + ex.Message);
                return null;
            }
        }
        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
                return null;

            var roles = await _userRepository.GetUserRolesAsync(user.Id);
            
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                AvatarUrl = user.AvatarUrl,
                BackgroundUrl = user.BackgroundUrl,
                SocialLinks = string.IsNullOrEmpty(user.SocialLinks) 
                    ? new List<string>() 
                    : JsonSerializer.Deserialize<List<string>>(user.SocialLinks) ?? new List<string>(),
                Roles = roles.Select(r => r.Name).ToList(),
                IsGoogleUser = string.IsNullOrEmpty(user.PasswordHash), // Giữ nguyên nếu dùng empty string
                CreatedAt = user.CreatedAt
            };
        }
    }
}
