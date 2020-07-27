using YaRyadom.API.Models.Base;

namespace YaRyadom.API.Models.Requests
{
	public class UserLocationRequestModel : BaseVkUserRequestModel
	{
		/// <summary>
		/// X
		/// </summary>
		public double Longitude { get; set; }

		/// <summary>
		/// Y
		/// </summary>
		public double Latitude { get; set; }
	}
}
