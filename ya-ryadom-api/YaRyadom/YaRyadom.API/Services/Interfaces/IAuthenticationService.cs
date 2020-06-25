using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IAuthenticationService : IBaseService<YaRyadomUser>
	{
		Task<UserInfoModel> GetUserByVkIdAsync(long vkId, CancellationToken cancellationToken = default);

		Task<bool> SaveUserInfoAsync(UserInfoModel model, CancellationToken cancellationToken = default);

		Task<bool> SaveUserIntroAsync(UserIntroRequestModel model, CancellationToken cancellationToken = default);
	}
}
