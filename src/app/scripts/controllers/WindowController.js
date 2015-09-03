angular.module('app')
.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
    });
}]);

angular.module('app')
.controller('WindowController', ['$scope', '$routeParams', 'ApiService', 'ngDialog', 'config', function ($scope, $routeParams, ApiService, ngDialog, config ) {
    if ('token' in $routeParams) {
        $('body').addClass('isViewedExternally');
    }
    $scope.baseUrl = $routeParams.baseUrl;
    if (config.baseUrl === '')
        config.baseUrl = $routeParams.baseUrl;

    if (config.workspace === null)
        ApiService.api('config')
            .then(function (response) {
                config.workspace = response.data.workspace;
            });
}]);
