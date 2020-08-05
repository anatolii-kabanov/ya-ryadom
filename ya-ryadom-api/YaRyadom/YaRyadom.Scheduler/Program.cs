using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Threading.Tasks;
using YaRyadom.Daemon.Configurations;
using YaRyadom.Scheduler.Services;
using YaRyadom.Scheduler.Settings;
using YaRyadom.Scheduler.Workers;
using YaRyadom.Vk;

namespace YaRyadom.Scheduler
{
	class Program
	{
		static async Task Main(string[] args)
		{
			var builder = new HostBuilder()
				.ConfigureHostConfiguration(configHost => configHost.AddEnvironmentVariables(prefix: "ASPNETCORE_"))
				.ConfigureAppConfiguration((hostingContext, config) =>
				{
					config
					.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
					.AddJsonFile(
						$"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json",
						optional: true,
						reloadOnChange: true);

					if (args != null)
					{
						config.AddCommandLine(args);
					}
				})
				.ConfigureServices((hostContext, services) =>
				{
					services.AddOptions();
					services.Configure<ServiceConfiguration>(hostContext.Configuration.GetSection("Daemon"));
					var appSettingsSection = hostContext.Configuration.GetSection("AppSettings");
					services.Configure<AppSettings>(appSettingsSection);
					var appSettings = appSettingsSection.Get<AppSettings>();

					services.AddTransient<HttpClient>();
					services.AddSingleton<IVkApi>(new VkApi(appSettings.ServiceToken, new HttpClient()));
					services.AddSingleton<IVkNotificationsWorker, VkNotificationsWorker>();
					// services.AddSingleton<IHostedService, VkNotificationsService>();
					services.AddSingleton<IDailyEventsUpdateWorker, DailyEventsUpdateWorker>();
					services.AddSingleton<IHostedService, DailyUpdateService>();
				})
				.ConfigureLogging((hostingContext, logging) =>
				{
					logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
					logging.AddConsole();
				});

			await builder.RunConsoleAsync();
		}
	}
}
