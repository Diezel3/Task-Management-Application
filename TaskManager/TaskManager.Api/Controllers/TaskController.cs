using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TaskManager.Api.Data;
using TaskManager.Api.Model;


namespace TaskManager.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class TaskController : ControllerBase
    {
        private static List<Taskk> tasks = new();

        // GET: /Api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Taskk>>> GetAllTasks([FromServices] AppDbContext dbContext)
        {
            return Ok(await dbContext.Tasks.ToListAsync());
        }

        // POST: /Api/Task
        [HttpPost]
        public async Task<ActionResult<Taskk>> CreateTask([FromBody]Taskk newTask, [FromServices] AppDbContext dbContext)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            await dbContext.Tasks.AddAsync(newTask);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAllTasks), new { id = newTask.Id }, newTask);
        }

        // GET: /Api/Task/{id}
        [HttpGet("{id}")]

        public async Task<ActionResult<Taskk>> GetTaskById(int id, [FromServices] AppDbContext dbContext)
        {
            var task = await dbContext.Tasks.FindAsync(id);
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

            var existingTask = await dbContext.Tasks.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound($"The task with Id {id} was not found.");
            }
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.IsComplete = updatedTask.IsComplete;
            
            await dbContext.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: /Api/Task/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<Taskk>> DeleteTask(int id, [FromServices] AppDbContext dbContext)
        {
            var existingTask = await dbContext.Tasks.FindAsync(id);
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