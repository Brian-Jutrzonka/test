angular.module('doverApp')
.directive("nearM2", ['nearMService', function(nearMService) {
  return {
    restrict: "E",
		link: function(scope, element, attribute) {
			$('#range-input-severity').click(function() {
				$('.range-form-input-key').removeClass('active');
				$('.range-form-input-' + nearMService.A3R).toggleClass('active');
			});
			$('#range-input-severity').on('focusout', function () {
				$('.range-form-input-key').removeClass('active');
			});
		},
    templateUrl:'/assets/angular/templates/directives/near-miss/d-nearMiss2.html'
  };
}]);