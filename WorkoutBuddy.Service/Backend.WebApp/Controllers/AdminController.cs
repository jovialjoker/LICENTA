using Backend.BusinessLogic.Exercises;
using Backend.WebApp.Code.Base;
using Backend.WebApp.Code.Utils;
using Microsoft.AspNetCore.Mvc;
using WorkoutBuddy.BusinessLogic.AdminDashboard;

namespace Backend.WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : BaseController
    {
        private readonly ExerciseService _service;
        private readonly AdminService _adminService;
        public AdminController(ControllerDependencies dependencies, ExerciseService service, AdminService adminService) : base(dependencies)
        {
            _service = service;
            _adminService = adminService;
        }

        [HttpGet("getPendingExercises")]
        [Authorize("admin")]
        public IActionResult GetPendingExercises()
        {
            var exercises = _service.GetPendingExercises();
            return Ok(exercises);
        }

        [HttpGet("getAllUsers")]
        [Authorize("admin")]
        public IActionResult GetAllUsers()
        {
            var list = _adminService.GetUsers();
            return Ok(list);
        }
    }
}
