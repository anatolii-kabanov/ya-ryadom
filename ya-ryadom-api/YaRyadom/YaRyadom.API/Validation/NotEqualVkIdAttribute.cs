using System;
using System.ComponentModel.DataAnnotations;

namespace YaRyadom.API.Validation
{
	public class NotEqualVkIdAttribute : ValidationAttribute
	{
		private readonly string _comparisonProperty = "VkUserId";

		public NotEqualVkIdAttribute() : base("Invalid value")
		{

		}
		protected override ValidationResult IsValid(object value, ValidationContext validationContext)
		{
			ErrorMessage = ErrorMessageString;
			var currentValue = (long)value;

			var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

			if (property == null)
				throw new ArgumentException("Property with this name not found");

			var comparisonValue = (long)property.GetValue(validationContext.ObjectInstance);

			if (currentValue == comparisonValue)
				return new ValidationResult(ErrorMessage);

			return ValidationResult.Success;
		}
	}
}
