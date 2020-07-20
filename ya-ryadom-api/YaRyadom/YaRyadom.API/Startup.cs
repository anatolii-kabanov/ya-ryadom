using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using YaRyadom.API.MappingProfiles;
using YaRyadom.API.Services.Implementations;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;

namespace YaRyadom.API
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddCors();
			services.AddControllers().AddNewtonsoftJson();

			services.AddDbContext<YaRyadomDbContext>();

			// 4326 refers to WGS 84, a standard used in GPS and other geographic systems.
			var geometryFactory = NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326);
			// To use single factory when we need to create some point
			services.AddSingleton(geometryFactory);

			// Auto Mapper Configurations
			var mappingConfig = new MapperConfiguration(mc =>
			{
				mc.AddProfile(new EntityToModelProfile());
				mc.AddProfile(new ModelToEntityProfile(geometryFactory));
			});

			var mapper = mappingConfig.CreateMapper();
			services.AddSingleton(mapper);

			#region Services

			services.AddTransient<IAuthenticationService, AuthenticationService>();
			services.AddTransient<IEventsNearMeService, EventsNearMeService>();
			services.AddTransient<IMyEventsService, MyEventsService>();
			services.AddTransient<IReviewsService, ReviewsService>();
			services.AddTransient<IApplicationsService, ApplicationsService>();
			services.AddTransient<IUserEventsService, UserEventsService>();

			#endregion

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "YaRyadom API", Version = "v1" });
			});

			services.AddApiVersioning(x =>
			{
				x.ReportApiVersions = true;
				x.AssumeDefaultVersionWhenUnspecified = true;
				x.DefaultApiVersion = new ApiVersion(1, 0);
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, YaRyadomDbContext dbContext)
		{
			dbContext.MigrateDatabase();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			// Enable middleware to serve generated Swagger as a JSON endpoint.
			app.UseSwagger();

			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "YaRyadom V1");
				c.RoutePrefix = string.Empty;
			});

			// global cors policy
			// perhaps should be removed if will not required
			app.UseCors(x => x
				 .AllowAnyOrigin()
				 .AllowAnyMethod()
				 .AllowAnyHeader());

			app.UseRouting();

			app.UseAuthorization();

			app.UseForwardedHeaders(new ForwardedHeadersOptions
			{
				ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
			});

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
