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

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/reviews")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class ReviewsController : ControllerBase
	{
		private readonly IReviewsService _reviewsService;

		public ReviewsController(IReviewsService reviewsService)
		{
			_reviewsService = reviewsService ?? throw new ArgumentNullException(nameof(reviewsService));
		}

		[AllowAnonymous]
		[HttpGet("my/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetMyReviews(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _reviewsService.GetMineReviewsAsync(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("about-user/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetReviewsAboutMe(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _reviewsService.GetReviewsAboutMeAsync(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}


		[AllowAnonymous]
		[HttpPost("add")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[VkUserIdFilter]
		public async Task<IActionResult> Add([FromBody] UserReviewRequestModel model, CancellationToken cancellationToken = default)
		{
			if (double.TryParse(Request.Headers[Header.TimeZone], out var minutes))
			{
				model.TimeZoneMinutes = minutes;
			}
			var result = await _reviewsService.AddAsync(model, cancellationToken).ConfigureAwait(false);
			if (!result) return BadRequest();
			return Ok(result);
		}

		[AllowAnonymous]
		[HttpGet("user-rating/{vkUserId}")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<IActionResult> GetAvgUserRating(long vkUserId, CancellationToken cancellationToken = default)
		{
			var result = await _reviewsService.GetAvgRatingAsync(vkUserId, cancellationToken).ConfigureAwait(false);
			return Ok(result);
		}
	}
}