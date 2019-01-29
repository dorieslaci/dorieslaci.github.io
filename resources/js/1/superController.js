'use strict';

var SuperCtrl = angular.module('SuperCtrl', ['matchMedia']);

SuperCtrl.controller('SuperCtrl', function SuperCtrl($scope,$rootScope,$http,$location,$filter,$window,screenSize,$sce) {	
	
	angular.element(document).ready(function(){
		$(".button-collapse").sideNav({
			closeOnClick: true
		});
	});	
	
	$scope.validate = function(onSuccess) {
		if($rootScope.user==undefined || $rootScope.user==null){
			$location.path('/visszaszamlalo');
		}else if(onSuccess!=undefined){
			onSuccess();
		}
	}	
	
	
	$scope.errorMessage = function(message){
		Materialize.toast(message, 5000);
	}
	
	$scope.mobile = screenSize.on('xs, sm', function(match){
	    $scope.mobile = match;
	});
	
	$scope.getLink=function(address){
		return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyC0vW0vXkwfQjt_lEndhPQyeSOytszy5BQ&q="+address);
	}
	
	$rootScope.logOut=function(){
		$rootScope.user=undefined;
		$scope.validate();
	}
	
});