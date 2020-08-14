﻿using AutoMapper;
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

		public ComplaintsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<bool> AddAsync(EventComplaintRequestModel model, CancellationToken cancellationToken = default)
		{
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
