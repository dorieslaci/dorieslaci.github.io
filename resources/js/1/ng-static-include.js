angular.module("static-include", [])
	.directive('staticInclude', function($http, $compile) {
    return function(scope, element, attrs) {
        var templatePath = attrs.staticInclude;
        $http.get(templatePath).success(function(response) {
            var contents = element.html(response).contents();
            $compile(contents)(scope);
        });
    };
});