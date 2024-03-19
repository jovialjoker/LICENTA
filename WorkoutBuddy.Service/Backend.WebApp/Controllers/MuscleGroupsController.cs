using Backend.BusinessLogic.Implementation.MuscleGroupsService;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MuscleGroupsController : BaseController
    {
        private readonly MuscleGroupsService _muscleGroupsService;
        public MuscleGroupsController(ControllerDependencies dependencies, MuscleGroupsService _service) : base(dependencies) 
        {
            _muscleGroupsService = _service;
        }

        [HttpGet]
        public IActionResult GetMuscleGroups()
        {
            return Ok(_muscleGroupsService.GetMuscleGroupsSync());
        }
    }
}
