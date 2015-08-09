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
app.controller('SendAlertCtrl', function ($scope, AuthService, $state, SendAlertFactory) {

    $scope.alertInfo = {
        description: ''
    };
    // filepicker.setKey("AYlHStA5UQh6tbkyxrBNfz");
    
    // $scope.addMedia = function() {
    //     filepicker.pick(
    //         {
    //             mimetype: ["image/*", 'text/plain'],
    //             container: 'modal',
    //             services: ['COMPUTER', 'URL', 'GMAIL']
    //         },

    //           function(data){
    //               // add media to database
    //             Note.uploadImage(
    //                 $scope.note._id, 
    //                 { image: data.url }
    //             )
    //             .then(function(note){
    //                 $scope.note = note;
    //             })
    //             .catch(function(err) {
    //                 console.log('new image upload error ', err);
    //             });

    //         },

    //         function(error) {
    //             console.log('filepicker error ', error.toString());
    //         }
    //     );
    // };
    $scope.error = null;
    $scope.picURL;

    $scope.sendAlert = function (alertInfo) {

        $scope.error = null;

        $scope.alertInfo = {
            description: ''
        };

        AuthService.getLoggedInUser().then(function(user) {
            return SendAlertFactory.sendAlert(alertInfo.description, user, $scope.picURL);
        }).then(function() {
            $state.go('map');  
        }).catch(function(err) {
            $scope.error = 'Alert form not completed/filled correctly!';
            console.error(err);
        });
    };
});