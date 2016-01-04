/**
 * Created by cristian on 12/8/15.
 */

var app = angular.module('todoApp', ['ngRoute', 'directives', 'pages', 'angular-google-analytics']);
//inject underscore
app.constant('_',_);

//Google Analytics
app.config(['AnalyticsProvider', function (AnalyticsProvider) {
    AnalyticsProvider.setAccount('UA-2724688-3');
    // Track all routes (default is true).
    AnalyticsProvider.trackPages(true);
    // Set the domain name
    AnalyticsProvider.setDomainName('http://just-do-it.azurewebsites.net/');
}]);

// As an example, add the service to the run call:
app.run(['Analytics', function(Analytics) {}]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
        templateUrl: 'views/pages/home/home.html',
        controller: 'IndexPageController'
    }).
        when('/archive', {
        templateUrl: 'views/pages/archive/archive.html',
        controller: 'ArchivePageController'
    })
}]);

app.controller('NavigationController', ['$scope', '$location', '_',
    function($scope, $location, _) {
        //create menu items in the nav bar dinamically

        $scope.menus  = [{
            name: 'Home',
            url: '/',
            class: ''
        }, {
            name: 'Archive',
            url: '/archive',
            class: ''
        }];

        var updateNavigation = function() {
            var url = $location.url();
            _.each($scope.menus , function(menu) {
               if (menu.url === url || (menu.url + '/') === url) {
                   menu.class = 'active';
               } else {
                   menu.class = '';
               }
            });
        };

        $scope.$on('$routeChangeSuccess', function() {
            updateNavigation();
        });

        updateNavigation();
}]);


