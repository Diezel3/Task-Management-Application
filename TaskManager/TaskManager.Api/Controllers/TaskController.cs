using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
        public ActionResult<IEnumerable<Taskk>> GetAllTasks()
        {
            return Ok(tasks);
        }

        // POST: /Api/Task
        [HttpPost]
        public ActionResult<Taskk> CreateTask(Taskk newTask)
        {
            tasks.Add(newTask);
            return CreatedAtAction(nameof(GetAllTasks), new { id = newTask.Id }, newTask);
        }

        // GET: /Api/Task/{id}
        [HttpGet("{id}")]

        public ActionResult<Taskk> GetTaskById(int id)
        {
            var task = tasks.Find(t => t.Id == id);
            if (task == null)
            {
                return NotFound($"Task with ID {id} was not found.");
            }
            return Ok(task);
        }

        // PUT: /Api/Task/{id}
        [HttpPut("{id}")]
        public ActionResult<Taskk> UpdateTask(int id, Taskk updatedTask)
        {
            var existingTask = tasks.Find(t => t.Id == id);
            if (existingTask == null)
            {
                return NotFound($"The task with Id {id} was not found.");
            }
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.IsComplete = updatedTask.IsComplete;
            // existingTask.DueDate = updatedTask.DueDate;

            return NoContent();
        }

        // DELETE: /Api/Task/{id}
        [HttpDelete("{id}")]
        public ActionResult<Taskk> DeleteTask(int id)
        {
            var existingTask = tasks.Find(t=> t.Id == id);
            if (existingTask == null)
            {
                return NotFound($"The task with Id {id} was not found.");
            }
                tasks.Remove(existingTask);
                return NoContent();
        }
    }
}