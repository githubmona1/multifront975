using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;

namespace Znode.Engine.Api
{
    public static class CustomWebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Custom Portal Detail Routes
            config.Routes.MapHttpRoute("custom-portal-list", "customportal/list", new { controller = "customportal", action = "getportallist" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
            config.Routes.MapHttpRoute("custom-portal-detail-list", "customportaldetail/list", new { controller = "customportal", action = "getcustomportaldetaillist" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get) });
            config.Routes.MapHttpRoute("custom-portal-get", "customportal/getcustomportaldetail/{customPortalDetailId}", new { controller = "customportal", action = "getcustomportaldetail" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Get), customPortalDetailId = @"^\d+$" });
            config.Routes.MapHttpRoute("custom-portal-create", "customportal/create", new { controller = "customportal", action = "insertcustomportaldetail" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });
            config.Routes.MapHttpRoute("custom-portal-update", "customportal/update", new { controller = "customportal", action = "updatecustomportaldetail" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Put) });
            config.Routes.MapHttpRoute("custom-portal-delete", "customportal/delete", new { controller = "customportal", action = "deletecustomportaldetail" }, new { httpMethod = new HttpMethodConstraint(HttpMethod.Post) });
        }
    }
}