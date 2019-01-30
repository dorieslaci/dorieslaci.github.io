'use strict';

var FormCtrl = angular.module('FormCtrl', ['ui.materialize','ngAnimate']);

FormCtrl.controller('FormCtrl', function FormCtrl($rootScope,$scope,$http,$location,$controller,$window) {	
	
	angular.extend(this, $controller('SuperCtrl', {$scope: $scope}));
	 
	$rootScope.activeNavBar='form';	
	$scope.users=[{
		civilCeremony:true,
		accommodation:true
	}];
	
	
	$('.modal').modal({
		dismissible: true
	});
	
	$http.get("https://ipinfo.io/").then(function (response) 
	{
		$scope.ip = response.data.ip;
	});
	
	
	
	
	$scope.now = function() {

	    var date = new Date();
	    var aaaa = date.getFullYear();
	    var gg = date.getDate();
	    var mm = (date.getMonth() + 1);

	    if (gg < 10)
	        gg = "0" + gg;

	    if (mm < 10)
	        mm = "0" + mm;

	    var cur_day = aaaa + "-" + mm + "-" + gg;

	    var hours = date.getHours()
	    var minutes = date.getMinutes()
	    var seconds = date.getSeconds();

	    if (hours < 10)
	        hours = "0" + hours;

	    if (minutes < 10)
	        minutes = "0" + minutes;

	    if (seconds < 10)
	        seconds = "0" + seconds;

	    return cur_day + "_" + hours + ":" + minutes + ":" + seconds+':'+date.getMilliseconds();

	}
	
	$scope.getIp=function(){
		return $scope.ip!=undefined ? $scope.ip.replace(/\./g,'_') : "xxx";
	}
	
	$scope.save=function(){
		$scope.isSending=true;

		try{
			var fb = {};
			var i=0;
			angular.forEach($scope.users, function(value, key) {
				  fb[i+""]=value;
				  i++;
			});
			firebase.database().ref('responses/'+$scope.now()+"_"+$scope.getIp()).set(angular.copy(fb));
			$scope.isSending=false;
			Materialize.toast("Sikeres válaszadás", 5000);
			$location.path('/kezdolap');
		} catch(err) {
			$scope.isSending=false;
			Materialize.toast("Váratlan hiba történt", 5000);	
			console.log(err);
		}
	}

	$scope.validate();
	
	$scope.addUser=function(withoutMessage){
		$scope.users.push({
			civilCeremony:true,
			accommodation:true
		});	
		if(!withoutMessage){
			Materialize.toast("Személy sikeresen hozzáadva a listához", 5000);
			angular.element(document).ready(function(){
				$('html, body').animate({scrollTop: $("#userId_"+$scope.users.length).offset().top-20}, 'slow');
			});	
			
		}
	}
	
	$scope.removeUser=function(index){
		$scope.users.splice(index, 1);
		Materialize.toast((index+1)+". Személy sikeresen eltávolítva", 5000);
	}
	
	$scope.$watch('users', function (newValue, oldValue, scope) {
		if(newValue.length==0){
			scope.addUser(true);
		}
	}, true);
});