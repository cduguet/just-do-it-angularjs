/**
 * Created by cristian on 1/1/16.
 */

var indexPageModule = angular.module('indexPageModule',['factories', 'angular-google-analytics']);

// Used inline annotation to prevent breaking functions which use "$scope" injection
indexPageModule.controller('IndexPageController', ['$scope', 'API', function($scope, API) {
    //app logic

    var updateList = function() {
        $scope.list = API.get()
    };

    $scope.list = API.get();
    $scope.submit = function() {
        // Create a new tracking event
        Analytics.trackEvent('click', 'add', $scope.newItem);

        $scope.list = API.add({
            name: $scope.newItem,
            done: false
        });
        $scope.newItem ='';
        console.log($scope.list);
    };
    $scope.update = function(item) {
        API.update(item);
    };
    $scope.archiveAll = function() {
        API.archiveAll();
        updateList();
    }
}]);

