function getMarker() {
    var a = {};
    a.ID = 1;
    $.ajax({
        type: "POST",
        url: "/api/Map/GetMarker",
        data: JSON.stringify(a),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            
            
            onSuccess(result);
            
            //init map

        },
        error: function (result) {
            //do your own thing  
            alert("fail");
        }
    });

}


class P {
    constructor() {
        this.marker=null;
        this.Info=null;
        this.Img=null;
    }
    
}
Point = new Array();
var infowindow;

var onSuccess = function (result) {
    if (!check1) {
        var i;
        for (i in result.Markers) {
            Point[i] = new P();
            var a = { lat: result.Markers[i].Lat, lng: result.Markers[i].Lng }
            Point[i].marker = new google.maps.Marker({ position: a, map: map, animation: google.maps.Animation.DROP });
            Point[i].Info = result.Markers[i].Info;
            Point[i].Img = result.Markers[i].Img;
        }
        
        Point[0].marker.addListener('click', function () {
            markerclick(Point[0]);                   
        });
        Point[1].marker.addListener('click', function () {
            markerclick(Point[1]);
        });
        Point[2].marker.addListener('click', function () {
            markerclick(Point[2]);
        });
        
        check1 = true
        checkmarker = true;
    }
    
    function setupMap() {
        map.setZoom(8);
        window.setTimeout(function () {
            map.setZoom(12);
        }, 800);
        window.setTimeout(function () {
            map.panTo({ lat: 16, lng: 106 });
            map.setZoom(5);
            infowindow.close();
        }, 7000);
    }
    function markerclick(Point) {
        map.panTo(Point.marker.getPosition())
        setupMap();
        infowindow = new google.maps.InfoWindow({
            content: Point.Info + '<br/> ' + "<div><img src='" + Point.Img + "' style='height: 100px; max-width:200px;background-size:contain;'></div>"
            //content: contentstring = result.Markers[0].Info 

        });
        infowindow.open(map, Point.marker);
        Point.marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(function () {
            Point.marker.setAnimation(null);
        }, 7000)
    }

        
}

