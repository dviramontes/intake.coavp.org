'use strict';

/**

    TODO:
    [ ] - refactor intake model
    [ ] - specify terms used definitions in separate doc, ie

            Define TAKER : taker is a
            volunteer | staff | persons
            filling out intake.
**/

// var init = function() {
//     $("#datepicker").datepicker();
// }

angular.module('webapp')
    .controller('intakeCtrl', function($scope, $http) {
        // init();
        // load the page with intakes
        $scope.formData = {};

        $http.get('/api/intakes')
            .success(function(data) {
                $scope.intakes = data;
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
