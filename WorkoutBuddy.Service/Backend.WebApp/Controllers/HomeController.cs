using Backend.DataAccess;
using Backend.WebApp.Code.Base;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : BaseController
    {
        private UnitOfWork uow;
        public HomeController(ControllerDependencies dependencies, UnitOfWork uow) : base(dependencies)
        {
            this.uow = uow;
        }

    }
}
