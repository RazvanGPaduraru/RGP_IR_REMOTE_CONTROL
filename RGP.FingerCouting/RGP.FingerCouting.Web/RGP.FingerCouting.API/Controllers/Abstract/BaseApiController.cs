using Microsoft.AspNetCore.Mvc;
using RGP.FingerCounting.Data.DBContext;
using RGP.FingerCouting.API.ActionFilters;

namespace RGP.FingerCouting.API.Controllers.Abstract
{
    [AllowCrossSiteJson]
    public abstract class BaseApiController : Controller
    {
        private readonly ApplicationDbContext _ctx;

        protected BaseApiController(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }


        public Guid CurrentUserID
        {
            //TODO: get it form current context based on identity 
            get
            {
                return Guid.Parse(_ctx.Users.Where(s => s.UserName == User.Identity.Name).FirstOrDefault().Id) ;
            }
        }
    }
}
