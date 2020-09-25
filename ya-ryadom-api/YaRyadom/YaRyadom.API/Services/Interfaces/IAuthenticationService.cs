using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IAuthenticationService : IBaseService<YaRyadomUser>
	{
		Task<MyProfileModel> GetMyInfoByVkIdAsync(long vkId, CancellationToken cancellationToken = default);

		Task<bool> SaveUserInfoAsync(UserInfoSaveRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> SaveUserThemesAsync(UserThemesRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> SaveUserLocationAsync(UserLocationRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> SaveUserAboutMyselfAsync(UserAboutMyselfRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> SaveUserGuideCompletedAsync(UserGuideCompletedRequestModel model, CancellationToken cancellationToken = default);

		Task<bool> SaveUserNotificationsAsync(UserNotificationsRequestModel model, CancellationToken cancellationToken = default);
	}
}
