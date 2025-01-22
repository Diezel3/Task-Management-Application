using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TaskManager.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


// Add services to the container
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity services
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers();

var app = builder.Build();

// Migrate database changes at runtime
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

// Enable CORS
app.UseCors("AllowFrontend");

// Middleware pipeline
app.UseDeveloperExceptionPage();
app.UseAuthentication(); // Enable Authentication middleware
app.UseAuthorization();  // Enable Authorization middleware
app.MapControllers();

app.UseMiddleware<TaskManager.Api.Middleware.ExceptionMiddleware>();
app.Run();



