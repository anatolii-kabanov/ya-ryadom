using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Domain.DbContexts;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Implementations
{
	public class AuthenticationService : BaseService<YaRyadomUser>, IAuthenticationService
	{
		private readonly IMapper _mapper;

		public AuthenticationService(YaRyadomDbContext dbContext, IMapper mapper) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<UserInfoModel> GetUserByVkIdAsync(long vkId, CancellationToken cancellationToken = default)
		{
			return await _mapper
				.ProjectTo<UserInfoModel>(TableNoTracking.Where(m => m.VkId == vkId))
				.FirstOrDefaultAsync(cancellationToken)
				.ConfigureAwait(false);
		}

		public async Task<bool> SaveUserInfoAsync(UserInfoModel model, CancellationToken cancellationToken = default)
		{
			var yaVDeleUser = await Entities
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false)
				?? new YaRyadomUser();

			_mapper.Map(model, yaVDeleUser);

			if (yaVDeleUser.Id == 0)
			{
				Entities.Add(yaVDeleUser);
			}

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}
	}
}
