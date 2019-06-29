function DrivenMod() {
    var a = {};
    a.ID = 1;
    $.ajax({
        type: "POST",
        url: "/api/Path/TravelMod",                                                                                                                                                                 
        data: JSON.stringify(a),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (checkmarker) {
                if (!check2) {
                    onSuccess2(result);
                    check2 = true;
                }
            }
            
            //init map

        },
        error: function (result) {
            //do your own thing  
            alert("fail");
        }
    });

}

var onSuccess2 = function (result) {
    

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(null);
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay, result);
        
    
}
function calculateAndDisplayRoute(directionsService, directionsDisplay,result) {
    var wp = [];
    wp.push({
        location: new google.maps.LatLng(result.Markers[2].Lat, result.Markers[2].Lng),
        stopover: true
    });
    directionsService.route({
        origin: new google.maps.LatLng(result.Markers[0].Lat, result.Markers[0].Lng),
        destination: new google.maps.LatLng(result.Markers[1].Lat, result.Markers[1].Lng),
        waypoints: wp,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            window.alert('Driving path from F-town to F-Ville Complete');
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
//----------------------------------------------------------------------
