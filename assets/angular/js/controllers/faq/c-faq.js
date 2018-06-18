angular.module('doverApp')
.controller('faqController', function($scope, $location, mainService){
		$scope.language = mainService.selectedLanguage;
});