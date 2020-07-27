using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Filters;
using YaRyadom.API.Helpers;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/my-events")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class MyEventsController : ControllerBase
	{
		private readonly IMyEventsService _myEventsService;

		public MyEventsController(IMyEventsService myEventsService)
		{
			_myEventsService = myEventsService ?? throw new ArgumentNullException(nameof(myEventsService));
		}

		[AllowAnonymous]
		[HttpGet("participation/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetAllPaticipationEvents(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _myEventsService.GetAllPaticipationEvents(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetMyEvents(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _myEventsService.GetAllMyEvents(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("with-applications/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetMyEventsWithApplications(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _myEventsService.GetAllMyEventsWithApplications(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpPost("create")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[VkUserIdFilter]
		public async Task<IActionResult> Create([FromBody] EventFormModel model, CancellationToken cancellationToken = default)
		{
			if (double.TryParse(Request.Headers[Header.TimeZone], out var minutes))
			{
				model.TimeZoneMinutes = minutes;
			}
			await _myEventsService.AddAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok(true);
		}

		[AllowAnonymous]
		[HttpPost("revoke/{id}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[VkUserIdFilter]
		public async Task<IActionResult> Revoke([FromBody] EventActionRequestModel model, CancellationToken cancellationToken = default)
		{
			await _myEventsService.RevokeAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok(true);
		}

	}
}