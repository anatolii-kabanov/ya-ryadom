using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Domain.DbContexts;

namespace YaRyadom.Scheduler.Workers
{
	internal class DailyEventsUpdateWorker : IDailyEventsUpdateWorker
	{
		private ILogger<DailyEventsUpdateWorker> _logger;

		public DailyEventsUpdateWorker(ILogger<DailyEventsUpdateWorker> logger)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
		}

		public async Task RunAsync(CancellationToken cancellationToken = default)
		{
			var currentDate = DateTimeOffset.UtcNow;

			var toDate = DateTime.Today;
			using var dbContext = new YaRyadomDbContext();

			var yaRyadomEvents = await dbContext.YaRyadomEvents				 
				 .Where(m => !m.Ended)
				 .ToArrayAsync(cancellationToken)
				 .ConfigureAwait(false);

			if (!yaRyadomEvents.Any()) return;
			try
			{
				foreach (var yaRyadomEvent in yaRyadomEvents)
				{
					

				}
			}
			catch (Exception ex)
			{
				_logger.LogError("Exception trying to update events and applications", ex);
			}
			finally
			{

			}
		}
	}
}
