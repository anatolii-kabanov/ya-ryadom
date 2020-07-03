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

		Task<ApplicationModel[]> GetAllToMeAsync(int vkUserId, CancellationToken cancellationToken = default);

		Task<ApplicationModel[]> GetAllMineAsync(int vkUserId, CancellationToken cancellationToken = default);

		Task<bool> ApproveAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> RejectAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> ApplyAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> RevokeAsync(ApplicationRequestModel model, CancellationToken cancellationToken = default);
	}
}
