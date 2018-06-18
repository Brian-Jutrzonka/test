angular.module('doverApp')
.directive("unsafeC3", function(unsafeCService) {
  return {
    restrict: "E",
		link: function(scope, element, attribute) {
			$('#range-input-severity').click(function() {
				$('.range-form-input-key').removeClass('active');
				$('.range-form-input-' + unsafeCService.A3R).toggleClass('active');
			});
			$('#range-input-severity').on('focusout', function () {
				$('.range-form-input-key').removeClass('active');
			});
		},
    templateUrl:'/assets/angular/templates/directives/unsafeCondition/d-unsafeCondition3.html'
  };
});