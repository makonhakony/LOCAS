namespace WebApplication1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEvent_SP : DbMigration
    {
        public override void Up()
        {
            CreateStoredProcedure(
                "dbo.AddEvent",
                p => new
                {
                    code = p.String(maxLength: 50),
                    name = p.String(maxLength: 50),
                    note = p.String(maxLength: 1000),
                    lat = p.Double(),
                    lng = p.Double()
                },
                body:
                @"INSERT [dbo].[Event]([EventCode],[EventName],[EventNote],[latitude],[longtitude])
                    VALUES (@code,@name,@note,@lat,@lng)"
            );
        }
        
        public override void Down()
        {
            DropStoredProcedure("dbo.AddEvent");
        }
    }
}
