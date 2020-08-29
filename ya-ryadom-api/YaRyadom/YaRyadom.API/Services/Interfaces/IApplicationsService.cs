using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IApplicationsService : IBaseService<YaRyadomUserApplication>
	{
		Task<ApplicationModel[]> GetAllByEventAsync(int eventId, CancellationToken cancellationToken = default);

		Task<ApplicationModel[]> GetAllToMeAsync(long vkUserId, CancellationToken cancellationToken = default);

		Task<MineApplicationModel[]> GetAllMineAsync(long vkUserId, CancellationToken cancellationToken = default);

		Task<bool> ApproveAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> RejectAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> ApplyAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> RevokeAsync(ApplicationActionRequestModel model, CancellationToken cancellationToken = default);
	}
}
