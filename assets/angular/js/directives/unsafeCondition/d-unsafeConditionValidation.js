angular.module('doverApp')
.directive("unsafeCValidation", ['mainService', 'unsafeCService', '$location', function(mainService, unsafeCService, location) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/unsafeCondition/d-unsafeConditionValidation.html',
    link: function (scope, element) {
      element.on("click", (function(){
				if($( ".form-element-required" ).hasClass( "ng-empty" )){
					document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
					$("#errors").addClass("errors-show");
				}
				else {
					document.getElementById("errors").style.display = "none";
					var checkLocation = location.url();
					if (checkLocation === '/unsafe-condition/1' && mainService.location11P === 0) {
						window.location.href = "/#/unsafe-condition/2";
					}
					else if (checkLocation === '/unsafe-condition/1' && mainService.location11P === 1) {
						window.location.href = "/#/pin";
					}
					else if (checkLocation === '/unsafe-condition/2') {
							window.location.href = "/#/unsafe-condition/3";
					}
					else if (checkLocation === '/unsafe-condition/3') {
							window.location.href = "/#/unsafe-condition/submit";
					}
					else {}
				}
      }));
    }
  };
}]);