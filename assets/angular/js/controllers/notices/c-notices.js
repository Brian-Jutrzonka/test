angular.module('doverApp')
.controller('noticesController', function($scope, $location, mainService, $http, $sce){
	
//Initialization
	//Fires function when page loads to get the logged in variable
		var noticeLayoutEnter = function () {
			$http.get('/content/notices.json').success(function(data) {
				$scope.notices = data;
				angular.forEach($scope.notices,function(value)	{
					value.content = $sce.trustAsHtml(value.content);
					return $scope.notices;
				});
			});
		};
		noticeLayoutEnter();
//Gets the correct Language
	$scope.language = mainService.selectedLanguage;
		
});