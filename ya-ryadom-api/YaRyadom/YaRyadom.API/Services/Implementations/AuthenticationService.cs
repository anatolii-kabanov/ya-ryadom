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

		public async Task<bool> SaveUserInfoAsync(UserInfoSaveRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomUser = await Entities
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false)
				?? new YaRyadomUser();

			_mapper.Map(model, yaRyadomUser);

			if (yaRyadomUser.Id == 0)
			{
				Entities.Add(yaRyadomUser);
			}

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> SaveUserThemesAsync(UserThemesRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomUser = await Entities
				.Include(m => m.YaRyadomUserThemes)
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (yaRyadomUser == null) throw new ArgumentNullException(nameof(yaRyadomUser));

			_mapper.Map(model, yaRyadomUser);

			if (yaRyadomUser.YaRyadomUserThemes.Any())
				_dbContext.YaRyadomUserThemes.RemoveRange(yaRyadomUser.YaRyadomUserThemes);

			foreach (var theme in model.SelectedThemes)
			{
				_dbContext.YaRyadomUserThemes.Add(
					new YaRyadomUserTheme
					{
						Type = (ThemeType)theme,
						YaRyadomUser = yaRyadomUser
					});
			}

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> SaveUserLocationAsync(UserLocationRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomUser = await Entities
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (yaRyadomUser == null) throw new ArgumentNullException(nameof(yaRyadomUser));

			_mapper.Map(model, yaRyadomUser);

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> SaveUserAboutMyselfAsync(UserAboutMyselfRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomUser = await Entities
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (yaRyadomUser == null) throw new ArgumentNullException(nameof(yaRyadomUser));

			_mapper.Map(model, yaRyadomUser);

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}

		public async Task<bool> SaveUserGuideCompletedAsync(UserGuideCompletedRequestModel model, CancellationToken cancellationToken = default)
		{
			var yaRyadomUser = await Entities
				.FirstOrDefaultAsync(m => m.VkId == model.VkUserId, cancellationToken)
				.ConfigureAwait(false);

			if (yaRyadomUser == null) throw new ArgumentNullException(nameof(yaRyadomUser));

			yaRyadomUser.GuideCompleted = true;

			return await _dbContext.SaveChangesAsync(cancellationToken).ConfigureAwait(false) > 0;
		}
	}
}
