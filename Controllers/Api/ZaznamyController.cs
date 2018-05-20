using Microsoft.AspNetCore.Mvc;
using nabe.order.management.Repository;

namespace nabe.order.management.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/zaznamy")]
    public class ZaznamyController : Controller
    {
        private readonly ZaznamyRepo _zaznamyRepo;

        public ZaznamyController()
        {
            _zaznamyRepo = new ZaznamyRepo();
        }

        [HttpGet]
        [Route("")]
        public ActionResult Zaznamy()
        {
            return Ok(_zaznamyRepo.GetAll());
        }
    }
}