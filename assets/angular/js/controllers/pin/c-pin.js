angular.module('doverApp')
.controller('pinController', function($scope, $location, mainService, $http){
	
	//Checks to see if a person is logged in or not
		$scope.checkPin = function() {
			var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
			var postData = {u: $scope.listUser};
			$http.post('/api/login.json', postData, config).success(function(data) {
				$scope.login = data;
				if ($scope.login===1) {
					mainService.userInForm();
					$location.path('/' + mainService.chooseRoute + '/2');
				}
				else {
					document.getElementById("errors").innerHTML = "Incorrect Credentials.  Please try again.";
					$("#errors").addClass("errors-show");
				}
			});
		};
	//Gets the Route Variable to move the user to the next page depending upon what they clicked previously
		//$scope.routeButton = mainService.chooseRoute;
	//Changes user name and password
		//$scope.changeUP = function(elName, elValue) {
		//	switch(elName) {
		//		case "U":
		//			$scope.listUser = elValue;
		//			break;
		//		case "P":
		//			$scope.listPass = elValue;
		//			break;
		//		default:
		//			console.log('Try Again');
		//	}
		//};
	//Fires function when page loads to get the logged in variable
		//var pinLayoutEnter = function () {
			//$http.get('https://zeroharm.staging.normandesign.net/api/user.json').
				//success(function(data) {
					//$scope.listUser = data.username;
					//$scope.loggedIn = data.loggedin;
			//});
		//};
		//pinLayoutEnter();
});