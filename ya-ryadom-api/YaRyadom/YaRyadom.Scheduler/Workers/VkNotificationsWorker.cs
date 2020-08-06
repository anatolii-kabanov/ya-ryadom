using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;
using YaRyadom.Vk;

namespace YaRyadom.Scheduler.Workers
{
	internal class VkNotificationsWorker : IVkNotificationsWorker
	{
		private ILogger<VkNotificationsWorker> _logger;
		private readonly IVkApi _vkApi;

		public VkNotificationsWorker(ILogger<VkNotificationsWorker> logger, IVkApi vkApi)
		{
			_logger = logger ?? throw new ArgumentNullException(nameof(logger));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
		}

		public async Task RunAsync(CancellationToken cancellationToken = default)
		{
			try
			{
				var currentDate = DateTimeOffset.UtcNow;

				using var dbContext = new YaRyadomDbContext();

				var yaRyadomNotifications = await dbContext.YaRyadomNotifications
					 .Where(m => !m.IsSent
						 && m.YaRyadomUserToSend.NotificationsEnabled
						 && m.YaRyadomUserToSend.VkNotificationsLockoutEnd <= currentDate)
					 .Include(m => m.YaRyadomUserToSend)
					 //.Include(m => m.YaRyadomEvent)
					 .GroupBy(m => new { m.NotificationType, m.YaRyadomEventId })					 
					 .Take(10)// Max 10 per request
					 .ToArrayAsync(cancellationToken)
					 .ConfigureAwait(false);

				// Here we can reach vk notifications limit for particular user
				foreach (var notificationGroup in yaRyadomNotifications)
				{
					if (notificationGroup.Key.NotificationType == NotificationType.CustomMessage)
					{
						foreach (var notification in notificationGroup)
						{
							await SendNotificationAsync(new[] { notification.YaRyadomUserToSend.VkId }, new[] { notification }).ConfigureAwait(false);
							await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
						}

					}
					else
					{
						var usersIds = notificationGroup
							.Where(m => m.YaRyadomUserToSend.VkNotificationsLockoutEnd <= currentDate)
							.Select(m => m.YaRyadomUserToSend.VkId).ToArray();

						await SendNotificationAsync(usersIds, notificationGroup.ToArray()).ConfigureAwait(false);
						await dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
					}

				}


			}
			catch (Exception ex)
			{
				_logger.LogError("Exception while sending notifications", ex);
			}
			finally
			{

			}
		}

		private async Task SendNotificationAsync(long[] usersIds, YaRyadomNotification[] notifications)
		{
			var message = GetMessage(notifications.First());
			await _vkApi.SendNotificationAsync(usersIds, message).ConfigureAwait(false);
			foreach(var notification in notifications)
			{
				var currentDate = DateTime.UtcNow;
				var hours = (currentDate - notification.YaRyadomUserToSend.VkNotificationsLastSentDate).TotalHours;
				var lastSentYesterday = DateTime.Today > notification.YaRyadomUserToSend.VkNotificationsLastSentDate;
				if (hours >= 1)
				{
					notification.YaRyadomUserToSend.VkNotificationsPerHourCount = 0;
				}
				if(lastSentYesterday)
				{
					notification.YaRyadomUserToSend.VkNotificationsPerDayCount = 0;
				}

				notification.YaRyadomUserToSend.VkNotificationsPerHourCount++;
				notification.YaRyadomUserToSend.VkNotificationsPerDayCount++;
				if(notification.YaRyadomUserToSend.VkNotificationsPerHourCount >= 2)
				{
					notification.YaRyadomUserToSend.VkNotificationsLockoutEnd = DateTime.UtcNow.AddHours(1);
					notification.YaRyadomUserToSend.VkNotificationsPerHourCount = 0;
				}
				if (notification.YaRyadomUserToSend.VkNotificationsPerDayCount >= 10)
				{
					notification.YaRyadomUserToSend.VkNotificationsLockoutEnd = DateTime.UtcNow.AddHours(14);
					notification.YaRyadomUserToSend.VkNotificationsPerDayCount = 0;
				}
			}
		}

		private string GetMessage(YaRyadomNotification notification)
		{
			return notification.NotificationType switch
			{
				NotificationType.EventRevoked => $"К сожалению мероприятие отменено 😞 - \"{notification.YaRyadomEvent.Title}\"",
				NotificationType.NewEventNearYou => $"Новое событие рядом с вами 😀, {notification.YaRyadomEvent.Title}",
				NotificationType.CustomMessage => notification.Message,
				_ => $"",
			};
		}
	}
}
