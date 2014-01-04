'use strict';

angular.module('webapp', [])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'views/login.html',
                controller : 'LoginCtrl'
            })
            .when('/intakes', {
                templateUrl: 'views/intakes.html',
                controller: 'IntakeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
