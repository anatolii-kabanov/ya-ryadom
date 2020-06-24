using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YaRyadom.Domain.Entities.Base;

namespace YaRyadom.Domain.EntityTypeConfigurations
{
	public abstract class YaRyadomEntityTypeConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : class, IBaseEntity
	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="builder"></param>
		public abstract void Configure(EntityTypeBuilder<TEntity> builder);
	}
}
