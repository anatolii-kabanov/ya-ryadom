using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
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
				//await _vkApi.GetUserInfoAsync(new string[] { "6476088" }).ConfigureAwait(false);
				await _vkApi.SendNotificationAsync(new long[] { 6476088 }, "test messsage sent").ConfigureAwait(false);
			}
			catch (Exception ex)
			{
				_logger.LogError("Exception while sending notifications", ex);
			}
			finally
			{

			}
		}
	}
}
