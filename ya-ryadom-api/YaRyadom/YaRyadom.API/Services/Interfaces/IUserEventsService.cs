using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.Domain.Entities;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IUserEventsService: IBaseService<YaRyadomEvent>
	{
		Task<UserEventModel[]> GetCreatedEvents(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<UserEventModel[]> GetVisitedEvents(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);
	}
}
