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
                new MarkerItem(){Info="Ho Chi Minh City",Lat=10.850801, Lng=106.798401, Img="https://www.tripsavvy.com/thmb/X9MkbRYCJWjqjhISgMf6ypbGjzc=/950x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/saigon-ho-chi-minh-city-vietnam-5c489f50c9e77c000112d22b.jpg"},
                new MarkerItem(){Info="Ha Noi Capital", Lat=21.009397, Lng=105.537529, Img="https://press.fourseasons.com/content/dam/fourseasons/images/web/HOI/HOI_001_aspect16x9.jpg/jcr:content/renditions/cq5dam.web.press.722.keepaspectratio.jpeg"},
                new MarkerItem(){Info="Da Nang City", Lat=15.979144, Lng=108.262119, Img="https://i-english.vnecdn.net/2019/03/19/shutterstock1086195560-1552977-7649-1407-1552977700_680x0.jpg"}
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