app.factory('SendAlertFactory', function ($http) {
    return {
        sendAlert: function (description, organization, picURL) {
                var postObj = {
                    description: description,
                    organizationID: organization._id,
                    organizationName: organization.name,
                    zipCode: organization.zipCode,
                    address: organization.address,
                    city: organization.city,
                    pictureUrl: picURL
                };
                return $http.post('/api/post', postObj).then(function (response) {
                    console.log('posted');
                    return response.data;
                });
            }
    }
});