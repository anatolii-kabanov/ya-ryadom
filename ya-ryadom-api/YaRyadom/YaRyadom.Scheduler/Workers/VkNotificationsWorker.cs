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
