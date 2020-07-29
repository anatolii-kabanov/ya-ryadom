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
	internal class DailyUpdateService : Service
	{
		private readonly IDailyEventsUpdateWorker _dailyEventsUpdateWorker;
		private Timer _dailyTimer;
		private int _usingResource = 0;

		public DailyUpdateService(
			ILogger<DailyUpdateService> logger,
			IOptions<ServiceConfiguration> options,
			IDailyEventsUpdateWorker dailyEventsUpdateWorker)
		: base(logger, options)
		{
			_dailyEventsUpdateWorker = dailyEventsUpdateWorker ?? throw new ArgumentNullException(nameof(dailyEventsUpdateWorker));
		}

		protected override async Task OnStart(CancellationToken cancellationToken)
		{
			_dailyTimer = new Timer(async (obj) =>
			{
				try
				{
					if (0 == Interlocked.Exchange(ref _usingResource, 1))
					{
						_dailyTimer.Change(Timeout.Infinite, Timeout.Infinite);
						await _dailyEventsUpdateWorker.RunAsync().ConfigureAwait(false);
						Interlocked.Exchange(ref _usingResource, 0);
					}
					else
					{
						return;
					}
				}
				finally
				{
					if (0 == _usingResource)
					{
						_dailyTimer.Change(TimeSpan.FromSeconds(120), TimeSpan.FromSeconds(120));
					}
				}

			}, null, TimeSpan.Zero, TimeSpan.FromSeconds(120));
		}

		protected override async Task OnStop(CancellationToken cancellationToken)
		{
			_dailyTimer?.Change(Timeout.Infinite, 0);
		}

		protected override async Task ExecuteAsync(CancellationToken cancellationToken)
		{
			while (!cancellationToken.IsCancellationRequested)
			{
				await Task.Delay(5000, cancellationToken);
			}
		}

		public override void Dispose()
		{
			_dailyTimer?.Dispose();
			base.Dispose();
		}
	}
}
