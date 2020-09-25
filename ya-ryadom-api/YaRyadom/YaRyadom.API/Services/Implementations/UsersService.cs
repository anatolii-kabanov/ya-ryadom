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
using YaRyadom.Vk;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Services.Implementations
{
	public class UsersService : BaseService<YaRyadomUser>, IUsersService
	{
		private readonly IMapper _mapper;
		private readonly IVkApi _vkApi;

		public UsersService(YaRyadomDbContext dbContext, IMapper mapper, IVkApi vkApi) : base(dbContext)
		{
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
			_vkApi = vkApi ?? throw new ArgumentNullException(nameof(vkApi));
		}

		public async Task<UserInfoModel> GetUserByVkIdAsync(long vkId, VkLanguage vkLanguage, CancellationToken cancellationToken)
		{
			var vkResponse = await _vkApi.GetUserInfoAsync(new string[] { vkId.ToString() }, vkLanguage, cancellationToken).ConfigureAwait(false);

			var result = await _mapper
				.ProjectTo<UserInfoModel>(TableNoTracking.Where(m => m.VkId == vkId))
				.FirstOrDefaultAsync(cancellationToken)
				.ConfigureAwait(false);

			if (vkResponse.Response != null && vkResponse.Response.Length > 0)
			{
				var userInfo = vkResponse.Response.First();
				var yaRyadomUser = await Query.FirstOrDefaultAsync(u => u.VkId == vkId, cancellationToken).ConfigureAwait(false);
				if (yaRyadomUser != null)
				{
					// First name and last name depends on vkLanguage
					result.FirstName = userInfo.FirstName;
					result.LastName = userInfo.LastName;

					yaRyadomUser.VkUserAvatarUrl = userInfo.Photo200Url;
					await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
				}
			}

			return result;
		}
	}
}
