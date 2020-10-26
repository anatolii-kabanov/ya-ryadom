using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.ServiceModels;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.Entities.Enums;
using YaRyadom.Vk;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class UserEventsService : BaseService<YaRyadomEvent>, IUserEventsService
	{
		private readonly IMapper _mapper;
		private readonly IVkApi _vkApi;

		public UserEventsService(YaRyadomDbContext dbContext, IMapper mapper, IVkApi vkApi) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
		}

		public async Task<UserEventModel[]> GetCreatedEvents(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<UserEventServiceModel>(
				  TableNoTracking.Where(m => m.YaRyadomUserOwner.VkId == vkId)
			  )
				.ToArrayAsync(cancellationToken)
				.ConfigureAwait(false);

			var vkUserIds = events.SelectMany(e => e.Participants.Select(p => p.VkUserId)).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var participant in events.SelectMany(e => e.Participants).Where(p => p.VkUserId == vkUser.Id))
						{
							participant.VkUserAvatarUrl = vkUser.Photo200Url;
						}
					}
				}
			}

			var resultEvents = events
				.Select(_mapper.Map<UserEventModel>)
				.ToArray();

			return resultEvents;
		}

		public async Task<UserEventModel[]> GetVisitedEvents(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken = default)
		{
			var events = await _mapper
			  .ProjectTo<UserEventServiceModel>(
				  TableNoTracking
				  .Where(m =>
						m.YaRyadomUserApplications.Any(mm => mm.YaRyadomUserRequested.VkId == vkId && mm.Status == ApplicationStatus.Visited)
					)
			  )
			.ToArrayAsync(cancellationToken)
			.ConfigureAwait(false);

			var vkUserIds = events.SelectMany(e => e.Participants.Select(p => p.VkUserId)).ToHashSet();

			for (var i = 0; i < vkUserIds.Count(); i += 100)
			{
				var idsToSend = vkUserIds.Skip(i).Take(100).Select(m => m.ToString()).ToArray();
				var vkResponse = await _vkApi.GetUserInfoAsync(idsToSend, vkLanguage, cancellationToken).ConfigureAwait(false);
				if (vkResponse.Response != null && vkResponse.Response.Length > 0)
				{
					foreach (var vkUser in vkResponse.Response)
					{
						foreach (var participant in events.SelectMany(e => e.Participants).Where(p => p.VkUserId == vkUser.Id))
						{
							participant.VkUserAvatarUrl = vkUser.Photo200Url;
						}
					}
				}
			}

			var resultEvents = events
				.Select(_mapper.Map<UserEventModel>)
				.ToArray();

			return resultEvents;
		}
	}
}
