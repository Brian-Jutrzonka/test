angular.module('doverApp')
.controller('footerController', function($scope, $location, mainService, $http){
	$scope.userFormStatus = mainService.userFormStatus;
});