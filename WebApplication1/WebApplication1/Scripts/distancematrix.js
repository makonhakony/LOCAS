function Calculate() {
    var a = {};
    a.ID = 4;
    $.ajax({
        type: "POST",
        url: "/api/Path/TravelMod",
        data: JSON.stringify(a),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (checkmarker) {
                onsuccess4(result);
                window.alert("Check the result below the map!");
            }

            //init map

        },
        error: function (result) {
            //do your own thing  
            alert("fail");
        }
    });
}
var onsuccess4 = function (result) {
    var service = new google.maps.DistanceMatrixService;
    var origin1 = new google.maps.LatLng(result.Markers[0].Lat, result.Markers[0].Lng); 
    var origin2 = new google.maps.LatLng(result.Markers[2].Lat, result.Markers[2].Lng);
    var destination = new google.maps.LatLng(result.Markers[1].Lat, result.Markers[1].Lng); 
    var markersArray = []
    service.getDistanceMatrix({
          origins: [origin1, origin2],
          destinations: [origin2,destination],
          travelMode: 'DRIVING',
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('answer');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results, status) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                  markersArray.push(new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon
                  }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              
              //for (var j = 0; j < results.length; j++) {
                
                outputDiv.innerHTML += originList[i] + ' <b>  to </b > ' + destinationList[i] +
                    ': ' + '<b>' + results[i].distance.text + '</b>'+ ' in ' +
                    '<b>' + results[i].duration.text + '</b>'+ '<br>';
              
            }
          }
        });
}
function deleteMarkers(markersArray) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}