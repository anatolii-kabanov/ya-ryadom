using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Daemon.Configurations;

namespace YaRyadom.Daemon.Services
{
	public abstract class Service : IService
	{
		protected readonly ILogger Logger;
		private readonly IOptions<ServiceConfiguration> _options;

		public Service(ILogger<Service> logger, IOptions<ServiceConfiguration> options)
		{
			Logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_options = options ?? throw new ArgumentNullException(nameof(options));
		}

		public async Task StartAsync(CancellationToken cancellationToken)
		{
			Logger.LogInformation("Starting service: " + _options.Value.Name);
			await OnStart(cancellationToken);

		}

		public async Task StopAsync(CancellationToken cancellationToken)
		{
			Logger.LogInformation("Stopping daemon.");
			await OnStop(cancellationToken);

		}

		public virtual void Dispose()
		{
			Logger.LogInformation("Disposing....");
		}

		protected abstract Task OnStart(CancellationToken cancellationToken);
		protected abstract Task OnStop(CancellationToken cancellationToken);
		protected abstract Task ExecuteAsync(CancellationToken cancellationToken);
	}
}
