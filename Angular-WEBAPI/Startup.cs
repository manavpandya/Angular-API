using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Angular_WEBAPI.Startup))]
namespace Angular_WEBAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
