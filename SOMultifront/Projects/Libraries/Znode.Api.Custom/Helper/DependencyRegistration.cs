using Autofac;
using Znode.Api.Custom.Service;
using Znode.Libraries.Framework.Business;

namespace Znode.Api.Custom.Helper
{
    public class DependencyRegistration : IDependencyRegistration
    {
        /// <summary>
        /// Register the Dependency Injection types.
        /// </summary>
        /// <param name="builder">Autofac Container Builder</param>
        public virtual void Register(ContainerBuilder builder)
        {
            builder.RegisterType<CustomPortalService>().As<ICustomPortalService>().InstancePerRequest();

            //Here override znode base code method by injecting dependancy mention as below.
            //"In CustomPortalService.cs we have override 'DeletePortal()' of znode base code".
            //builder.RegisterType<CustomPortalService>().As<IPortalService>().InstancePerRequest();
        }

        /// <summary>
        /// Order method represents Dependency Injection Registration Order.
        /// For znode base code Library the DI registration order set to 0.
        /// For custom code library the DI registration order should be incremental.
        /// </summary>
        public int Order
        {
            get { return 1; }
        }
    }
}
