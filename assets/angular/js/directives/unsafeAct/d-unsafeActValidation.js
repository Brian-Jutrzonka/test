angular.module('doverApp')
.directive("unsafeAValidation", ['mainService', 'unsafeAService', '$location', function(mainService, unsafeAService, location) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/unsafeAct/d-unsafeActValidation.html',
    link: function (scope, element) {
      element.on("click", (function(){
        if($( ".form-element-required" ).hasClass( "ng-empty" )){
					document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
					$("#errors").addClass("errors-show");
					console.log(mainService.location11);
        }
        else {
					document.getElementById("errors").style.display = "none";
					let checkLocation = location.url();
					if (checkLocation === '/unsafe-act/1' && mainService.location11P === 0) {
						window.location.href = "/#/unsafe-act/2";
					}
					else if (checkLocation === '/unsafe-act/1' && mainService.location11P === 1) {
						window.location.href = "/#/pin";
					}
					else if (checkLocation === '/unsafe-act/2') {
						window.location.href = "/#/unsafe-act/3";
					}
					else if (checkLocation === '/unsafe-act/3') {
						window.location.href = "/#/unsafe-act/submit";
					}
					else {}
        }
      }));
    }
  };
}
]);