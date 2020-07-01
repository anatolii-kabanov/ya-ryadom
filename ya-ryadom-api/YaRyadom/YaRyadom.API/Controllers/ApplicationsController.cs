using Microsoft.AspNetCore.Mvc;
using System;
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
	}
}