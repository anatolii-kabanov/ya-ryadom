using System;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YaRyadom.API.Filters;
using YaRyadom.API.Helpers;
using YaRyadom.API.Models.Requests;
using YaRyadom.API.Services.Interfaces;
using YaRyadom.Vk.Enums;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/events-near-me")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class EventsNearMeController : ControllerBase
	{
		private readonly IEventsNearMeService _eventsNearMeService;

		public EventsNearMeController(IEventsNearMeService eventsNearMeService)
		{
			_eventsNearMeService = eventsNearMeService ?? throw new ArgumentNullException(nameof(eventsNearMeService));
		}

		[AllowAnonymous]
		[HttpPost]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[VkUserIdFilter]
		public async Task<IActionResult> GetEventsNearMe([FromBody] EventsRequestModel requestModel, CancellationToken cancellationToken = default)
		{
			var vkLanguage = (VkLanguage)Enum.Parse(typeof(VkLanguage), HttpContext.Items[VkParameters.VkLanguage]?.ToString(), true);
			var events = await _eventsNearMeService
				.GetAllEventsByDistance(requestModel, vkLanguage, cancellationToken)
				.ConfigureAwait(false);
			return Ok(events);
		}

	}
}