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
    }
}