using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IMyEventsService : IBaseService<YaRyadomEvent>
	{
		Task<MyEventModel[]> GetAllMyEvents(long vkId, CancellationToken cancellationToken = default);

		Task<bool> AddAsync(EventFormModel model, CancellationToken cancellationToken = default);

		Task<bool> RevokeAsync(int eventId, CancellationToken cancellationToken = default);

	}
}
