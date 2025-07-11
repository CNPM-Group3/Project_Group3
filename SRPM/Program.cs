using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SRPM.API.Services;
using SRPM.Data;
using SRPM.Data.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080); // lắng nghe tất cả IP trên port 8080
});
// Add services
builder.Services.AddLogging();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IAuthService, AuthService>();
// builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.AddScoped<IEvaluationService, EvaluationService>();
builder.Services.AddScoped<IEvaluationRepository, EvaluationRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IResearchTopicService, ResearchTopicService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFundingRequestService, FundingRequestService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IResearchTopicRepository, ResearchTopicRepository>();
builder.Services.AddScoped<IFundingRequestRepository, FundingRequestRepository>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add HttpClient for Google API calls
builder.Services.AddHttpClient<IGoogleAuthService, GoogleAuthService>();

// Configure CORS - Allow all origins for debugging
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";


// Cấu hình Swagger với base path "api/v1"
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SRPM API", Version = "v1" });
    c.EnableAnnotations();
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Configure Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Configure Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
    options.AddPolicy("RequireStaffRole", policy => policy.RequireRole("Staff"));
    options.AddPolicy("RequirePIRole", policy => policy.RequireRole("PrincipalInvestigator"));
    options.AddPolicy("RequireResearcherRole", policy => policy.RequireRole("Researcher"));
    options.AddPolicy("RequireHostInstitutionRole", policy => policy.RequireRole("HostInstitution"));
    options.AddPolicy("RequireAppraisalCouncilRole", policy => policy.RequireRole("AppraisalCouncil"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:8081",
        "https://25a7-171-249-81-184.ngrok-free.app")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build(); // ✅ Khởi tạo app trước khi dùng

app.UseCors("AllowFrontend"); // ✅ Bây giờ 'app' đã tồn tại

// Swagger bật với base path /api/v1
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SRPM API V1");
    c.RoutePrefix = "api/v1"; // Khi truy cập http://domain:8080/api/v1 sẽ ra swagger UI
});

// Authentication and Authorization AFTER CORS
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Tự động apply migration
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

// Chạy server ở tất cả IP trên port 8080
app.Run();
