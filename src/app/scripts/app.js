// app.js
angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

angular.module('app', ['ngRoute', 'ngDialog'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/deck-root.html',
            controller: 'WindowController'
        });

    // turn html5 pushState on
    $locationProvider.html5Mode(true);

}]);


