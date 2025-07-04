namespace SRPM.API.Models
{
    // public class UserDto
    // {
    //     public int Id { get; set; }
    //     public string Email { get; set; }
    //     public string Name { get; set; }
    //     public string? AvatarUrl { get; set; }
    //     public string? BackgroundUrl { get; set; }
    //     public string? SocialLinks { get; set; }
    //     public List<string> Roles { get; set; } = new List<string>();
    // }

    public class UpdateProfileRequest
    {
        public string Name { get; set; }
        public string? AvatarUrl { get; set; }
        public string? BackgroundUrl { get; set; }
        public List<string> SocialLinks { get; set; } = new();
    }

    public class AddRoleRequest
    {
        public string RoleName { get; set; }
    }
    public class UpdateUserRolesRequest
    {
        public List<string> RoleNames { get; set; } = new List<string>();
    }
}
