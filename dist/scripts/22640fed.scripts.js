"use strict";angular.module("webapp",[]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"loginCtrl"}).when("/intakes",{templateUrl:"views/intakes.html",controller:"intakeCtrl"}).otherwise({redirectTo:"/"})}]);var init=function(){$("#datepicker").datepicker()};angular.module("webapp",["ui.bootstrap"]).controller("intakeCtrl",["$scope","$http",function(a,b){a.formData={},b.get("/api/intakes").success(function(b){a.intakes=b,init(),console.log(b)}).error(function(a){console.log("Error: "+a)}),a.createIntake=function(){b.post("/api/intakes/",a.formData).success(function(b){a.formData={},a.intakes=b,console.info("Created obj in DB")}).error(function(a){console.log("Error: "+a)})},a.deleteIntake=function(c){b.delete("/api/intakes/"+c).success(function(b){console.info("Deleted obj with id of : "+c+" from DB"),a.intakes=b}).error(function(a){console.error("Error: "+a)})}}]),angular.module("webapp").controller("loginCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);