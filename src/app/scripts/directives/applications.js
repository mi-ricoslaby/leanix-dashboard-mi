angular.module('app')
.directive('applications', function () {

    var qualityData = function (amount, name) {
        this.amount = amount,
            this.name = name
    }

    var getApplicationsData = function (response) {
        var appData = {};
        var count = 0;
        var noInterfaces = 0;
        var noDocuments = 0;
        var noResources = 0;
        var noResponsibles = 0;

        for (i = 0; i < response.length; ++i) {
            if (response[i].serviceHasInterfaces && response[i].serviceHasInterfaces.length === 0) {
                ++noInterfaces;
            }
            if (response[i].factSheetHasDocuments && response[i].factSheetHasDocuments.length === 0) {
                ++noDocuments;
            }
            if (response[i].serviceHasResources && response[i].serviceHasResources.length === 0) {
                ++noResources;
            }
            if (response[i].userSubscriptions && response[i].userSubscriptions.length) {
                var noResponsible = true;
                for (var x = 0; x < response[i].userSubscriptions.length; x++) {
                    if (response[i].userSubscriptions[x].subscriptionTypeID == "2")
                        noResponsible = false;
                }

                if (noResponsible)
                    ++noResponsibles;
            }
        }
        appData.count = response.length;
        appData.noInterfaces = noInterfaces;
        appData.noDocuments = noDocuments;
        appData.noResources = noResources;
        appData.noResponsibles = noResponsibles;
        return appData;
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
        controller: function ($scope, $element, $attrs, ApiService, $routeParams, config) {
            var params = new Object({"relations": true});

            ApiService.api('services', params)
                .then(function (response) {

                    $scope.quality = [];

                    var appData = getApplicationsData(response.data);
                    $scope.keyFigure1 = appData.count;
                    $scope.quality.push(new qualityData(appData.noResponsibles, 'Anzahl der Applikationen ohne Verantwortlichkeiten'));    //TBD
                    $scope.quality.push(new qualityData(appData.noInterfaces, 'Anzahl der Applikationen ohne Schnittstellen'));
                    $scope.quality.push(new qualityData(appData.noDocuments, 'Anzahl der Applikationen ohne Dokumente'));
                    $scope.quality.push(new qualityData(appData.noResources, 'Anzahl der Applikationen ohne IT Komponenten'));

                    if (config.workspace != null)
                        $scope.color = config.workspace.objectTypes.services.color;
                });


            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            var activityParams = new Object({
                "startDate": date.toString(),
                "factSheetType": "services",
                "eventType": "OBJECT_CREATE",
                "countOnly": "1"
            });
            ApiService.api('activities', activityParams)
                .then(function (response) {
                    $scope.keyFigure2 = response.data.count;
                });

            $scope.imgName = "app.png";
            $scope.name = "Applikationen";

            //$scope.keyFigure2 = "+2 %";
            $scope.nameKeyFigure1 = "Anzahl der Applikationen";
            $scope.nameKeyFigure2 = "Erstellte Anwendungen seit Vormonat (der gleiche Stichtag)";
            $scope.date = getDateAsString(new Date());
            $scope.baseUrl = $routeParams.baseUrl;
        }

    };
});
