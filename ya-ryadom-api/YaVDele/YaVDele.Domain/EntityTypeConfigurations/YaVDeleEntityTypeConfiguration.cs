using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaVDele.Domain.Entities.Base;

namespace YaVDele.Domain.EntityTypeConfigurations
{
	public abstract class YaVDeleEntityTypeConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : class, IBaseEntity
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="builder"></param>
		public abstract void Configure(EntityTypeBuilder<TEntity> builder);
	}
}
