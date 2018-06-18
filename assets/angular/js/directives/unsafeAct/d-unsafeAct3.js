angular.module('doverApp')
.directive("unsafeA3", function(unsafeAService) {
  return {
    restrict: "E",
		link: function(scope, element, attribute) {
			$('#range-input-severity').click(function() {
				$('.range-form-input-key').removeClass('active');
				$('.range-form-input-' + unsafeAService.A3R).toggleClass('active');
			});
			$('#range-input-severity').on('focusout', function () {
				$('.range-form-input-key').removeClass('active');
			});
		},
    templateUrl:'/assets/angular/templates/directives/unsafeAct/d-unsafeAct3.html'
  };
});