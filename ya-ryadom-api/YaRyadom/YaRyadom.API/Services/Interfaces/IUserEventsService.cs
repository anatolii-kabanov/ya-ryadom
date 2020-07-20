using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IUserEventsService: IBaseService<YaRyadomEvent>
	{
		Task<UserEventModel[]> GetCreatedEvents(long vkId, CancellationToken cancellationToken = default);

		Task<UserEventModel[]> GetVisitedEvents(long vkId, CancellationToken cancellationToken = default);
	}
}
