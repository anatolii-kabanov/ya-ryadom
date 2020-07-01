﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Helpers;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/applicatioins")]
	[ApiController]
	public class ApplicationsController : ControllerBase
	{
		private readonly IApplicationsService _applicationsService;

		public ApplicationsController(IApplicationsService applicationsService)
		{
			_applicationsService = applicationsService ?? throw new ArgumentNullException(nameof(applicationsService));
		}

		[AllowAnonymous]
		[HttpGet("{eventId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetMyEvents(int eventId, CancellationToken cancellationToken = default)
		{
			var result = await _applicationsService.GetAllAsync(eventId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpPost("approve")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> ApproveApplication([FromBody] ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			await _applicationsService.ApproveAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok(true);
		}

		[AllowAnonymous]
		[HttpPost("reject")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> RejectApplication([FromBody] ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			await _applicationsService.RejectAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok(true);
		}


		[AllowAnonymous]
		[HttpPost("apply")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> Apply([FromBody] ApplicationRequestModel model, CancellationToken cancellationToken = default)
		{
			if (double.TryParse(Request.Headers[Header.TimeZone], out var minutes))
			{
				model.TimeZoneMinutes = minutes;
			}
			await _applicationsService.ApplyAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok(true);
		}

		[AllowAnonymous]
		[HttpPost("revoke")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> Revoke([FromBody] ApplicationRequestModel model, CancellationToken cancellationToken)
		{
			await _applicationsService.RevokeAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok(true);
		}
	}
}