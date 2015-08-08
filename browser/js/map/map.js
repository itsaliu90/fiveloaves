app.config(function ($stateProvider) {
    $stateProvider.state('map', {
        url: '/map',
        controller: 'MapController',
        templateUrl: 'js/map/map.html'
    });
});

app.controller('MapController', function ($scope, leafletData, leafletBoundsHelpers) {
    var bounds = leafletBoundsHelpers.createBoundsFromArray([
                [ 40.7127, -74.0059 ],
                [ 40.753556, -73.989926 ]
            ]);
    angular.extend($scope, {
        bounds: bounds,
        center: {},
        markers: {
            nyc: {
                lat: 40.7127,
                lng: -74.0059,
            },
            midtown: {
                lat: 40.753556,
                lng: -73.989926,
            }
        },
        layers: {
            baselayers: {
                mapbox_light: {
                    name: 'Mapbox Light',
                    url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1Ijoibm9nZXZlciIsImEiOiI0OGY5NzI2NjU0YTUwNzI5YzA2M2I4OTlmZDQ0NmM4MyJ9.3rZcWQ1wgEWB-rVs-VhE0A',
                        mapid: 'nogever.aafce4fa'
                    }
                }
            }
        }
    });
});


