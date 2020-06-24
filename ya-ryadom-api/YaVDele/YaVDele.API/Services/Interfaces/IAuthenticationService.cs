using System.Threading;
using System.Threading.Tasks;
using YaVDele.API.Models;
using YaVDele.Domain.Entities;

namespace YaVDele.API.Services.Interfaces
{
	public interface IAuthenticationService : IBaseService<YaVDeleUser>
	{
		Task<UserInfoModel> GetUserByVkIdAsync(long vkId, CancellationToken cancellationToken = default);

		Task<bool> SaveUserInfoAsync(UserInfoModel model, CancellationToken cancellationToken = default);
	}
}
