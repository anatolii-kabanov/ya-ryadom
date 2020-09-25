using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.Domain.Entities;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IUsersService : IBaseService<YaRyadomUser>
	{
		Task<UserInfoModel> GetUserByVkIdAsync(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default);
	}
}
