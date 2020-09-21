using System;
using System.Security.Cryptography;
using System.Text;

namespace YaRyadom.API.Helpers
{
	public static class HmacHash
	{
		public static string GetToken(string message, string secret)
		{
			secret ??= "";
			var encoding = new UTF8Encoding();
			var keyByte = encoding.GetBytes(secret);
			var messageBytes = encoding.GetBytes(message);
			using var hmacsha256 = new HMACSHA256(keyByte);
			byte[] hashMessage = hmacsha256.ComputeHash(messageBytes);
			return Convert
				.ToBase64String(hashMessage)
				.Replace('+', '-')
				.Replace('/', '_')
				.Replace("=", string.Empty);
		}
	}
}
