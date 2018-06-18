angular.module('doverApp')
.controller('mmenuController', function($scope, $location, mainService, $cookies){

//Passes in the User's Status to see whether or not they are currently within a route
	$scope.userFormStatus = mainService.userFormStatus;
	
});