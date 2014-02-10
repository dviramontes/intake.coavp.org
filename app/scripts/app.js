'use strict';

angular.module('IntakeApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .state('intakes', {
                url: '/intakes',
                templateUrl: 'views/intakes.html',
                controller: 'intakesCtrl'
            });
        // .state('list.item', {
        //     url: '/:item',
        //     templateUrl: 'views/list.item.html',
        //     controller: function ($scope, $stateParams) {
        //         $scope.item = $stateParams.item;
        //     }
        // });
    });
