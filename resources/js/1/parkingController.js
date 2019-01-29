'use strict';

var ParkingCtrl = angular.module('ParkingCtrl', ['ui.materialize','ngAnimate']);

ParkingCtrl.controller('ParkingCtrl', function ParkingCtrl($rootScope,$scope,$http,$location,$controller,$window) {	
	
	angular.extend(this, $controller('SuperCtrl', {$scope: $scope}));
	 
	$rootScope.activeNavBar='parking';	
	
	$scope.validate();
	
	
});