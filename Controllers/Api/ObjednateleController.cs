using Microsoft.AspNetCore.Mvc;
using nabe.order.management.Repository;

namespace nabe.order.management.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/objednatele")]
    public class ObjednateleController : Controller
    {
        private readonly ObjednateleRepo _objednateleRepo;

        public ObjednateleController()
        {
            _objednateleRepo = new ObjednateleRepo();
        }

        [HttpGet]
        [Route("")]
        public ActionResult Objednatele()
        {
            return Ok(_objednateleRepo.GetAll());
        }
    }
}