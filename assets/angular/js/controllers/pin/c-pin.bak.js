angular.module('doverApp')
.controller('pinController', function($scope, $location, mainService, $http){
//WARNING DO NOT UPLOAD TO SERVER.  HAS DIFFERENT CONTENTS INTERACTING WITH MODX
	//Checks the pin and makes it usable in our main service.
	$scope.checkPin = function() {
		mainService.userInForm();
		$location.path(mainService.chooseRoute);
	};
	//Gets the Route Variable to move the user to the next page depending upon what they clicked previously
	$scope.routeButton = mainService.chooseRoute;
	//On click, save a variable that makes other links on the site show an alert before it goes to the page
	//This is for when users try to leave without submitting what they are entering.
	$scope.inForm = function() {
		mainService.userInForm();
	};

});