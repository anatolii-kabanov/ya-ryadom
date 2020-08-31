using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace YaRyadom.API.Validation
{
	public class ArrayNumbersNotDuplicatedAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			if (value != null)
			{
				var valueType = value.GetType();

				if (valueType.IsArray)
				{
					var arrayOfNumbers = value as ICollection<int>;
					if (arrayOfNumbers.Count != arrayOfNumbers.Distinct().Count())
					{
						return new ValidationResult($"Contains duplicates.");
					}
				}
			}
			return ValidationResult.Success;
		}
	}
}
