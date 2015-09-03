angular.module('app')
.directive('providers', function () {

    var getProviderData = function (response) {
        var providerData = {};
        var count = 0;
        var providerIDMaxResource = "";
        var providerNameMaxResource = "";
        var maxResources = 0;

        providerData.count = response.length;

        for (i = 0; i < response.length; ++i) {
            if (response[i].resourceHasProviders) {
                var providers = response[i].resourceHasProviders.length;
                if (providers > maxResources) {
                    maxResources = providers;
                    providerIDMaxResource = response[i].ID;
                    providerNameMaxResource = response[i].displayName;
                }
            }
        }

        providerData.maxResources = maxResources;
        providerData.providerIDMaxResource = providerIDMaxResource;
        providerData.providerNameMaxResource = providerNameMaxResource;
        return providerData;
    }

    var getDateAsString = function (date) {
        var year = date.getFullYear();
        var month = '0' + (date.getMonth() + 1);
        month = month.slice(-2, (month.length - 2) + 3);
        var day = '0' + date.getDate();
        day = day.slice(-2, (day.length - 2) + 3);

        return day + '.' + month + '.' + year;
    }

    return {
        restrict: 'E',
        templateUrl: 'app/infobox.html',
        replace: true,

        scope: {},
        controller: function ($scope, $element, $attrs, $routeParams, ApiService, config) {
            $scope.imgName = "providers.png";
            $scope.name = "Provider";
            $scope.baseUrl = $routeParams.baseUrl;

            var params = new Object({"relations": true});
            ApiService.api('providers', params)
                .then(function (response) {

                    var providerData = getProviderData(response.data);
                    $scope.keyFigure1 = providerData.count;
                    $scope.keyFigure2 = "-3 %";
                    $scope.nameKeyFigure1 = "Anzahl der Provider";
                    $scope.nameKeyFigure2 = "Vergleich zum Vormonat (der gleiche Stichtag)";
                    $scope.maxResourcesLabel = "Provider mit den meisten Komponenten";
                    $scope.maxResources = providerData.maxResources;
                    $scope.providerIDMaxResource = providerData.providerIDMaxResource;
                    $scope.providerNameMaxResource = providerData.providerNameMaxResource;

                    if (config.workspace != null)
                        $scope.color = config.workspace.objectTypes.providers.color;

                    return response;
                });
            $scope.date = getDateAsString(new Date());

        }

    };
});
