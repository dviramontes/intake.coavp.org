'use strict';

angular.module('webapp', [])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'views/login.html',
                controller : 'loginCtrl'
            })
            .when('/intakes', {
                templateUrl: 'views/intakes.html',
                controller: 'intakeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
