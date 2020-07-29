using System.Threading;
using System.Threading.Tasks;

namespace YaRyadom.Daemon.Workers
{
	public interface IWorker
	{
		Task RunAsync(CancellationToken cancellationToken = default);
	}
}
