using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities.Enums;

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

			// Add specific time here

			using var dbContext = new YaRyadomDbContext();

			var yaRyadomEvents = await dbContext.YaRyadomEvents
				 .Where(m => m.Date < toDate && !m.Ended)
				 .Include(m => m.YaRyadomUserApplications)
				 .Take(100)// Max 100 per update
				 .ToArrayAsync(cancellationToken)
				 .ConfigureAwait(false);

			if (!yaRyadomEvents.Any())
			{
				_logger.LogInformation($"There are no events to end.");
				return;
			}
			try
			{
				foreach (var yaRyadomEvent in yaRyadomEvents)
				{
					yaRyadomEvent.Ended = true;
					foreach (var application in yaRyadomEvent.YaRyadomUserApplications)
					{
						switch (application.Status)
						{
							case ApplicationStatus.Confirmed:
								application.Status = ApplicationStatus.Visited;
								break;
							case ApplicationStatus.Sent:
							case ApplicationStatus.None:
								application.Status = ApplicationStatus.Rejected;
								break;
						}
					}
				}
				_logger.LogInformation($"Trying to end events in quantity of: {yaRyadomEvents.Length}");
				await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
				_logger.LogInformation($"Events ended in quantity of: {yaRyadomEvents.Length}");
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
