'use strict';

angular.module('IntakeApp')
  .controller('loginCtrl', function ($scope, $http, $location) {

    var restEndPoint = 'http://0.0.0.0:9000/';

    // $scope.formData = {};

    $scope.login = function () {
      $http.post(restEndPoint + 'login', $scope.formData)
        .success(function (data) {
          $location.path('/');
        }).error(errMessage);
    };

    $scope.register = function () {
      $http.post(restEndPoint + 'register', $scope.formData)
        .success(function (data) {
          console.log(data);
        }).error(errMessage);
    };

    var errMessage = function (err, type) {
      console.error('Error:: ' + type);
      console.warn('Code:: ' + err.code);
      console.dir('Message:: ' + err.message);
    };
  });
