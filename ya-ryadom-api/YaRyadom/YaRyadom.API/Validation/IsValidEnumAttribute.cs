using System;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace YaRyadom.API.Validation
{
	public class IsValidEnumAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			var valueType = value.GetType();
			var valid = false;
			if (valueType.IsArray)
			{
				var arrayOfEnums = value as ICollection;
				foreach (var enumValue in arrayOfEnums)
				{
					var enumType = enumValue.GetType();
					valid = Enum.IsDefined(enumType, enumValue);
					if (!valid) break;
				}
			}
			else
			{
				valid = Enum.IsDefined(valueType, value);
			}
			
			if (!valid)
			{
				return new ValidationResult($"Is not a valid value for the property.");
			}
			return ValidationResult.Success;
		}
	}
}
