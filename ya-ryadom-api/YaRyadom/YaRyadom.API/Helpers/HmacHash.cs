using System;
using System.Buffers.Text;
using System.Security.Cryptography;
using System.Text;

namespace YaRyadom.API.Helpers
{
	public static class HmacHash
	{
		public static string GetToken(string message, string secret)
		{
			secret = secret ?? "";
			var encoding = new UTF8Encoding();
			byte[] keyByte = encoding.GetBytes(secret);
			byte[] messageBytes = encoding.GetBytes(message);
			using (var hmacsha256 = new HMACSHA256(keyByte))
			{
				byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
				return Convert
					.ToBase64String(hashmessage)
					.Replace('+', '-')
					.Replace('/', '_')
					.Replace("=", string.Empty);
			}
		}
	}
}
