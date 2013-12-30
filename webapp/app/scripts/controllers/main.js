'use strict';

/**

    TODO:
    [ ] - refactor intake model
    [ ] - specify terms used definitions in separate doc, ie

            Define TAKER : taker is a
            volunteer | staff | persons
            filling out intake.
**/

angular.module('webapp')
    .controller('MainCtrl', function($scope, $http) {

        var init = function() {
            $("#datepicker").datepicker();
        }

        $scope.Intake = {};
        $scope.Intake.taker = "";

        $scope.Intake.date = function() {
            new Date();
        }

        // load the page with intakes

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
            $http.post('/api/intakes/', $scope.Intake)
                .success(function(data) {
                    // clear value of input
                    // field after submit
                    $('input').val('');
                    // update the intakes on the view
                    $scope.Intakes = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log("Error: " + data);
                });
        }

        // delete intake after checking box
        $scope.deleteIntake = function(id) {
            $http.delete('/api/intakes/' + id)
                .success(function(data) {
                    $scope.intakes = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log("Error: " + data);
                });
        }

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

    });
