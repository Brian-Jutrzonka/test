angular.module('doverApp')
.controller('miscellaneousController', function($scope, mainService, $http, $timeout, $cookies){
	
//Gets Random thank you after a user submits a form
	var getRandomThankYou = function() {
		$scope.randomThankYou = mainService.randomThankYou;
		if ($scope.randomThankYou.length <=0) {
			$timeout(getRandomThankYou, 500);
		}
	};
	getRandomThankYou();
	
//Starts the tours on the tour page
	$scope.startTour = function(routeName) {
		$cookies.put('tour', 1);
		$cookies.put('tourRoute', routeName);
		mainService.userInForm();
		window.location.href = "/";
		$("body").addClass("tour-active");
	};
	
	
});