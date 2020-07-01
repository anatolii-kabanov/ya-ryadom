using AutoMapper;
using System;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Implementations
{
	public class ApplicationsService : BaseService<YaRyadomUserApplication>, IApplicationsService
	{
		private readonly IMapper _mapper;

		public ApplicationsService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}
	}
}
