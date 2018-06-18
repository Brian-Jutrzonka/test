angular.module('doverApp')
.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		//This directive is used for when users want to hit enter on their keyboards to move to the next route.
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});