using System.Runtime.Serialization;

namespace YaRyadom.Vk.Enums
{
	public enum VkLanguage
	{
		[EnumMember(Value = "ru")]
		Ru = 0,
		[EnumMember(Value = "uk")]
		Uk = 1,
		[EnumMember(Value = "be")]
		Be = 2,
		[EnumMember(Value = "en")]
		En = 3,
		[EnumMember(Value = "es")]
		Es = 4,
		[EnumMember(Value = "fi")]
		Fi = 5, 
		[EnumMember(Value = "de")]
		De = 6, // — немецкий,
		[EnumMember(Value = "it")]
		It = 7, // — итальянский.
	}
}
