using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IEventsNearMeService : IBaseService<YaRyadomEvent>
	{
		Task<YaRyadomEventModel[]> GetAllEventsByDistance(EventsRequestModel model, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);
	}
}
