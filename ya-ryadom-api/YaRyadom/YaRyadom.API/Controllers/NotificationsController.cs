using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Filters;
using YaRyadom.API.Models.Requests;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/notifications")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class NotificationsController : ControllerBase
	{
		public NotificationsController()
		{

		}

		[AllowAnonymous]
		[HttpPost("create")]
		[Consumes(MediaTypeNames.Application.Json)]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[VkUserIdFilter]
		public async Task<IActionResult> Create([FromBody] NotificationRequestModel model, CancellationToken cancellationToken = default)
		{
			
			return Ok(true);
		}
	}
}
