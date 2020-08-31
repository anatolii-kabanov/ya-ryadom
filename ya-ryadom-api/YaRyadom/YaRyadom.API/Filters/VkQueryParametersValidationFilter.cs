using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Web;
using YaRyadom.API.Helpers;
using YaRyadom.API.Settings;

namespace YaRyadom.API.Filters
{
	public class VkQueryParametersValidationFilter : ActionFilterAttribute
	{
		private readonly AppSettings _appSettings;

		public VkQueryParametersValidationFilter(IOptions<AppSettings> appSettings)
		{
			_appSettings = appSettings?.Value ?? throw new ArgumentNullException(nameof(appSettings));
		}

		public override void OnActionExecuting(ActionExecutingContext actionExecutingContext)
		{
			string vkUrl = string.IsNullOrWhiteSpace(actionExecutingContext.HttpContext.Request.Headers[Header.VkReferers])
				? actionExecutingContext.HttpContext.Request.Headers[Header.VkParameters]
				: actionExecutingContext.HttpContext.Request.Headers[Header.VkReferers];
			if (!string.IsNullOrWhiteSpace(vkUrl))
			{
				var uri = new Uri(vkUrl);
				var queryParameters = HttpUtility.ParseQueryString(uri.Query);
				var orderedKeys = queryParameters.AllKeys.Where(p => p.StartsWith("vk_")).OrderBy(p => p.StartsWith("vk_"));
				var orderedQuery = HttpUtility.ParseQueryString(string.Empty);
				foreach (var key in orderedKeys)
				{
					orderedQuery[key] = queryParameters[key];
				}
				var token = HmacHash.GetToken(orderedQuery.ToString(), _appSettings.SecretKey);
				var valid = token.Equals(queryParameters["sign"]);
				if (valid)
					return;
			}
			actionExecutingContext.Result = new BadRequestResult();
		}
	}
}
