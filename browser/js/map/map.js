app.config(function ($stateProvider) {
    $stateProvider.state('map', {
        url: '/map',
        controller: 'MapController',
        templateUrl: 'js/map/map.html'
    });
});
app.controller('MapController', function ($scope) {
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
    $scope.map = { 
        center: { 
            latitude: 40.7127,
            longitude: -74.0059 
        }, 
        zoom: 13,
        bounds: {}
    };
    $scope.options = {
        scrollwheel: false,
        styles: styleArr
    };
    $scope.randomMarkers = [{
        latitude: 40.7127,
        longitude: -74.0059,
        title: 'm1',
        id: 1,
        fit: true,
        options: {
            labelVisible: true
        }
      }, {
        latitude: 40.754516, 
        longitude: -73.994723,
        title: 'm2',
        id: 2,
        fit: true,
        options: {
            labelVisible: true
        }
      }];
    
});


