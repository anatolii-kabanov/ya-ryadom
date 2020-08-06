using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Linq;
using System.Reflection;
using YaRyadom.Domain.Entities;
using YaRyadom.Domain.EntityTypeConfigurations;

namespace YaRyadom.Domain.DbContexts
{
	public class YaRyadomDbContext : DbContext
	{
		public YaRyadomDbContext()
		{

		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
			  => optionsBuilder.UseNpgsql("Host=localhost;port=5432;;Database=ya_ryadom;Username=ya_ryadom;Password=123456;", o => o.UseNetTopologySuite());

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
									type.BaseType.GetGenericTypeDefinition() == typeof(YaRyadomEntityTypeConfiguration<>));
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

		public DbSet<YaRyadomUser> YaRyadomUsers { get; set; }

		public DbSet<YaRyadomUserTheme> YaRyadomUserThemes { get; set; }

		public DbSet<YaRyadomEventTheme> YaRyadomEventThemes { get; set; }

		public DbSet<YaRyadomUserApplication> YaRyadomUserApplications { get; set; }

		public DbSet<YaRyadomReview> YaRyadomReviews { get; set; }

		public DbSet<YaRyadomEvent> YaRyadomEvents { get; set; }

		public DbSet<YaRyadomNotification> YaRyadomNotifications { get; set; }
	}
}
