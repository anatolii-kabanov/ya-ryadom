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
			var reviewExist = await TableNoTracking
				.AnyAsync(m => m.YaRyadomEventId == model.EventId
					&& m.YaRyadomUserReviewer.VkId == model.VkUserId
					&& m.YaRyadomUserToReview.VkId == model.VkUserToReviewId,
					cancellationToken)
				.ConfigureAwait(false);

			if (reviewExist) return false;

			var validReview = await _dbContext
				.YaRyadomEvents
				.AsNoTracking()
				.AnyAsync(m => m.Id == model.EventId && m.YaRyadomUserOwner.VkId == model.VkUserToReviewId, cancellationToken);

			if (!validReview) return false;

			var yaRyadomReview = _mapper.Map<YaRyadomReview>(model);

			var users = await _dbContext
				.YaRyadomUsers
				.AsNoTracking()
				.Where(m => m.VkId == model.VkUserId || m.VkId == model.VkUserToReviewId)
				.Select(m => new { m.VkId, m.Id })
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			yaRyadomReview.YaRyadomUserReviewerId = users.Where(m => m.VkId == model.VkUserId).Select(m => m.Id).FirstOrDefault();
			yaRyadomReview.YaRyadomUserToReviewId = users.Where(m => m.VkId == model.VkUserToReviewId).Select(m => m.Id).FirstOrDefault();

			Entities.Add(yaRyadomReview);

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<double> GetAvgRatingAsync(long vkId, CancellationToken cancellationToken = default)
		{
			var avgRating = await TableNoTracking
				.Where(m => m.YaRyadomUserToReview.VkId == vkId)
				.AverageAsync(m => m.Rating, cancellationToken)
				.ConfigureAwait(false);

			return avgRating;
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
