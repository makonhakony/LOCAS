using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class PathController : ApiController
    {

        [HttpPost]
        public MapData TravelMod(abc i)
        {
            MapData result2;
            result2 = new MapData();
            result2.Markers = new List<MarkerItem>() {
                new MarkerItem(){Info="F-Town",Lat=10.850801, Lng=106.798401},
                new MarkerItem(){Info="F-Ville", Lat=21.009397, Lng=105.537529},
                new MarkerItem(){Info="F-Complex", Lat=15.979144, Lng=108.262119}
            };


            return result2;
        }
        
        

        public class MapData
        {
            public List<MarkerItem> Markers { get; set; }
        }

        public class MarkerItem
        {
            public string Info { get; set; }
            public double Lat { get; set; }
            public double Lng { get; set; }
        }
        public class abc
        {
            public int ID { get; set; }
        }
    }
}