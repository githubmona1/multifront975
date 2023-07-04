using Autofac;
using Znode.Engine.WebStore.Controllers;
using Znode.Libraries.Framework.Business;
namespace Znode.Engine.WebStore
{
    public class CustomDependancyRegistration : IDependencyRegistration
    {
        public virtual void Register(ContainerBuilder builder)
        {
            // In case CustomUserController.cs to be overridable then uncommented the below line.
            //builder.RegisterType<CustomUserController>().As<UserController>().InstancePerDependency();
        }
        public int Order
        {
            get { return 1; }
        }
    }
}