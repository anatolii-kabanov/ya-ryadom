using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Filters;
using YaRyadom.API.Services.Interfaces;

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
			var userInfoModel = await _usersService.GetUserByVkIdAsync(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(userInfoModel);
		}
	}
}