﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Filters;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/complaints")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class ComplaintsController : ControllerBase
	{
		private readonly IComplaintsService _complaintsService;

		public ComplaintsController(IComplaintsService complaintsService)
		{
			_complaintsService = complaintsService ?? throw new ArgumentNullException(nameof(complaintsService));
		}
		
		[AllowAnonymous]
		[HttpPost("to-event")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[VkUserIdFilter]
		public async Task<IActionResult> ComplaintToEvent([FromBody] EventComplaintRequestModel model, CancellationToken cancellationToken = default)
		{
			var result = await _complaintsService.AddAsync(model, cancellationToken).ConfigureAwait(false);
			if (!result) return BadRequest();
			return Ok(result);
		}
	}
}
