function FlightMod() {
    var b = {};
    b.ID = 2;
    $.ajax({
        type: "POST",
        url: "/api/Path/TravelMod",
        data: JSON.stringify(b),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (checkmarker) {
                onSuccess3(result);
                
            }
            //init map
            
        },
        error: function (result) {
            //do your own thing  
            alert("fail");
        }
    });

}
var flightPath;
var onSuccess3 = function (result) {
    if (!check3) {
    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };
    var flightPlanCoordinates = []; 
            flightPlanCoordinates.push({ lat: result.Markers[0].Lat, lng: result.Markers[0].Lng });
            flightPlanCoordinates.push({ lat: result.Markers[2].Lat, lng: result.Markers[2].Lng });
            flightPlanCoordinates.push({ lat: result.Markers[1].Lat, lng: result.Markers[1].Lng });

    flightPath = new google.maps.Polyline({
                path: flightPlanCoordinates,

                icons: [{
                    icon: lineSymbol,
                    offset: '48.48%'
                },
                    {
                        icon: lineSymbol,
                        offset: '100%'
                    }],
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
    })   
    
        createpath();
        check3 = true;
    }
    else {
        deletepath();
        check3 = false;
    }
}
function createpath(){
    window.alert('Flying path from F-town to F-Ville Complete');
    flightPath.setMap(map);
}
function deletepath() {
    window.alert('delete airplane direction');
    flightPath.setMap(null);
}


