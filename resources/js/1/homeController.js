'use strict';

var HomeCtrl = angular.module('HomeCtrl', ['ui.materialize','ngAnimate','ngMap']);

HomeCtrl.controller('HomeCtrl', function HomeCtrl($rootScope,$scope,$http,$location,$controller,$window,NgMap) {	
	
	angular.extend(this, $controller('SuperCtrl', {$scope: $scope}));
	 
	$rootScope.activeNavBar='home';	
	
	$scope.validate();
});