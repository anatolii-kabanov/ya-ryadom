using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IApplicationsService : IBaseService<YaRyadomUserApplication>
	{
		Task<ApplicationModel[]> GetAllByEventAsync(int eventId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<ApplicationModel[]> GetAllToMeAsync(long vkUserId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<MineApplicationModel[]> GetAllMineAsync(long vkUserId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<bool> ApproveAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> RejectAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> ApplyAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> RevokeAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default);
	}
}
