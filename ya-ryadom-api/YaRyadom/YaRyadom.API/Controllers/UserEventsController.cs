using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Services.Interfaces;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/user-events")]
	[ApiController]
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
			var result = await _userEventsService.GetCreatedEvents(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("visited/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetVisitedEvents(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _userEventsService.GetVisitedEvents(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}
	}
}
