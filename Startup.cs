using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using nabe.order.management.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.DataProtection;
using System;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.Logging;

namespace nabe_order_management
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            //services.AddEntityFrameworkNpgsql().AddDbContext<NabeDbContext>(options => options.UseNpgsql(Configuration["Data:StoreDbContext:ConnectionString"]));

            services.AddTransient<NabeDbContext>();

            services.AddDataProtection().SetDefaultKeyLifetime(TimeSpan.FromDays(14));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "nabe.order.management.api", Version = "v1" });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseStaticFiles();
            app.InitializeDb();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
				    HotModuleReplacementEndpoint = "/__webpack_hmr"
                });

                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "nabe.order.management.api V1");
                });

                app.MapWhen(x => !x.Request.Path.Value.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase), builder =>
                {
                    builder.UseMvc(routes =>
                    {
                        routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Home", action = "Index" });
                    });
                });
            }
            else
            {
                app.UseMvc(routes =>
                {
                    routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}");
                    routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Home", action = "Index" });
                });

                app.UseExceptionHandler("/Home/Error");
            }
        }
    }
}
