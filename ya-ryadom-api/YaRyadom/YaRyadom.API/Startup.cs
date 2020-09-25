using AspNetCoreRateLimit;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using System.Net.Http;
using YaRyadom.API.Filters;
using YaRyadom.API.MappingProfiles;
using YaRyadom.API.Services.Implementations;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.API.Settings;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Vk;

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

			services.AddOptions();
			
			// configure strongly typed settings objects
			var appSettingsSection = Configuration.GetSection("AppSettings");
			services.Configure<AppSettings>(appSettingsSection);

			services.AddMemoryCache();
			services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
			// inject counter and rules stores
			services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
			services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();

			services.AddMvc(option => option.EnableEndpointRouting = false);
			// https://github.com/aspnet/Hosting/issues/793
			// the IHttpContextAccessor service is not registered by default.
			// the clientId/clientIp resolvers use it.
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			// configure the resolvers
			services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

			services.AddScoped<VkQueryParametersValidationFilter>();
			services.AddScoped<VkUserIdFilter>();

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

			var appSettings = appSettingsSection.Get<AppSettings>();

			var httpClient = new HttpClient();
			httpClient.DefaultRequestHeaders.Add("Accept-Language", "ru-RU, ru;q=0.9, en-US;q=0.8, en;q=0.7, *;q=0.5");
			services.AddSingleton<IVkApi>(new VkApi(appSettings.ServiceToken, httpClient));

			services.AddTransient<IAuthenticationService, AuthenticationService>();
			services.AddTransient<IEventsNearMeService, EventsNearMeService>();
			services.AddTransient<IMyEventsService, MyEventsService>();
			services.AddTransient<IReviewsService, ReviewsService>();
			services.AddTransient<IApplicationsService, ApplicationsService>();
			services.AddTransient<IUserEventsService, UserEventsService>();
			services.AddTransient<IComplaintsService, ComplaintsService>();
			services.AddTransient<IUsersService, UsersService>();

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

			// global cors policy
			// perhaps should be removed if will not required
			app.UseCors(x => x
				 .AllowAnyOrigin()
				 .AllowAnyMethod()
				 .AllowAnyHeader());

			#region UseIpRateLimiting with UseMvc Should be here
			app.UseIpRateLimiting();

			app.UseMvc();
			#endregion

			// Enable middleware to serve generated Swagger as a JSON endpoint.
			app.UseSwagger();

			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "YaRyadom V1");
				c.RoutePrefix = string.Empty;
			});

		

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
