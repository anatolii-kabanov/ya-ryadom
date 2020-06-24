using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Linq;
using System.Reflection;
using YaVDele.Domain.Entities;
using YaVDele.Domain.EntityTypeConfigurations;

namespace YaVDele.Domain.DbContexts
{
	public class YaVDeleDbContext : DbContext
	{
		public YaVDeleDbContext()
		{

		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
			  => optionsBuilder.UseNpgsql("Host=localhost;port=5432;;Database=ya_v_dele;Username=ya_v_dele;Password=123456;", o => o.UseNetTopologySuite());

		/// <summary>
		/// Prepare model
		/// </summary>
		/// <param name="modelBuilder"></param>
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// To be sure about extension for location types
			modelBuilder.HasPostgresExtension("postgis");

			var typesToRegister = Assembly.GetExecutingAssembly().GetTypes()
				.Where(type => !string.IsNullOrEmpty(type.Namespace))
				.Where(type => type.BaseType != null && type.BaseType.IsGenericType &&
									type.BaseType.GetGenericTypeDefinition() == typeof(YaVDeleEntityTypeConfiguration<>));
			foreach (var configurationInstance in typesToRegister.Select(Activator.CreateInstance))
			{
				modelBuilder.ApplyConfiguration((dynamic)configurationInstance);
			}
		}

		public void MigrateDatabase()
		{
			if (Database.GetPendingMigrations().Any())
			{
				Database.Migrate();
				// Need to reload postgis types, cause of some wierd behaviour
				Database.OpenConnection();
				((NpgsqlConnection)Database.GetDbConnection()).ReloadTypes();
				Database.CloseConnection();
			}
		}

		public DbSet<YaVDeleUser> YaVDeleUsers { get; set; }

	}
}
