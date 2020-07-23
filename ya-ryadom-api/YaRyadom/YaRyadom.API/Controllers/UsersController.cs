using Microsoft.AspNetCore.Mvc;
using YaRyadom.API.Filters;

namespace YaRyadom.API.Controllers
{
	[Route("api/v{v:apiVersion}/users")]
	[ApiController]
	[TypeFilter(typeof(VkQueryParametersValidationFilter))]
	public class UsersController : ControllerBase
	{
	}
}