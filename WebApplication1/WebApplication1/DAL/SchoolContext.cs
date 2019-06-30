using WebApplication1.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace WebApplication1.DAL
{
    public class SchoolContext : DbContext
    {
        public SchoolContext()
            :base("SchoolConnectionString")
        {
        }
       
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            
        }

        //public System.Data.Entity.DbSet<WebApplication1.Models.Event> Events { get; set; }
    }
}