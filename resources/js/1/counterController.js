'use strict';

var CounterCtrl = angular.module('CounterCtrl', ['ui.materialize','ngAnimate','angular-encryption']);

CounterCtrl.controller('CounterCtrl', function CounterCtrl($rootScope,$scope,$http,$location,$controller,$window,sha256) {	
	
	angular.extend(this, $controller('SuperCtrl', {$scope: $scope}));
	 
	$rootScope.activeNavBar='counter';
	
	$scope.signInUser={};
	
	$('.modal').modal({
		dismissible: true
	});

	var clock;
	angular.element(document).ready(function(){
		$('.slider').slider(
				{
					full_width: true,
					height: 550,
					indicators: false
				}
		);
		
		// Grab the current date
		var currentDate = new Date();

		// Set some date in the future. In this case, it's always Jan 1
			var futureDate  = new Date("2019-07-06T13:45:00");
//		var futureDate  = new Date("2019-01-15 14:55");

		// Calculate the difference in seconds between the future and current date
		var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

		// Instantiate a coutdown FlipClock
		clock = $('.clock').FlipClock(diff>0 ? diff : 0, {
			clockFace: 'DailyCounter',
			countdown: true,
			showSeconds: true,
			autoStart: false,
			callbacks: {
	        	stop: function() {
	        		$('.message').html('Elkezdődött az esküvő :D')
	        	}
	        }
		});
		if(diff<=0){
			clock.setTime(0);
		}			
	    clock.start();
		
	});	
	
	$scope.openLogin=function(){
		if($rootScope.user!=undefined && $rootScope.user.password!=undefined){
			$scope.signInUser.password=$rootScope.user.password;
		}
		$('#loginModal').modal('open');
	}		
	
	
	$rootScope.login=function(){
		$('#loginModal').modal('close');		
		if(sha256.convertToSHA256($scope.signInUser.password)=="b225fc528a48dc51416d77af1746795ff3e3fe8b9fc8b78167e86ba66bfaeeea"){
			$rootScope.user={
					password:$scope.signInUser.password
			}
			$location.path('/kezdolap');
		}else{
			$rootScope.user=null;
			$scope.signInUser.password=null;
			$scope.errorMessage("Helytelen jelszó");
		}		
	}
	
	$scope.getImage=function(isMobile,mobileImage,otherImage){
		return isMobile ? mobileImage : otherImage;
	}
	
});