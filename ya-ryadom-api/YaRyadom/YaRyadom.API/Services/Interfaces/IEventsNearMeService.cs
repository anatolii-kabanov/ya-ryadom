using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IEventsNearMeService : IBaseService<YaRyadomEvent>
	{
		Task<YaRyadomEventModel[]> GetAllEventsByDistance(EventsRequestModel model, CancellationToken cancellationToken = default);
	}
}
