using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Data;
using TaskManager.Api.Model;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    // [AllowAnonymous]

    public class TaskController : ControllerBase
    {
        private static List<Taskk> tasks = new();

        // GET: /Api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Taskk>>> GetAllTasks([FromServices] AppDbContext dbContext)
        {
            // Get the user ID from the JWT claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Cannot determine user ID from token.");
            }

            var tasks = await dbContext.Tasks
                .Where(t => t.OwnerId == userId)
                .ToListAsync();

            return Ok(tasks);
        }

        // POST: /Api/Task
        [HttpPost]
        public async Task<ActionResult<Taskk>> CreateTask([FromBody]Taskk newTask, [FromServices] AppDbContext dbContext)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Get the user ID from the JWT claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Cannot determine user ID from token.");
            }

            newTask.OwnerId = userId;
            
            await dbContext.Tasks.AddAsync(newTask);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllTasks), new { id = newTask.Id }, newTask);
        }

        // GET: /Api/Task/{id}
        [HttpGet("{id}")]

        public async Task<ActionResult<Taskk>> GetTaskById(int id, [FromServices] AppDbContext dbContext)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Cannot determine user ID from token.");
            }

            var task = await dbContext.Tasks
                .Where(t => t.OwnerId == userId && t.Id == id)
                .FirstOrDefaultAsync();
                
            if (task == null)
            {
                return NotFound($"Task with ID {id} was not found.");
            }
            return Ok(task);
        }

        // PUT: /Api/Task/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<Taskk>> UpdateTask(int id, [FromBody]Taskk updatedTask, [FromServices] AppDbContext dbContext)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Cannot determine user ID from token.");
            }

            var existingTask = await dbContext.Tasks
                .Where(t => t.OwnerId == userId && t.Id == id)
                .FirstOrDefaultAsync();

            if (existingTask == null)
            {
                return NotFound($"The task with Id {id} was not found.");
            }
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.DueDate = updatedTask.DueDate;
            existingTask.IsComplete = updatedTask.IsComplete;
            
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: /Api/Task/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Taskk>> DeleteTask(int id, [FromServices] AppDbContext dbContext)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Cannot determine user ID from token.");
            }

            var existingTask = await dbContext.Tasks
                .Where(t => t.OwnerId == userId && t.Id == id)
                .FirstOrDefaultAsync();

            if (existingTask == null)
            {
                return NotFound($"The task with Id {id} was not found.");
            }

            dbContext.Tasks.Remove(existingTask);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}