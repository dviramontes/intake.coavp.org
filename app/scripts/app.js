'use strict';

angular.module('IntakeApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        // .state('home', {
        //     url: '/home',
        //     templateUrl: 'views/login.html',
        //     controller: 'loginCtrl'
        // })
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
    }).controller('intakeCtrl', function($scope, $http) {

        // load the page with intakes
        $scope.formData = {};

        $http.get('/api/intakes')
            .success(function(data) {
                $scope.intakes = data;
                init();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });


        // submit the add form, send the
        // text to the node API
        $scope.createIntake = function() {
            $http.post('/api/intakes/', $scope.formData)
                .success(function(data) {
                    // clear from after form submission
                    $scope.formData = {};
                    // update the intakes on the view
                    $scope.intakes = data;
                    console.info("Created obj in DB");
                })
                .error(function(data) {
                    console.log("Error: " + data);
                });
        }

        // delete intake after checking box
        $scope.deleteIntake = function(id) {
            $http.delete('/api/intakes/' + id)
                .success(function(data) {
                    console.info("Deleted obj with id of : " + id + " from DB");
                    $scope.intakes = data;

                })
                .error(function(data) {
                    console.error("Error: " + data);
                });
        }

        // $scope.awesomeThings = [
        //     'HTML5 Boilerplate',
        //     'AngularJS',
        //     'Karma'
        // ];

    });
