angular.module('doverApp')
.config(function($translateProvider) {
	
	//Adds in the $cookies module so that we can use it.  Couldn't inject it due to rules on config objects.
  var $cookies;
  angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
    $cookies = _$cookies_;
  }]);
	//Sets the cookie to a variable
	var languageCookie = $cookies.get('language');
	
	//Sets up the sanitization strategy for security purposes
	$translateProvider.useSanitizeValueStrategy('sanitize');
	
	//Function to change the language depending upon what the cookie is.  Also, defaults to english.
	var checkCookies = function () {
		if (typeof languageCookie == 'undefined') {
			$cookies.put('language', 'en');
			$translateProvider.preferredLanguage('en');
		}
		else {
			$cookies.put('language', languageCookie);
			$translateProvider.preferredLanguage(languageCookie);
		}
	};
	checkCookies();
		
	$translateProvider.useStaticFilesLoader({
			prefix: '/assets/angular/js/angular/config/lang-',
			suffix: '.json'
	});

	

});