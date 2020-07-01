using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IReviewsService : IBaseService<YaRyadomReview>
	{
		Task<UserReviewModel[]> GetMineReviewsAsync(long vkId, CancellationToken cancellationToken = default);

		Task<UserReviewAboutMeModel[]> GetReviewsAboutMeAsync(long vkId, CancellationToken cancellationToken = default);

		Task<bool> AddAsync(UserReviewRequestModel model, CancellationToken cancellationToken = default);
	}
}
