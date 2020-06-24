using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaVDele.API.Models;
using YaVDele.API.Services.Interfaces;

namespace YaVDele.API.Controllers
{
	[Route("api/v{v:apiVersion}/my-events")]
	[ApiController]
	public class MyEventsController : ControllerBase
	{
		private readonly IMyEventsService _myEventsService;

		public MyEventsController(IMyEventsService myEventsService)
		{
			_myEventsService = myEventsService ?? throw new ArgumentNullException(nameof(myEventsService));
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
		[HttpPost("create")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> Create([FromBody] EventFormModel model, CancellationToken cancellationToken = default)
		{
			await _myEventsService.AddAsync(model, cancellationToken).ConfigureAwait(false);
			return Ok();
		}

		[AllowAnonymous]
		[HttpPost("revoke/{id}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> Revoke(int id, CancellationToken cancellationToken = default)
		{
			await _myEventsService.RevokeAsync(id, cancellationToken).ConfigureAwait(false);
			return Ok();
		}
	}
}