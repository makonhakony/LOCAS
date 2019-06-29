namespace ContosoUniversity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEventSp : DbMigration
    {
        public override void Up()
        {
            CreateStoredProcedure(
                "dbo.AddEvent",
                p => new
                {
                    code = p.String(maxLength: 50),
                    name = p.String(maxLength: 50),
                    lat = p.Double(),
                    lng = p.Double()
                },
                body:
                @"INSERT [dbo].[Event]([EventCode],[EventName],[latitude],[longtitude])
                    VALUES (@code,@name,@lat,@lng)"
            );
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.AddEvent");
        }
    }
}
