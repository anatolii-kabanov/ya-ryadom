using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;
using System.Net;
using System.Web;
using YaRyadom.API.Helpers;
using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Filters
{
	public class VkUserIdFilter : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext actionExecutingContext)
		{
			string vkUrl = string.IsNullOrWhiteSpace(actionExecutingContext.HttpContext.Request.Headers[Header.VkReferers])
				? actionExecutingContext.HttpContext.Request.Headers[Header.VkParameters]
				: actionExecutingContext.HttpContext.Request.Headers[Header.VkReferers];
			if (!string.IsNullOrWhiteSpace(vkUrl))
			{
				var uri = new Uri(vkUrl);
				var queryParameters = HttpUtility.ParseQueryString(uri.Query);
				var vkUserIdString = queryParameters["vk_user_id"];
				var isValidId = long.TryParse(vkUserIdString, out var vkUserId);
				if (string.IsNullOrWhiteSpace(vkUserIdString) || !isValidId)
				{
					throw new ArgumentNullException();
				}

				if (actionExecutingContext.ActionDescriptor is ControllerActionDescriptor descriptor)
				{
					if (actionExecutingContext.HttpContext.Request.Method == WebRequestMethods.Http.Get)
					{
						// Vk user id should be first
						var vkUserIdParameter = descriptor.MethodInfo.GetParameters().FirstOrDefault();
						var id = (long)actionExecutingContext.ActionArguments[vkUserIdParameter.Name];
						if (id != vkUserId)
						{
							throw new Exception();
						}
					} else
					{
						var parameters = descriptor.MethodInfo.GetParameters().Where(p => p.ParameterType.BaseType == typeof(BaseVkUserRequestModel));

						foreach (var parameter in parameters)
						{
							var argument = actionExecutingContext.ActionArguments[parameter.Name] as BaseVkUserRequestModel;
							if (argument.VkUserId != vkUserId)
							{
								throw new Exception();
							}
						}
					}					
				}

				base.OnActionExecuting(actionExecutingContext);
				return;
			}
			throw new ArgumentNullException();
		}
	}
}
