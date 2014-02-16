'use strict';

/**

	TODO:
	[ ] - refactor intake model
	[ ] - specify terms used definitions in separate doc, ie

**/

// var init = function () {
// $('#datepicker').datepicker();  // use angular ui component instead
// };

angular.module('IntakeApp')
    .controller('intakeCtrl', function ($scope, $http) {

        var restEndPoint = 'http://0.0.0.0:9000/api/';

        // load the page with intakes
        $scope.formData = {};
        $scope.formData.caseNumber = 1;
        $scope.callerTypes = ['Family', 'Friends', 'Lover/Partner', 'Offender', 'Service Provider', 'Organization Survivor/Victim', 'Survivor/Victim', 'Witness', 'Other'];
        $scope.assessTypes = $scope.callerTypes;
        $scope.violenceCategories = ['H', 'I', 'O', 'P', 'S', 'Z'];

        $scope.jumpToCaseNumber = function (val) {
            console.log('caseNumber:: ' + val);
            $scope.formData.caseNumber = val;
        };

        $scope.callbackNeeded = function (val) {
            // console.log(val);
            $scope.formData.callbackNeeded = val;
        };

        $scope.fetchData = function () {
            console.log('fetching data..');
            $http.get(restEndPoint + 'intakes')
                .success(function (data) {
                    $scope.intakes = data;
                    // init();
                    console.log(data);
                }).error(errMessage);
        };


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
                }).error(errMessage);
        };

        // delete intake after checking box
        $scope.deleteIntake = function (caseNumber) {
            $http.delete(restEndPoint + 'intake/' + caseNumber)
                .success(function (data) {
                    console.info('Deleted obj with id of : ' + caseNumber + ' from DB');
                    console.log(data);
                    $scope.intakes = data;

                }).error(errMessage);
        };

        $scope.updateIntake = function (caseNumber) {
            console.log($scope.formData);
            console.log('attemp to update with caseNumber:' + caseNumber);
            // console.log(typeof caseNumber);
            $http.put(restEndPoint + 'intake/' + caseNumber, $scope.formData)
                .success(function (data) {
                    console.info('Updated obj with caseNumber of : ' + caseNumber + ' from DB');
                    console.dir(data);
                    // $scope.intakes = data;
                }).error(errMessage);

        };

        var errMessage = function (err, type) {
            console.error('Error:: ' + type);
            console.warn('Code:: ' + err.code);
            console.dir('Message:: ' + err.message);
        };

    });
