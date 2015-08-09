app.config(function ($stateProvider) {
    $stateProvider.state('map', {
        url: '/map',
        controller: 'MapController',
        templateUrl: 'js/map/map.html',
        resolve: {
            foodAlerts: function(FiveLoaves) {
                return FiveLoaves.getAll().catch(function (err) {
                                console.log(err);
                            });
            }
        }
    });
});
app.controller('MapController', function ($scope, foodAlerts) {
    var styleArr = [
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 60
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 40
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 30
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ef8c25"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b6c54c"
                },
                {
                    "lightness": 40
                },
                {
                    "saturation": -40
                }
            ]
        },
        {}
    ];  
    $scope.alerts = foodAlerts;
    $scope.now = new Date();
    $scope.markers = [];
    var geocoder = new google.maps.Geocoder();
    $scope.alerts.forEach(function(alert, index) {
        var address = alert.address + " " + alert.zipCode;
        geocoder.geocode( { "address": address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                var location = results[0].geometry.location;
                alert.location = {
                    latitude: location.G,
                    longitude: location.K,
                    title: alert.organizationName,
                    id: index,
                    fit: true,
                    options: {
                        labelVisible: true
                    }
                }
                $scope.markers.push(alert.location);
            }
        });

    });
    $scope.map = { 
        center: { 
            latitude: 40.741660,
            longitude: -73.955062
        }, 
        zoom: 13,
        bounds: {}
    };
    $scope.options = {
        scrollwheel: false,
        styles: styleArr
    };    
});


