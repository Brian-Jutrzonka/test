angular.module('doverApp')
.directive("improvementValidation", ['mainService', 'improvementService', '$location', function(mainService, improvementService, location) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/improvement/d-improvementValidation.html',
    link: function (scope, element) {
      element.on("click", (function(){
				if($( ".form-element-required" ).hasClass( "ng-empty" )){
					document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
					$("#errors").addClass("errors-show");
				}
				else {
					document.getElementById("errors").style.display = "none";
					var checkLocation = location.url();
					if (checkLocation === '/improvement/1' && mainService.location11P === 0) {
						window.location.href = "/#/improvement/2";
					}
					else if (checkLocation === '/improvement/1' && mainService.location11P === 1) {
						window.location.href = "/#/pin";
					}
					else if (checkLocation === '/improvement/2') {
							window.location.href = "/#/improvement/3";
					}
					else if (checkLocation === '/improvement/3') {
							window.location.href = "/#/improvement/submit";
					}
					else {}
				}
      }));
    }
  };
}]);