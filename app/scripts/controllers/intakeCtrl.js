'use strict';

/**

    TODO:
    [ ] - refactor intake model
    [ ] - specify terms used definitions in separate doc, ie

            Define TAKER : taker is a
            volunteer | staff | persons
            filling out intake.
**/

// var init = function () {
// $('#datepicker').datepicker();  // use angular ui component instead
// };

angular.module('IntakeApp')
    .controller('intakeCtrl', function ($scope, $http) {

        var restEndPoint = 'http://0.0.0.0:9000/api/';

        // load the page with intakes
        $scope.formData = {};
        $scope.caseNumber = 0;
        $scope.callerTypes = ['Family', 'Friends', 'Romantic', 'Offender', 'Service Provider', 'Organization Survivor/Victim', 'Survivor/Victim', 'Witness', 'Other'];
        $scope.assessTypes = $scope.callerTypes;
        $scope.violenceCategories = ['H', 'I', 'O','P','S','Z'];

        $scope.jumpToCaseNumber = function (val) {
            $scope.caseNumber = val;
        };

        $scope.callbackNeeded = function (val) {
            $scope.formData.callbackNeeded = val;
        };

        $http.get(restEndPoint + 'intakes')
            .success(function (data) {
                $scope.intakes = data;
                // init();
                // console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


        // submit the add form, send the
        // text to the node API
        $scope.createIntake = function () {
            $http.post(restEndPoint + 'intake', $scope.formData)
                .success(function (data) {
                    // clear from after form submission
                    $scope.formData = {};
                    // update the intakes on the view
                    $scope.intakes = data;
                    console.info('Created obj in DB');
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        // delete intake after checking box
        $scope.deleteIntake = function (id) {
            $http.delete(restEndPoint + 'intake/' + id)
                .success(function (data) {
                    console.info('Deleted obj with id of : ' + id + ' from DB');
                    console.log(data);
                    $scope.intakes = data;

                })
                .error(function (data) {
                    console.error('Error: ' + data);
                });
        };

        // $scope.awesomeThings = [
        //     'HTML5 Boilerplate',
        //     'AngularJS',
        //     'Karma'
        // ];

    });
