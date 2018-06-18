angular.module('doverApp')
.controller('headerController', function($scope, $location, mainService, $http, $cookies){

//Passes in the User's Status to see whether or not they are currently within a route
	$scope.userFormStatus = mainService.userFormStatus;

//Get the notices to show number in header
	$http.get('/content/notices.json').success(function(data) {
		var count = 0;
		for(var i=0;i < data.length;i++) {count++;}
		$scope.noticeCount = count;
	});
	
//Changes the cookie depending upon what language they choose
	$scope.changeLanguage = function(elValue) {
		$cookies.put('language', elValue);
		//Checks to see if you are in the admin area.  If so, it will reload the page.  If you're in the main app, it will take you back to the home page.
		var currentURL = window.location.href, substring = "admin";
		if (currentURL.indexOf(substring) !== -1) {
			location.reload();
		}
		else {
			window.location.href = "/";
		}
	};
	

});