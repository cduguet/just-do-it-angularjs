/**
 * Created by cristian on 1/1/16.
 */

var archivePageModule = angular.module('archivePageModule', []);

archivePageModule.controller('ArchivePageController', ['$scope', 'API',
    function($scope,API) {

        $scope.archiveList = API.getArchive();

        $scope.undo = function(item) {
            //TODO update item
            API.undo(item);
            $scope.archiveList = API.getArchive();
        };

}]);
