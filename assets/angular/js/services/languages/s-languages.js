angular.module('doverApp').factory('languageService', function languageFactory($translate, $filter, $translateProvider) {

//Initialization
  var service = {};
	//Fires function when page loads to get the location variable
	var getLanguage = function () {
		service.language = $filter('translate')('unsafeCondition.page2.0.title');
		console.log(service.language);
	};
	getLanguage();
	
  return service;
});