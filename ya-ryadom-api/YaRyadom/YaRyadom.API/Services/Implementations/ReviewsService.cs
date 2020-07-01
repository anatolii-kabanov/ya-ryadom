using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Implementations
{
	public class ReviewsService : BaseService<YaRyadomReview>, IReviewsService
	{
		private readonly IMapper _mapper;

		public ReviewsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> AddAsync(UserReviewRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomReview = _mapper.Map<YaRyadomReview>(model);

			var users = await _dbContext
				.YaRyadomUsers
				.Where(m => m.VkId == model.VkOwnerUserId || m.VkId == model.VkUserId)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			yaRyadomReview.YaRyadomUserReviewer = users.FirstOrDefault(m => m.VkId == model.VkOwnerUserId);
			yaRyadomReview.YaRyadomUserToReview = users.FirstOrDefault(m => m.VkId == model.VkUserId);

			Entities.Add(yaRyadomReview);

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<UserReviewModel[]> GetMineReviewsAsync(long vkId, CancellationToken cancellationToken = default)
		{
			var reviews = await _mapper
				.ProjectTo<UserReviewModel>(
					TableNoTracking.Where(m => m.YaRyadomUserReviewer.VkId == vkId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			return reviews;
		}

		public async Task<UserReviewAboutMeModel[]> GetReviewsAboutMeAsync(long vkId, CancellationToken cancellationToken = default)
		{
			var reviews = await _mapper
				.ProjectTo<UserReviewAboutMeModel>(
					TableNoTracking.Where(m => m.YaRyadomUserToReview.VkId == vkId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			return reviews;
		}
	}
}
