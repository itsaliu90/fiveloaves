app.factory('FiveLoaves', function ($http) {
    var getAll = function() {
        return $http.get('/api/post').then(function (response) {
                return response.data;
            });
    };
    return {
        getAll: getAll
    };
});
