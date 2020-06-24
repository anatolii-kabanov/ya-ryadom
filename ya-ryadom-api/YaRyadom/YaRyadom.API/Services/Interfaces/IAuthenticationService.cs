using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IAuthenticationService : IBaseService<YaRyadomUser>
	{
		Task<UserInfoModel> GetUserByVkIdAsync(long vkId, CancellationToken cancellationToken = default);

		Task<bool> SaveUserInfoAsync(UserInfoModel model, CancellationToken cancellationToken = default);
	}
}
