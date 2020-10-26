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
using YaRyadom.Domain.Entities.Enums;
using YaRyadom.Vk;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class ReviewsService : BaseService<YaRyadomReview>, IReviewsService
	{
		private readonly IMapper _mapper;
		private readonly IVkApi _vkApi;

		public ReviewsService(YaRyadomDbContext dbContext, IMapper mapper, IVkApi vkApi) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
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
				.AnyAsync(m => m.Id == model.EventId
					&& m.YaRyadomUserOwner.VkId == model.VkUserToReviewId
					&& m.YaRyadomUserApplications.Any(a => a.YaRyadomUserRequested.VkId == model.VkUserId && a.Status == ApplicationStatus.Visited),
					cancellationToken)
				.ConfigureAwait(false);

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

		public async Task<UserReviewModel[]> GetMineReviewsAsync(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var reviews = await _mapper
				.ProjectTo<UserReviewModel>(
					TableNoTracking.Where(m => m.YaRyadomUserReviewer.VkId == vkId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = reviews.Select(e => e.VkUserId).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var review in reviews.Where(p => p.VkUserId == vkUser.Id))
						{
							review.VkUserAvatarUrl = vkUser.Photo200Url;
							review.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
						}
					}
				}
			}

			return reviews;
		}

		public async Task<UserReviewAboutMeModel[]> GetReviewsAboutMeAsync(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var reviews = await _mapper
				.ProjectTo<UserReviewAboutMeModel>(
					TableNoTracking.Where(m => m.YaRyadomUserToReview.VkId == vkId)
				)
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = reviews.Select(e => e.VkUserId).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var review in reviews.Where(p => p.VkUserId == vkUser.Id))
						{
							review.VkUserAvatarUrl = vkUser.Photo200Url;
							review.UserFullName = $"{vkUser.FirstName} {vkUser.LastName}";
						}
					}
				}
			}

			return reviews;
		}
	}
}
