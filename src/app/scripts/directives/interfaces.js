angular.module('app')
.directive('interfaces', function () {

    var getInterfaceData = function (response) {
        var interfaceData = {};
        var averageCount = 0;
        var countInterfaces = 0;
        var maxInterfaces = 0;
        var maxInterfacesAppID = "";
        var maxInterfacesAppName = "";
        var ids = [];

        for (i = 0; i < response.length; ++i) {
            if (response[i].serviceHasInterfaces) {
                var interfaces = response[i].serviceHasInterfaces.length;
                countInterfaces += interfaces;
                ids.push(response[i].ID);
                if (interfaces > maxInterfaces) {
                    //store interface data for element with most interfaces
                    maxInterfaces = interfaces;
                    maxInterfacesAppID = response[i].ID;
                    maxInterfacesAppName = response[i].displayName;
                }
            }
        }
        interfaceData.averageCount = Math.round(countInterfaces / response.length);
        interfaceData.maxInterfaces = maxInterfaces;
        interfaceData.maxInterfacesAppID = maxInterfacesAppID;
        interfaceData.maxInterfacesAppName = maxInterfacesAppName;
        interfaceData.Ids = ids;
        return interfaceData;
    };

    var getDateAsString = function (date) {
        var year = date.getFullYear();
        var month = '0' + (date.getMonth() + 1);
        month = month.slice(-2, (month.length - 2) + 3);
        var day = '0' + date.getDate();
        day = day.slice(-2, (day.length - 2) + 3);

        return day + '.' + month + '.' + year;
    };

    return {
        restrict: 'E',
        templateUrl: 'app/infobox.html',
        replace: true,

        scope: {},
        controller: function ($scope, $element, $attrs, ApiService, $routeParams, config) {


            $scope.imgName = "interfaces.png";
            $scope.name = "Schnittstellen";

            var params = new Object({"relations": true});
            ApiService.api('services', params)
                .then(function (response) {

                    var interfaceData = getInterfaceData(response.data);
                    $scope.keyFigure1 = interfaceData.averageCount;
                    $scope.keyFigure2 = interfaceData.maxInterfaces;
                    $scope.nameKeyFigure1 = "⌀ Anzahl der Schnittstellen pro Applikation";
                    $scope.nameKeyFigure2 = "Max Anzahl der Schnittstellen pro Applikation";
                    $scope.maxInterfacesAppID = interfaceData.maxInterfacesAppID;
                    $scope.maxInterfacesAppName = interfaceData.maxInterfacesAppName;
                    $scope.baseUrl = $routeParams.baseUrl;

                    if (config.workspace != null)
                        $scope.color = config.workspace.objectTypes.services.color;

                    return response;
                });
            $scope.date = getDateAsString(new Date());

        }

    };
});
