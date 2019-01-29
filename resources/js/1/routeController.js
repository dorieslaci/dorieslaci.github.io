'use strict';

var RouteCtrl = angular.module('RouteCtrl', ['ui.materialize','ngAnimate','ngMap']);

RouteCtrl.controller('RouteCtrl', function RouteCtrl($rootScope,$scope,$http,$location,$controller,$window,NgMap) {	
	
	angular.extend(this, $controller('SuperCtrl', {$scope: $scope}));
	 
	$rootScope.activeNavBar='route';	
	
	$scope.validate();
});