using System;
using System.ComponentModel.DataAnnotations;

namespace YaRyadom.API.Validation
{
	public class ValidTimeAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			var timeString = value.ToString();

			if (string.IsNullOrWhiteSpace(timeString))
			{
				return ValidationResult.Success;
			}

			if (!TimeSpan.TryParse(timeString, out var time))
			{
				return new ValidationResult($"Invalid time.");
			}

			return ValidationResult.Success;
		}
	}
}
