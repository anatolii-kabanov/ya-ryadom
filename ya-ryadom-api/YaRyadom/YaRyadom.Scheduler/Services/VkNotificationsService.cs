using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Daemon.Configurations;
using YaRyadom.Daemon.Services;
using YaRyadom.Scheduler.Workers;

namespace YaRyadom.Scheduler.Services
{
	internal class VkNotificationsService : Service
	{
		private readonly IVkNotificationsWorker _vkNotificationsWorker;
		public VkNotificationsService(
			ILogger<DailyUpdateService> logger,
			IOptions<ServiceConfiguration> options,
			IVkNotificationsWorker vkNotificationsWorker) : base(logger, options)
		{
			_vkNotificationsWorker = vkNotificationsWorker ?? throw new ArgumentNullException(nameof(vkNotificationsWorker));
		}

		protected override async Task OnStart(CancellationToken cancellationToken)
		{
			await ExecuteAsync(cancellationToken).ConfigureAwait(false);
		}

		protected override async Task ExecuteAsync(CancellationToken cancellationToken)
		{
			while (!cancellationToken.IsCancellationRequested)
			{
				try
				{
					await _vkNotificationsWorker.RunAsync(cancellationToken).ConfigureAwait(false);
				}
				catch (OperationCanceledException ex)
				{
					throw (ex);
				}
				catch (Exception ex)
				{
					Logger.LogError("Notification worker", ex);
				}
				await Task.Delay(5000, cancellationToken);
			}
		}


		protected override async Task OnStop(CancellationToken cancellationToken)
		{
			
		}
	}
}
