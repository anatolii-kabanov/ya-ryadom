using Microsoft.Extensions.Hosting;
using System;

namespace YaRyadom.Daemon.Services
{
	public interface IService : IHostedService, IDisposable
	{
	}
}
