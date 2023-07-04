﻿using Znode.Engine.Api.Client.Endpoints;

namespace Znode.Admin.Custom.Endpoints.Custom
{
    public class CustomEndpoint : BaseEndpoint
    {
        //Endpoint to get the list of all portals.
        public static string GetPortalList() => $"{ApiRoot}/customportal/list";

        //Endpoint to get the list of all custom portal details.
        public static string GetCustomPortalDetailList() => $"{ApiRoot}/customportaldetail/list";

        //Endpoint to Get Custom Portal details by Custom Portal Detail Id.
        public static string GetCustomPortalDetail(int customPortalDetailId) => $"{ApiRoot}/customportal/getcustomportaldetail/{customPortalDetailId}";

        //Endpoint to Insert Custom Portal Details.
        public static string InsertCustomPortalDetail() => $"{ApiRoot}/customportal/create";

        //Endpoint to Update Custom Portal Details.
        public static string UpdateCustomPortalDetail() => $"{ApiRoot}/customportal/update";

        //Endpoint to  Delete Custom Portal Details by Custom Portal Detail Id.
        public static string DeleteCustomPortalDetail() => $"{ApiRoot}/customportal/delete";
    }
}
