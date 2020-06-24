using System.Threading;
using System.Threading.Tasks;
using YaVDele.API.Models;
using YaVDele.Domain.Entities;

namespace YaVDele.API.Services.Interfaces
{
	public interface IMyEventsService : IBaseService<YaVDeleEvent>
	{
		Task<MyEventModel[]> GetAllMyEvents(long vkId, CancellationToken cancellationToken = default);

		Task<bool> AddAsync(EventFormModel model, CancellationToken cancellationToken = default);

		Task<bool> RevokeAsync(int eventId, CancellationToken cancellationToken = default);
	}
}
