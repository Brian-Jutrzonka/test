angular.module('doverApp')
.directive("safeValidation", ['mainService', 'safeService', '$location', function(mainService, safeService, location) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/safe/d-safeValidation.html',
    link: function (scope, element) {
      element.on("click", (function(){
				if($( ".form-element-required" ).hasClass( "ng-empty" )){
					document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
					$("#errors").addClass("errors-show");
				}
				else {
					document.getElementById("errors").style.display = "none";
					var checkLocation = location.url();
					if (checkLocation === '/safe/1' && mainService.location11P === 0) {
						window.location.href = "/#/safe/2";
					}
					else if (checkLocation === '/safe/1' && mainService.location11P === 1) {
						window.location.href = "/#/pin";
					}
					else if (checkLocation === '/safe/2') {
							window.location.href = "/#/safe/3";
					}
					else if (checkLocation === '/safe/3') {
							window.location.href = "/#/safe/submit";
					}
					else {}
				}
      }));
    }
  };
}]);