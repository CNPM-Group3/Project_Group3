using SRPM.API.Models;
using SRPM.Data.Repositories;
using System.Text.Json;
namespace SRPM.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return null;

            var roles = await _userRepository.GetUserRolesAsync(id);

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
                Roles = roles.Select(r => r.Name).ToList()
            };
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userRepository.GetUserRolesAsync(user.Id);

                userDtos.Add(new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    AvatarUrl = user.AvatarUrl,
                    BackgroundUrl = user.BackgroundUrl,
                    SocialLinks = string.IsNullOrEmpty(user.SocialLinks) 
                    ? new List<string>() 
                    : JsonSerializer.Deserialize<List<string>>(user.SocialLinks) ?? new List<string>(),
                    Roles = roles.Select(r => r.Name).ToList()
                });
            }

            return userDtos;
        }

        public async Task<IEnumerable<UserDto>> GetByRoleAsync(string roleName)
        {
            var users = await _userRepository.GetByRoleAsync(roleName);
            var userDtos = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userRepository.GetUserRolesAsync(user.Id);

                userDtos.Add(new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    AvatarUrl = user.AvatarUrl,
                    BackgroundUrl = user.BackgroundUrl,
                    SocialLinks = string.IsNullOrEmpty(user.SocialLinks) 
                    ? new List<string>() 
                    : JsonSerializer.Deserialize<List<string>>(user.SocialLinks) ?? new List<string>(),
                    Roles = roles.Select(r => r.Name).ToList()
                });
            }

            return userDtos;
        }

        public async Task<bool> UpdateProfileAsync(int id, UpdateProfileRequest request)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return false;

            user.Name = request.Name;
            user.AvatarUrl = request.AvatarUrl;
            user.BackgroundUrl = request.BackgroundUrl;
            user.SocialLinks = JsonSerializer.Serialize(request.SocialLinks);

            return await _userRepository.UpdateAsync(user);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return false;

            return await _userRepository.DeleteAsync(id);
        }

        public async Task<bool> AddRoleAsync(int userId, string roleName)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return false;

            // Get role ID by name (simplified - in a real app, you would have a role repository)
            int roleId;
            switch (roleName.ToLower())
            {
                case "admin":
                    roleId = 1;
                    break;
                case "staff":
                    roleId = 2;
                    break;
                case "principalinvestigator":
                    roleId = 3;
                    break;
                case "researcher":
                    roleId = 4;
                    break;
                case "hostinstitution":
                    roleId = 5;
                    break;
                case "appraisalcouncil":
                    roleId = 6;
                    break;
                default:
                    return false;
            }

            return await _userRepository.AddUserRoleAsync(userId, roleId);
        }

        public async Task<bool> RemoveRoleAsync(int userId, string roleName)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return false;

            // Get role ID by name (simplified - in a real app, you would have a role repository)
            int roleId;
            switch (roleName.ToLower())
            {
                case "admin":
                    roleId = 1;
                    break;
                case "staff":
                    roleId = 2;
                    break;
                case "principalinvestigator":
                    roleId = 3;
                    break;
                case "researcher":
                    roleId = 4;
                    break;
                case "hostinstitution":
                    roleId = 5;
                    break;
                case "appraisalcouncil":
                    roleId = 6;
                    break;
                default:
                    return false;
            }

            return await _userRepository.RemoveUserRoleAsync(userId, roleId);
        }

        public async Task<bool> UpdateUserRolesAsync(int userId, List<string> roleNames)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return false;

            // Validate all role names first
            var roleIds = new List<int>();
            foreach (var roleName in roleNames)
            {
                int roleId;
                switch (roleName.ToLower())
                {
                    case "admin":
                        roleId = 1;
                        break;
                    case "staff":
                        roleId = 2;
                        break;
                    case "principalinvestigator":
                        roleId = 3;
                        break;
                    case "researcher":
                        roleId = 4;
                        break;
                    case "hostinstitution":
                        roleId = 5;
                        break;
                    case "appraisalcouncil":
                        roleId = 6;
                        break;
                    default:
                        return false; // Invalid role name
                }
                roleIds.Add(roleId);
            }

            // Remove all existing roles
            var currentRoles = await _userRepository.GetUserRolesAsync(userId);
            foreach (var role in currentRoles)
            {
                await _userRepository.RemoveUserRoleAsync(userId, role.Id);
            }

            // Add new roles
            foreach (var roleId in roleIds)
            {
                await _userRepository.AddUserRoleAsync(userId, roleId);
            }

            return true;
        }
    }
}