using Backend.BusinessLogic.Implementation.UserSplitColection;
using Backend.BusinessLogic.Implementation.UserSplitColection.Models;
using Backend.WebApp.Code.Base;
using Backend.WebApp.Code.Utils;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;

namespace Backend.WebApp.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UserSplitController : BaseController
    {
        private readonly UserSplitService service;
        private readonly IConfiguration Configuration;
        public UserSplitController(ControllerDependencies dependencies, UserSplitService service, IConfiguration configuration) : base(dependencies)
        {
            this.service = service;
            Configuration = configuration;
        }

        [HttpGet("ListOfSplits")]
        public IActionResult Index()
        {
            var idUser = CurrentUser.Id;
            var model = service.GetListOfSplits(idUser);
            return Ok(model);

        }

        [HttpGet("GetSplit")]
        public IActionResult ViewUserSplit([FromQuery]Guid id)
        {
            var model = service.GetUserSplit(id, CurrentUser.Id);
            return Ok(model);
        }

        [HttpGet("AddProgress")]
        public IActionResult AddProgress(Guid id)
        {
            var model = service.PopulateUserWorkoutModel(id);
            return Ok(model);
        }

        [HttpPost("AddProgress")]
        public IActionResult AddProgress([FromBody] UserWorkoutModel model)
        {
            model.UserId = CurrentUser.Id;
            service.AddProgress(model, 3);

            return Ok();
        }

        [HttpGet("WorkoutHistory")]
        public IActionResult WorkoutHistory(Guid id)
        {
            var model = service.GetHistory(id, CurrentUser.Id);
            return Ok(model);
        }

        [HttpPost("GetDates")]
        public IActionResult GetDates([FromBody] DatesModel model)
        {
            var dates = service.GetDates(model.Index, Guid.Parse(model.WorkoutId), CurrentUser.Id, Int32.Parse(Configuration["NoOfDates"]));
            return Ok(dates);
        }

        [HttpGet("GetHistory")]
        public IActionResult GetHistory(HistoryRequestModel model)
        {
            var workoutId = Guid.Parse(model.WorkoutId);
            var date = DateTime.Parse(model.Date);
            var workout = service.GetHistoryFor(workoutId, date, CurrentUser.Id);
            return Ok(workout);
        }

        [HttpGet("GetExercisesProgress")]
        public IActionResult ExercisesProgress(Guid id, int index)
        {
            var model = service.GetProgress(id, CurrentUser.Id, index, Int32.Parse(Configuration["NoOfDates"]));

            return Ok(model);
        }

        [HttpPost("RemoveUserSplit")]
        public IActionResult RemoveUserSplit(Guid id)
        {
            service.RemoveSplit(id, CurrentUser.Id);
            return Ok();
        }
    }
}
