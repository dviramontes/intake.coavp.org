'use strict';

angular.module('IntakeApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        // if the path doesn't match any of the urls you configured
        // otherwise will take care of routing the user to the specified url
        $urlRouterProvider.otherwise('/intake');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('intake', {
                url: '/intake',
                templateUrl: 'views/intake.html',
                controller: 'intakeCtrl'
            });
        // .state('list.item', {
        //     url: '/:item',
        //     templateUrl: 'views/list.item.html',
        //     controller: function ($scope, $stateParams) {
        //         $scope.item = $stateParams.item;
        //     }
        // });
    });
