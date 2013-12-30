'use strict';

angular.module('webapp', [])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/main', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
