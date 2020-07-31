using System;
using System.ComponentModel;

namespace YaRyadom.Vk.Extensions
{
	public static class AttributesExtensions
	{
		/// <summary>
		/// 
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="enumerationValue"></param>
		/// <returns></returns>
		public static string GetDescription<T>(this T enumerationValue)
			where T : struct
		{
			var type = enumerationValue.GetType();
			if (!type.IsEnum)
			{
				throw new ArgumentException(nameof(enumerationValue));
			}

			var memberInfo = type.GetMember(enumerationValue.ToString());

			if (memberInfo.Length <= 0) return enumerationValue.ToString();

			var attrs = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);

			return attrs.Length > 0 ? ((DescriptionAttribute)attrs[0]).Description : enumerationValue.ToString();
		}
	}
}
