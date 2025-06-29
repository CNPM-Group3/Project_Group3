using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SRPM.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    AvatarUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    BackgroundUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    SocialLinks = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    GoogleId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    RelatedEntityType = table.Column<string>(type: "text", nullable: true),
                    RelatedEntityId = table.Column<int>(type: "integer", nullable: true),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResearchTopics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Objectives = table.Column<string>(type: "text", nullable: true),
                    ExpectedOutcomes = table.Column<string>(type: "text", nullable: true),
                    Requirements = table.Column<string>(type: "text", nullable: true),
                    AvailableFunding = table.Column<decimal>(type: "numeric", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedById = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResearchTopics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResearchTopics_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    RoleId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Objectives = table.Column<string>(type: "text", nullable: true),
                    ExpectedOutcomes = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    OwnerId = table.Column<int>(type: "integer", nullable: false),
                    ResearchTopicId = table.Column<int>(type: "integer", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_ResearchTopics_ResearchTopicId",
                        column: x => x.ResearchTopicId,
                        principalTable: "ResearchTopics",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FundingRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Amount = table.Column<decimal>(type: "numeric", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Purpose = table.Column<string>(type: "text", nullable: true),
                    JustificationDocumentUrl = table.Column<string>(type: "text", nullable: true),
                    ProjectId = table.Column<int>(type: "integer", nullable: false),
                    RequestedById = table.Column<int>(type: "integer", nullable: false),
                    ApprovedById = table.Column<int>(type: "integer", nullable: true),
                    ApprovedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FundingRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FundingRequests_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FundingRequests_Users_RequestedById",
                        column: x => x.RequestedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectMembers",
                columns: table => new
                {
                    ProjectId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    JoinedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectMembers", x => new { x.ProjectId, x.UserId });
                    table.ForeignKey(
                        name: "FK_ProjectMembers_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectMembers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompletedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProjectId = table.Column<int>(type: "integer", nullable: false),
                    AssignedToId = table.Column<int>(type: "integer", nullable: true),
                    IsMilestone = table.Column<bool>(type: "boolean", nullable: false),
                    AttachmentUrls = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_AssignedToId",
                        column: x => x.AssignedToId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Evaluations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: true),
                    Feedback = table.Column<string>(type: "text", nullable: true),
                    ProjectId = table.Column<int>(type: "integer", nullable: false),
                    TaskId = table.Column<int>(type: "integer", nullable: true),
                    EvaluatedById = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evaluations_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Evaluations_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluations_Users_EvaluatedById",
                        column: x => x.EvaluatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Administrator", "Admin" },
                    { 2, "Staff Member", "Staff" },
                    { 3, "Principal Investigator", "PrincipalInvestigator" },
                    { 4, "Researcher Member", "Researcher" },
                    { 5, "Host Institution", "HostInstitution" },
                    { 6, "Appraisal Council Member", "AppraisalCouncil" }
                });
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "CreatedAt" },
                values: new object[,]
                {
                    { 1, "admin@ut.edu.vn", "Admin User", DateTime.UtcNow },
                    { 2, "staff@ut.edu.vn", "Staff User", DateTime.UtcNow },
                    { 3, "researcher@ut.edu.vn", "Researcher User", DateTime.UtcNow },
                    { 4, "user4@ut.edu.vn","User 4",  DateTime.UtcNow },
                    { 5, "user5@ut.edu.vn", "User 5", DateTime.UtcNow },
                    { 6, "user6@ut.edu.vn","User 6",  DateTime.UtcNow },
                    { 7, "user7@ut.edu.vn", "User 7", DateTime.UtcNow },
                    { 8, "user8@ut.edu.vn", "User 8", DateTime.UtcNow },
                    { 9, "user9@ut.edu.vn", "User 9", DateTime.UtcNow },
                    { 10, "user10@ut.edu.vn", "User 10", DateTime.UtcNow },
                    { 11, "user11@ut.edu.vn", "Nguyễn Thị Mỹ Linh", DateTime.UtcNow },
                    { 12, "staff12@ut.edu.vn", "Nguyễn Thị Hồng Đào", DateTime.UtcNow },
                    { 13, "htdt@ut.edu.vn", "Minh Nguyệt", DateTime.UtcNow },
                    { 14, "daonth@gv.edu.vn", "Đào", DateTime.UtcNow },
                    { 15, "abcd@ut.edu.vn", "Nguyễn Thị A", DateTime.UtcNow },
                    { 16, "mynguyetnm4741@ut.edu.vn", "Mỹ Nguyệt", DateTime.UtcNow },
                    { 17, "admin123@ut.edu.vn", "Mỹ Nguyệt", DateTime.UtcNow }
                });
            migrationBuilder.InsertData(
                table: "Notifications",
                columns: new[] { "Id", "Title", "Message", "IsRead", "UserId", "CreatedAt" },
                values: new object[,]
                {
                    { 1, "Welcome", "Welcome to the system!", false, 1, DateTime.UtcNow },
                    { 2, "New Task Assigned", "You have a new task assigned.", false, 2, DateTime.UtcNow },
                    { 3, "Project Update", "Your project has been updated.", true, 3, DateTime.UtcNow },
                    { 9, "New Funding", "A funding request was approved.", false, 12, DateTime.UtcNow },
                    { 10, "New Project", "You have been added to a project.", false, 13, DateTime.UtcNow },
                    { 11, "Task Reminder", "Your task is due soon.", false, 14, DateTime.UtcNow },
                    { 12, "Project Status", "Project has been marked as completed.", true, 15, DateTime.UtcNow },
                    { 13, "System Update", "New system features available.", true, 16, DateTime.UtcNow },
                    { 14, "Account Notice", "Your profile is updated.", false, 17, DateTime.UtcNow }
                });
            migrationBuilder.InsertData(
                table: "ResearchTopics",
                columns: new[] { "Id", "Title", "Description", "CreatedAt", "CreatedById", "IsActive" },
                values: new object[,]
                {
                    { 1, "AI in Healthcare", "Exploring the use of AI in improving healthcare systems.", DateTime.UtcNow, 1, true },
                    { 2, "Climate Change Research", "Study the effects of climate change on agriculture.", DateTime.UtcNow, 2, true },
                    { 3, "Space Exploration", "Research into the future of space exploration and technology.", DateTime.UtcNow, 3, true }
                });
            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "UserId", "RoleId" },
                values: new object[,]
                {
                    { 1, 1 }, // Admin
                    { 2, 2 }, // Staff
                    { 3, 3 }  // Researcher
                });
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Title", "Description", "Status", "StartDate", "CreatedAt", "OwnerId" },
                values: new object[,]
                {
                    { 1, "AI in Healthcare", "Applying AI in healthcare technology.", "Active", DateTime.UtcNow, DateTime.UtcNow, 1 },
                    { 2, "Space Research", "Research on space exploration and technologies.", "Active", DateTime.UtcNow, DateTime.UtcNow, 2 },
                    { 3, "Sustainability Projects", "Focusing on sustainable practices in agriculture.", "Completed", DateTime.UtcNow, DateTime.UtcNow, 3 },
                 
                    { 4, "AIDIM Projects", "Focusing on sustainable practices in agriculture.", "Completed", DateTime.UtcNow, DateTime.UtcNow, 3 },
                    { 6, "Test Project 6", "Some description for Project 6.", "Active", DateTime.UtcNow, DateTime.UtcNow, 6 },
                    { 7, "Test Project 7", "Some description for Project 7.", "Active", DateTime.UtcNow, DateTime.UtcNow, 7 },
                    { 8, "Test Project 8", "Some description for Project 8.", "Active", DateTime.UtcNow, DateTime.UtcNow, 8 },
                    { 9, "Test Project 8", "Some description for Project 8.", "Active", DateTime.UtcNow, DateTime.UtcNow, 5 },
                    { 10, "Test Project 10", "Some description for Project 10.", "Active", DateTime.UtcNow, DateTime.UtcNow, 11 },
        
                    { 5, "AIDIM Projects", "Focusing on sustainable practices in agriculture.", "Completed", DateTime.UtcNow, DateTime.UtcNow, 15 },
                    { 11, "AI in Finance", "Utilizing AI for fraud detection and trading automation.", "Active", DateTime.UtcNow, DateTime.UtcNow, 16 },
                    { 12, "Autonomous Vehicles", "Research and development of self-driving car systems.", "Active", DateTime.UtcNow, DateTime.UtcNow, 12 },
                    { 13, "Smart City Infrastructure", "Building smart systems for traffic, lighting, and waste management.", "Completed", DateTime.UtcNow, DateTime.UtcNow, 9 },
                    { 14, "Robotics in Manufacturing", "Improving automation and efficiency with robotics.", "Active", DateTime.UtcNow, DateTime.UtcNow, 8 },
                    { 15, "Cybersecurity Initiatives", "Enhancing digital security using machine learning techniques.", "Active", DateTime.UtcNow, DateTime.UtcNow, 7 },
                    { 16, "Quantum Computing", "Exploring qubits and entanglement.", "Active", DateTime.UtcNow, DateTime.UtcNow, 13 },
                    { 17, "Bioinformatics", "Genomic data analysis with AI.", "Active", DateTime.UtcNow, DateTime.UtcNow, 14 },
                    { 18, "Digital Twin", "Replicating real-world systems in simulation.", "Active", DateTime.UtcNow, DateTime.UtcNow, 17 }

                });
            migrationBuilder.InsertData(
                table: "FundingRequests",
                columns: new[] { "Id", "Title", "Amount", "Status", "RequestedById", "CreatedAt", "ProjectId" },
                values: new object[,]
                {
                    { 1, "AI Project Funding", 50000.00m, "Pending", 1, DateTime.UtcNow, 1 },
                    { 2, "Space Research Funding", 100000.00m, "Approved", 2, DateTime.UtcNow, 2 },
                    { 3, "Sustainability Project Funding", 75000.00m, "Denied", 3, DateTime.UtcNow, 3 },
                    { 4, "AI in Finance Funding", 60000.00m, "Pending", 12, DateTime.UtcNow, 4 },
                    { 5, "Smart City Infrastructure Funding", 85000.00m, "Approved", 13, DateTime.UtcNow, 5 },
                    { 6, "Robotics in Manufacturing Funding", 92000.00m, "Approved", 14, DateTime.UtcNow, 6 },
                    { 7, "Cybersecurity Initiatives Funding", 78000.00m, "Pending", 15, DateTime.UtcNow, 7 },
                    { 8, "Autonomous Vehicles Funding", 110000.00m, "Denied", 16, DateTime.UtcNow, 8 },
                    { 9, "Digital Twin Funding", 70000m, "Pending", 17, DateTime.UtcNow, 18 }

                });
            migrationBuilder.InsertData(
                table: "ProjectMembers",
                columns: new[] { "ProjectId", "UserId", "Role", "JoinedAt" },
                values: new object[,]
                {
                    { 1, 1, "Project Owner", DateTime.UtcNow },
                    { 2, 2, "Researcher", DateTime.UtcNow },
                    { 3, 3, "Contributor", DateTime.UtcNow },
                     { 9, 12, "Contributor", DateTime.UtcNow },
                    { 10, 13, "Researcher", DateTime.UtcNow },
                    { 3, 14, "Principal Investigator", DateTime.UtcNow },
                    { 2, 15, "Principal Investigator", DateTime.UtcNow },
                    { 1, 16, "Staff", DateTime.UtcNow },
                    { 18, 17, "Advisor", DateTime.UtcNow }

                });
            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Title", "Description", "Status", "StartDate", "DueDate", "ProjectId", "AssignedToId", "IsMilestone", "CreatedAt" },
                values: new object[,]
                {
                    { 1, "Task 1 for AI Project", "Complete initial AI model design.", "In Progress", DateTime.UtcNow, DateTime.UtcNow.AddDays(10), 1, 1, true, DateTime.UtcNow },
                    { 2, "Task 2 for Space Research", "Collect data for the space project.", "Not Started", DateTime.UtcNow, DateTime.UtcNow.AddDays(15), 2, 2, false, DateTime.UtcNow },
                    { 3, "Task 3 for Sustainability", "Research sustainable farming practices.", "Completed", DateTime.UtcNow, DateTime.UtcNow.AddDays(5), 3, 3, false, DateTime.UtcNow },
                    { 4, "Task for AI in Finance", "Build AI model for fraud detection.", "In Progress", DateTime.UtcNow, DateTime.UtcNow.AddDays(7), 12, 4, true, DateTime.UtcNow },
                    { 5, "Task for Smart City", "Design smart traffic light system.", "Not Started", DateTime.UtcNow, DateTime.UtcNow.AddDays(20), 13, 5, false, DateTime.UtcNow },
                    { 6, "Task for Robotics", "Integrate robotic arms in assembly line.", "In Progress", DateTime.UtcNow, DateTime.UtcNow.AddDays(12), 14, 6, true, DateTime.UtcNow },
                    { 7, "Task for Cybersecurity", "Implement anomaly detection system.", "Completed", DateTime.UtcNow, DateTime.UtcNow.AddDays(3), 15, 7, false, DateTime.UtcNow },
                    { 8, "Task for Autonomous Vehicles", "Develop object detection module.", "Not Started", DateTime.UtcNow, DateTime.UtcNow.AddDays(18), 16, 8, false, DateTime.UtcNow },
                    { 9, "Task for SRPM", "Draft SRPM project documentation.", "In Progress", DateTime.UtcNow, DateTime.UtcNow.AddDays(8), 9, 12, true, DateTime.UtcNow },
                    { 10, "Task for AIDIM", "Review AIDIM project metrics.", "Not Started", DateTime.UtcNow, DateTime.UtcNow.AddDays(14), 10, 13, false, DateTime.UtcNow },
                    { 11, "Task for Sustainability", "Create sustainability analysis report.", "In Progress", DateTime.UtcNow, DateTime.UtcNow.AddDays(6), 3, 14, true, DateTime.UtcNow },
                    { 12, "Task for Space Research", "Compile launch data logs.", "Completed", DateTime.UtcNow, DateTime.UtcNow.AddDays(3), 2, 15, false, DateTime.UtcNow },
                    { 13, "Task for AI Project", "Set up data pipeline.", "Not Started", DateTime.UtcNow, DateTime.UtcNow.AddDays(5), 1, 16, false, DateTime.UtcNow },
                    { 14, "Task for Digital Twin", "Model simulation accuracy.", "In Progress", DateTime.UtcNow, DateTime.UtcNow.AddDays(9), 18, 17, true, DateTime.UtcNow }

                });

            migrationBuilder.InsertData(
                table: "Evaluations",
                columns: new[] { "Id", "Type", "Content", "Score", "ProjectId", "EvaluatedById", "CreatedAt" },
                values: new object[,]
                {
                    { 1, "Performance", "Performance review for AI project.", 85, 1, 1, DateTime.UtcNow },
                    { 2, "Research", "Feedback on space exploration project.", 90, 2, 2, DateTime.UtcNow },
                    { 3, "Impact", "Evaluation of sustainability project outcomes.", 78, 3, 3, DateTime.UtcNow },
                    { 7, "Feasibility", "SRPM project is on track with minor risks.", 82, 9, 12, DateTime.UtcNow },
                    { 8, "Progress", "AIDIM project has met initial milestones.", 88, 10, 13, DateTime.UtcNow },
                    { 9, "Impact", "Sustainability project is producing promising results.", 91, 3, 14, DateTime.UtcNow },
                    { 10, "Performance", "Space research shows consistent improvement.", 86, 2, 15, DateTime.UtcNow },
                    { 11, "Execution", "AI project infrastructure setup is delayed.", 74, 1, 16, DateTime.UtcNow },
                    { 12, "Innovation", "Quantum computing model review.", 89, 16, 17, DateTime.UtcNow }

                });
            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_EvaluatedById",
                table: "Evaluations",
                column: "EvaluatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_ProjectId",
                table: "Evaluations",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluations_TaskId",
                table: "Evaluations",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_FundingRequests_ProjectId",
                table: "FundingRequests",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_FundingRequests_RequestedById",
                table: "FundingRequests",
                column: "RequestedById");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectMembers_UserId",
                table: "ProjectMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_OwnerId",
                table: "Projects",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ResearchTopicId",
                table: "Projects",
                column: "ResearchTopicId");

            migrationBuilder.CreateIndex(
                name: "IX_ResearchTopics_CreatedById",
                table: "ResearchTopics",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_AssignedToId",
                table: "Tasks",
                column: "AssignedToId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Evaluations");

            migrationBuilder.DropTable(
                name: "FundingRequests");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "ProjectMembers");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "ResearchTopics");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
