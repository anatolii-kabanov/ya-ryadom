using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Text;
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
			string vkUrl = actionExecutingContext.HttpContext.Request.Headers[Header.VkParameters];
			if (!string.IsNullOrWhiteSpace(vkUrl))
			{
				var uri = new Uri(vkUrl);
				var queryParameters = HttpUtility.ParseQueryString(uri.Query);
				var orderedKeys = queryParameters.AllKeys.Where(p => p.StartsWith("vk_")).OrderBy(p => p.StartsWith("vk_"));
				var orderedQuery = HttpUtility.ParseQueryString(string.Empty);
				var stringBuilder = new StringBuilder();
				foreach (var key in orderedKeys)
				{
					orderedQuery[key] = queryParameters[key];
				}
				var token = HmacHash.GetToken(orderedQuery.ToString(), _appSettings.SecretKey);
				var valid = token.Equals(queryParameters["sign"]);
				if (valid)
					return;
			}
			throw new ArgumentNullException();
		}
	}
}
