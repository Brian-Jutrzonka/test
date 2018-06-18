var app = angular.module('doverApp', ['ngRoute', 'ngAnimate', 'hj.scrollMagic', 'ui.bootstrap.datetimepicker', 'pascalprecht.translate', 'ngSanitize', 'ngCookies'])
		//ScrollMagic Indicators
		/*.config(['scrollMagicProvider', function (scrollMagicProvider) {
			scrollMagicProvider.addIndicators = true;
		}])*/
		//Creates a Remove Spaces Filter
		.filter('removeSpaces', [function() {
			return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
			};
		}]);
