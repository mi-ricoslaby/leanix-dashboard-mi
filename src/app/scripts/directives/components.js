angular.module('app')
.directive('components', function () {

    var qualityData = function (amount, name) {
        this.amount = amount,
            this.name = name
    }

    var getComponentsData = function (response) {
        var componentsData = {};
        var count = 0;
        var noLifecycle = 0;
        var noSupport = 0;
        var maxDepApps = 0;
        var maxDepAppsID = "";
        var maxDepAppsName = "";

        for (i = 0; i < response.length; ++i) {
            var resourceCap = response[i].resourceHasResourceCapabilities;
            if (response[i].factSheetHasLifecycles && response[i].factSheetHasLifecycles.length === 0) {
                ++noLifecycle;
            }

            var resourceCap = response[i].resourceHasResourceCapabilities;
            if (resourceCap && resourceCap.length !== 0) {
                if (resourceCap[0].supportTypeID > 0) {
                    ++noSupport;
                }
            }
        }

        componentsData.count = response.length;
        componentsData.noLifecycle = noLifecycle;
        componentsData.noSupport = response.length - noSupport;

        return componentsData;
    }

    var createResourceMap = function (response) {
        var resourceIdMap = {};
        var data = response.data;
        //iterate through response.data object
        for (element in data) {
            if (data[element].serviceHasResources && data[element].serviceHasResources.length > 0) {
                var serviceHasResources = data[element].serviceHasResources;

                //iterate through serviceHasResources Object
                for (serviceElement in serviceHasResources) {
                    var resourceID = serviceHasResources[serviceElement].resourceID;

                    //if resourceID doesnt exist in Map set count to 1
                    if (typeof resourceIdMap[resourceID] === "undefined") {
                        resourceIdMap[resourceID] = 1;
                    } else {

                        //if resourceID exist in Map increment counter
                        resourceIdMap[resourceID] = resourceIdMap[resourceID] + 1;
                    }
                }
            }
        }
        return resourceIdMap;
    }

    var getMostUsedResourceObject = function (resourceMap) {
        var maxOccurences = 0;
        var resourceID = 0;
        for (resource in resourceMap) {
            if (resourceMap[resource] > maxOccurences) {
                maxOccurences = resourceMap[resource];
                resourceID = resource;
            }
        }
        return new Object({"resourceID": resourceID, "occurences": maxOccurences});
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
            $scope.imgName = "comp.png";
            $scope.name = "Komponenten";

            ApiService.api('resources', {"lifecycle": "any", "relations": true})
                .then(function (response) {
                    $scope.quality = [];

                    var componentsData = getComponentsData(response.data);
                    $scope.quality.push(new qualityData(componentsData.noLifecycle, 'Anzahl der IT Komponenten ohne Lifecycle'));
                    $scope.quality.push(new qualityData(componentsData.noSupport, 'Anzahl der IT Komponenten ohne Support'));

                    $scope.keyFigure1 = componentsData.count;
                    // $scope.keyFigure2 = "+12 %";
                    $scope.nameKeyFigure1 = "Anzahl der IT Komponenten";
                    $scope.nameKeyFigure2 = "Erstellte Komponenten seit Vormonat (der gleiche Stichtag)";
                    $scope.date = getDateAsString(new Date());
                    $scope.baseUrl = $routeParams.baseUrl;

                    if (config.workspace != null)
                        $scope.color = config.workspace.objectTypes.resources.color;
                    return response;
                });

            var date = new Date();
            date.setMonth(date.getMonth() - 1);
            var activityParams = new Object({
                "startDate": date.toString(),
                "factSheetType": "resources",
                "eventType": "OBJECT_CREATE",
                "countOnly": "1"
            });
            ApiService.api('activities', activityParams)
                .then(function (response) {
                    $scope.keyFigure2 = response.data.count;
                });

            var params = new Object({"relations": true});
            ApiService.api('services', params)
                .then(function (response) {
                    mostUsedComponent = getMostUsedResourceObject(createResourceMap(response));
                    $scope.mostUsedResourceID = mostUsedComponent.resourceID;
                    $scope.mostUsedComponentOccurences = mostUsedComponent.occurences;

                    ApiService.api('resources/' + $scope.mostUsedResourceID)
                        .then(function (response) {
                            $scope.mostUsedResourceName = response.data.displayName;
                        });
                });
        }
    };
});
