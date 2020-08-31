using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace YaRyadom.API.Validation
{
	public class CurrentDateAttribute : ValidationAttribute
	{
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			var dateString = value.ToString();

			if (string.IsNullOrWhiteSpace(dateString))
			{
				return ValidationResult.Success;
			}

			if(!DateTimeOffset.TryParseExact(
				dateString, 
				"dd.MM.yyyy", 
				CultureInfo.InvariantCulture, 
				DateTimeStyles.None, 
				out var dateTime))
			{
				return new ValidationResult($"Invalid date.");
			}

			if (dateTime < DateTime.Today)
			{
				return new ValidationResult($"Date can't be less than current date.");
			}

			return ValidationResult.Success;
		}
	}
}
