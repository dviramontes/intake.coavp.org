'use strict';

angular.module('IntakeApp', ['ui.router', 'ngAnimate'])
    .config(function ($stateProvider, $urlRouterProvider) {
        // if the path doesn't match any of the urls you configured
        // otherwise will take care of routing the user to the specified url
        $stateProvider
            .state('home', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('intake', {
                url: '/intake',
                templateUrl: 'views/intake.html',
                controller: 'intakeCtrl'
            });
        $urlRouterProvider.otherwise('/intake');
    });
