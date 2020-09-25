using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Filters;
using YaRyadom.API.Helpers;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/users")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class UsersController : ControllerBase
	{
		private readonly IUsersService _usersService;

		public UsersController(IUsersService usersService)
		{
			_usersService = usersService ?? throw new ArgumentNullException(nameof(usersService));
		}

		[AllowAnonymous]
		[HttpGet("info/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetUserInfoByVkId(long vkUserId, CancellationToken cancellationToken = default)
		{
			var vkLanguage = (VkLanguage)Enum.Parse(typeof(VkLanguage), HttpContext.Items[VkParameters.VkLanguage]?.ToString(), true);

			var userInfoModel = await _usersService.GetUserByVkIdAsync(vkUserId, vkLanguage, cancellationToken).ConfigureAwait(false);
			return Ok(userInfoModel);
		}
	}
}