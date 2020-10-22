using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IReviewsService : IBaseService<YaRyadomReview>
	{
		Task<UserReviewModel[]> GetMineReviewsAsync(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<UserReviewAboutMeModel[]> GetReviewsAboutMeAsync(long vkId, VkLanguage vkLanguage = VkLanguage.Ru, CancellationToken cancellationToken = default);

		Task<bool> AddAsync(UserReviewRequestModel model, CancellationToken cancellationToken = default);

		Task<double> GetAvgRatingAsync(long vkId, CancellationToken cancellationToken = default);
	}
}
