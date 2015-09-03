angular.module('app')
.factory('ApiService', ['$http', '$routeParams', 'config', function ($http, $routeParams, config) {

    var api = function (endpoint, params) {

        var paramString = "";
        if (params) {
            paramString = '?' + $.param(config.lifecycleParams) + "&" + $.param(params);
        }

        var query = endpoint + paramString;
        var url = config.baseUrl + '/api/v1/' + query;
        var request_data = {
            url: url,
            method: 'GET'
        };

        var http = $http.get(url, {
            headers: {Authorization: "Bearer " + $routeParams.token}
        }).success(function (data, status, headers, config) {
            return data;
        }).error(function (data, status, headers, config) {
            throw('There was an error getting the response from the server.');
        });
        return http;
    };
    return {
        api: api
    };
}]);
