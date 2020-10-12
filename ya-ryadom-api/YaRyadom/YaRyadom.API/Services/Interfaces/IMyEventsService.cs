using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IMyEventsService : IBaseService<YaRyadomEvent>
	{
		Task<MyEventModel[]> GetAllMyEvents(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<MyEventModel[]> GetAllMyEventsWithApplications(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<MyEventModel[]> GetAllPaticipationEvents(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<bool> AddAsync(EventFormModel model, CancellationToken cancellationToken = default);

		Task<bool> RevokeAsync(EventActionRequestModel model, CancellationToken cancellationToken = default);

	}
}
