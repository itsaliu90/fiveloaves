app.config(function ($stateProvider) {

    $stateProvider.state('sendAlert', {
        url: '/sendAlert',
        template: 'js/sendAlert/sendAlert.html',
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

    $scope.alertInfo = {};
    $scope.error = null;

    $scope.sendAlert = function (alertInfo) {

        $scope.error = null;

        SendAlertFactory.sendAlert(alertInfo)
            .then(function(user) {
                $state.go('home');  
            }).catch(function(err) {
                $scope.error = 'Alert form not completed/filled correctly!';
                console.error(err);
            });
    };
});