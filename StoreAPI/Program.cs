using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using StoreAPI.Data;
using StoreAPI.Entities;
using StoreAPI.Middleware;
using StoreAPI.Services;
using System.Text.Json.Serialization;

var AllowSpecificOrigins = "_AllowSpecificOrigins";
var DefaultConnectionString = "DefaultConnection";
var JWTSettingsTokenKey = "JWTSettings:TokenKey";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt auth header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme{
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id="Bearer"
            },
            Scheme="oauth2",
            Name = "Bearer",
            In = ParameterLocation.Header

            },
            new List<string>()

        }
    });
});
// Add ConnectionString
builder.Services.AddDbContext<StoreContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString(DefaultConnectionString)));
// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                          .AllowCredentials()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddIdentityCore<User>(options =>
{
    options.User.RequireUniqueEmail = true;
})
    .AddRoles<Role>()
    .AddEntityFrameworkStores<StoreContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(builder.Configuration[JWTSettingsTokenKey]))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<TokenService>();

var app = builder.Build();
// Seed Db
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
    await DbInitializer.Initialize(context, userManager);
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem Migrate Db");
}

app.UseMiddleware<ExceptionMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AllowSpecificOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();

app.MapControllers();

await app.RunAsync();
