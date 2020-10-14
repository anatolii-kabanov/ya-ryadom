using Microsoft.AspNetCore.Mvc;
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
			string vkUrl = string.IsNullOrWhiteSpace(actionExecutingContext.HttpContext.Request.Headers[Header.VkParameters])
				? actionExecutingContext.HttpContext.Request.Headers[Header.VkReferers]
				: actionExecutingContext.HttpContext.Request.Headers[Header.VkParameters];
			if (!string.IsNullOrWhiteSpace(vkUrl))
			{
				var uri = new Uri(vkUrl);
				var queryParameters = HttpUtility.ParseQueryString(uri.Query);
				var vkUserIdString = queryParameters["vk_user_id"];
				var isValidId = long.TryParse(vkUserIdString, out var vkUserId);
				if (string.IsNullOrWhiteSpace(vkUserIdString) || !isValidId)
				{
					actionExecutingContext.Result = new BadRequestResult();
					return;
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
							actionExecutingContext.Result = new BadRequestResult();
							return;
						}
					}
					else
					{
						var parameters = descriptor.MethodInfo.GetParameters().Where(p => typeof(IBaseVkUserRequestModel).IsAssignableFrom(p.ParameterType));

						foreach (var parameter in parameters)
						{
							var argument = actionExecutingContext.ActionArguments[parameter.Name] as BaseVkUserRequestModel;
							if (argument.VkUserId != vkUserId)
							{
								actionExecutingContext.Result = new BadRequestResult();
								return;
							}
						}
					}
				}

				base.OnActionExecuting(actionExecutingContext);
				return;
			}
			actionExecutingContext.Result = new BadRequestResult();
		}
	}
}
