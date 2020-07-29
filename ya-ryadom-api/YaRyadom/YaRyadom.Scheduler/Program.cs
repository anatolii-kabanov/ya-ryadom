using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using YaRyadom.Daemon.Configurations;
using YaRyadom.Scheduler.Services;
using YaRyadom.Scheduler.Workers;

namespace YaRyadom.Scheduler
{
	class Program
	{
		static async Task Main(string[] args)
		{
			var builder = new HostBuilder()
		  .ConfigureAppConfiguration((hostingContext, config) =>
		  {
			  config.AddEnvironmentVariables();

			  if (args != null)
			  {
				  config.AddCommandLine(args);
			  }
		  })
		  .ConfigureServices((hostContext, services) =>
		  {
			  services.AddOptions();
			  services.Configure<ServiceConfiguration>(hostContext.Configuration.GetSection("Daemon"));

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
