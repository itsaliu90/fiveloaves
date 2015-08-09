app.config(function ($stateProvider) {

    $stateProvider.state('sendAlert', {
        url: '/sendAlert',
        templateUrl: 'js/sendAlert/sendAlert.html',
        controller: 'SendAlertCtrl',
        data: {
            authenticate: true
        }
    });

});

app.factory('SendAlertFactory', function ($http) {

    return {
        sendAlert: function (alertObj) {
                return $http.post('/api/post').then(function (response) {
                    return response.data;
                });
            }
    }
});

app.controller('SendAlertCtrl', function ($scope, AuthService, $state, SendAlertFactory) {


    console.log("IM HERE!!!!");
    $scope.alertInfo = {};
    $scope.error = null;

    $scope.sendAlert = function (alertInfo) {

        $scope.error = null;

        SendAlertFactory.sendAlert(alertInfo)
            .then(function() {
                $state.go('home');  
            }).catch(function(err) {
                $scope.error = 'Alert form not completed/filled correctly!';
                console.error(err);
            });
    };
});