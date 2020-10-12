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
	[Route("api/v{v:apiVersion}/user-events")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class UserEventsController : ControllerBase
	{
		private readonly IUserEventsService _userEventsService;

		public UserEventsController(IUserEventsService userEventsService)
		{
			_userEventsService = userEventsService ?? throw new ArgumentNullException(nameof(userEventsService));
		}

		[AllowAnonymous]
		[HttpGet("created/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetCreatedEvents(long vkUserId, CancellationToken cancellationToken = default)
		{
			var vkLanguage = (VkLanguage)Enum.Parse(typeof(VkLanguage), HttpContext.Items[VkParameters.VkLanguage]?.ToString(), true);
			var result = await _userEventsService.GetCreatedEvents(vkUserId, vkLanguage, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("visited/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetVisitedEvents(long vkUserId, CancellationToken cancellationToken = default)
		{
			var vkLanguage = (VkLanguage)Enum.Parse(typeof(VkLanguage), HttpContext.Items[VkParameters.VkLanguage]?.ToString(), true);
			var result = await _userEventsService.GetVisitedEvents(vkUserId, vkLanguage, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}
	}
}
