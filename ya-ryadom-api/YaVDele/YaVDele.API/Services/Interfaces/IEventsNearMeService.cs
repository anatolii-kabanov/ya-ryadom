using System.Threading;
using System.Threading.Tasks;
using YaVDele.API.Models;
using YaVDele.API.Models.Requests;
using YaVDele.Domain.Entities;

namespace YaVDele.API.Services.Interfaces
{
	public interface IEventsNearMeService : IBaseService<YaVDeleEvent>
	{
		Task<YaVDeleEventModel[]> GetAllEventsByDistance(EventsRequestModel model, CancellationToken cancellationToken = default);
	}
}
