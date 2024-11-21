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
    }
}