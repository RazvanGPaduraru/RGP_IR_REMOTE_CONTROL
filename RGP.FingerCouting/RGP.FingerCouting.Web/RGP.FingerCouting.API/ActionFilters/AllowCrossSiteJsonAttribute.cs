using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace RGP.FingerCouting.API.ActionFilters
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override  void OnActionExecuting(ActionExecutingContext context)
        {
            string rqstMethod = context.HttpContext.Request.Method;
            if (rqstMethod == "OPTIONS")
            {
                context.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
                context.Result = new EmptyResult();
            }
            else
            {
                base.OnActionExecuting(context);
            }
        }
        
    }
}
