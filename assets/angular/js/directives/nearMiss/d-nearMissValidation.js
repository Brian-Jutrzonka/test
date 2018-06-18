angular.module('doverApp').directive("nearMValidation", ['mainService', 'nearMService', '$location', function(mainService, nearMService, location) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/near-miss/d-nearMissValidation.html',
    link: function (scope, element) {
      element.on("click", (function(){
        if($( ".form-element-required" ).hasClass( "ng-empty" )){
					document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
					$("#errors").addClass("errors-show");
        }
        else {
					document.getElementById("errors").style.display = "none";
					var checkLocation = location.url();
					if (checkLocation === '/near-miss/1' && mainService.location11P === 0) {
						window.location.href = "/#/near-miss/2";
					}
					else if (checkLocation === '/near-miss/1' && mainService.location11P === 1) {
						window.location.href = "/#/pin";
					}
					else if (checkLocation === '/near-miss/2') {
						window.location.href = "/#/near-miss/submit";
					}
					else {}
        }
      }));
    }
  };
}
]);