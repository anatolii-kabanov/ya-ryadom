using System.Threading;
using System.Threading.Tasks;
using YaRyadom.Domain.Entities.Base;

namespace YaRyadom.API.Services.Interfaces
{
	public interface IBaseService<TEntity> where TEntity : class, IBaseEntity
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		Task<bool> AddAsync(TEntity entity, CancellationToken cancellationToken = default);
	}
}
