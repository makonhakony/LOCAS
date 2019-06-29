using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MapController : ApiController
    {

        [HttpPost]
        public MapData GetMarker(abc i)
        {
            MapData result2;
            result2 = new MapData();
            result2.Markers=new List<MarkerItem>() {
                new MarkerItem(){Info="F-Town",Lat=10.850801, Lng=106.798401, Img="https://i.chungta.vn/2014/12/20/12-6887-1419087313.jpg"},
                new MarkerItem(){Info="F-Ville", Lat=21.009397, Lng=105.537529, Img="https://i.chungta.vn/2015/01/29/4-1-1856-1422519342.jpg"},
                new MarkerItem(){Info="F-Complex", Lat=15.979144, Lng=108.262119, Img="https://yeudanang.biz/wp-content/uploads/2016/06/fpt-complex.jpg"}
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
            public string Img { get; set; }
        }
        public class abc
        {
            public int ID { get; set; }
        }

        
    }
}