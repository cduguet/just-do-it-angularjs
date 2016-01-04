/**
 * Created by cristian on 1/1/16.
 */
var directives = angular.module('directives', []);

directives.directive('todoItem', function() {
    return {
        restrict: 'E',
        scope: { // isolate scope to only todo and update
            todo: '=',
            update: '&'
        },
        templateUrl: 'views/directives/todoItem.html'
    };
});

directives.directive('archivedItem', function() {
    return {
        restrict: 'E',
        scope: { // isolate scope to only todo and update
            archivedtodo: '=',
            undo: '&'
        },
        templateUrl: 'views/directives/archivedItem.html'
    };
});

directives.directive('adsense', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/directives/adsense.html',
        controller: function() {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    };
});