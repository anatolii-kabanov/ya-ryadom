using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Implementations
{
	public class ComplaintsService : BaseService<YaRyadomComplaint>, IComplaintsService
	{
		private readonly IMapper _mapper;
		private const int MaxNumberOfComplaints = 2;

		public ComplaintsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> AddAsync(EventComplaintRequestModel model, CancellationToken cancellationToken = default)
		{
			var eventExist = await _dbContext
				.YaRyadomEvents
				.AsNoTracking()
				.AnyAsync(m => m.Id == model.EventId && m.YaRyadomUserOwner.VkId != model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (!eventExist) return false;

			var numberOfComplaints = await TableNoTracking
				.CountAsync(c => c.YaRyadomEventId == model.EventId && c.YaRyadomFromUser.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (numberOfComplaints >= MaxNumberOfComplaints)
			{
				return false;
			}

			var yaRyadomComplaint = _mapper.Map<YaRyadomComplaint>(model);

			var yaRyadomUser = await _dbContext
				.YaRyadomUsers
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			yaRyadomComplaint.YaRyadomFromUser = yaRyadomUser;

			Entities.Add(yaRyadomComplaint);

			await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

			return true;
		}
	}
}
