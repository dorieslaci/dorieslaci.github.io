'use strict';

var app = angular.module('Main', ['ngRoute','ui.materialize','static-include',
	'SuperCtrl',
	'CounterCtrl',
	'FormCtrl',
	'RouteCtrl',
	'HomeCtrl',
	'ParkingCtrl']);
app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }    

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    
}]);
app.config( ['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider
	.when('/visszaszamlalo', {
		templateUrl: 'resources/pages/counter.html',
		controller: 'CounterCtrl'
	})
	.when('/kezdolap', {
		templateUrl: 'resources/pages/home.html',
		controller: 'HomeCtrl'
	})
	.when('/parkolas', {
		templateUrl: 'resources/pages/parking.html',
		controller: 'ParkingCtrl'
	})
	.when('/utvonal', {
		templateUrl: 'resources/pages/route.html',
		controller: 'RouteCtrl'
	})
	.when('/visszajelzes', {
		templateUrl: 'resources/pages/form.html',
		controller: 'FormCtrl'
	})
	.otherwise({
		redirectTo: '/visszaszamlalo'
	});
//	$locationProvider.html5Mode(true);

}]);
