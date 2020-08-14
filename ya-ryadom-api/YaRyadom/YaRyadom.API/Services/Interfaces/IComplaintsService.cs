using System.Threading;
using System.Threading.Tasks;
using YaRyadom.API.Models.Requests;
using YaRyadom.Domain.Entities;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IComplaintsService : IBaseService<YaRyadomComplaint>
	{
		Task<bool> AddAsync(EventComplaintRequestModel model, CancellationToken cancellationToken = default);
	}
}
