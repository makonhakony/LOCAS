var map;
var AlreadyGenerate=false;
$(document).ready(function () {  
    var marker;
    initMap();
    map.addListener('click', function (e) {
        var lat, lng;
        placeMarkerAndPanTo(e.latLng, map);
        $("#article-editor").modal();
        create();
        
        
    });    
    
});

function create() {
    
    $("#Save-btn").click(function () {
        var valid=true;
        $.ajax({
            type: "POST",
            url: "/Sharing/Index",
            datatype:'json',
            data: {
                
                EventCode: $("#ecode").val(),
                EventName: $("#ename").val(),
                latitude: lat,
                longtitude: lng
            },
            success: function (result) {
                
                if (!result.success) {
                    alert(result.content); //alert exist
                    valid = false;
                }
                else {
                    
                    alert(result.content); //done
                    valid = true;
                    
                }
                if ($("#ecode").val() == "")
                    alert("You have to input the value");
                else
                    if (valid) {
                        $("#article-editor").modal('hide');
                        
                    }
                
            }

        });
        if (!AlreadyGenerate)
            marker.setVisible(false);
        else {
            marker.setTitle = $("#ecode").val();
            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent($("#ename").val());
        }
        
    });
}
function initMap() {
    // Setting.
    var fsoft = { lat: 16, lng: 106 };

    // The map, centered
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 5, center: fsoft,
            styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{ color: '#263c3f' }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#6b9a76' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{ color: '#38414e' }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#212a37' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#9ca5b3' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{ color: '#746855' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#1f2835' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#f3d19c' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{ color: '#2f3948' }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#d59563' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{ color: '#17263c' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#515c6d' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#17263c' }]
                }
            ]
        });
    
    
}
function placeMarkerAndPanTo(a, map) {

    marker = new google.maps.Marker({
        position: a,
        animation: google.maps.Animation.DROP,
        map: map
    });
    lat = a.lat().toFixed(3);
    lng = a.lng().toFixed(3);
    //a.lat().toFixed(n) ==> the value of lat/lng
    map.panTo(a);
    $("#Close-btn").click(function () {
        marker.setVisible(false);
    });
    
    
}


function placeSharing() {
    AlreadyGenerate = true;
    $.ajax({
        url: '/Sharing/PlaceSharingMarker',
        type: 'GET',
        success: function (data) {
            var markers = [];
            
                //create a blank array
                

                //loop the list of addresses returned from Ajax request
                $.each(data, function (index, item) {
                    //create a blank array of address
                    var marker = {};

                    //fill data
                    marker["Name"] = item.EventName;
                    marker["Code"] = item.EventCode;
                    marker["lat"] = item.latitude;
                    marker["lng"] = item.longtitude;


                    //push the current marker details in markers array
                    markers.push(marker);
                })

                //call Map function with all markers passed as list of arrays
                initializeMap(markers);
            }
            
        
    });
}

function initializeMap(markers) {
    //you can check your marker data in console
    console.log(markers);
    //Create Google map options
    
    var infoWindow = new google.maps.InfoWindow();
    

    //loop through each marker data
    for (i = 0; i < markers.length; i++) {
        var data = markers[i]
        //set lat long of current marker
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: data.Code
        });

        (function (marker, data) {
            // add a on marker click event
            google.maps.event.addListener(marker, "click", function (e) {
                //show description
                infoWindow.setContent(data.Name);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }
    
}
