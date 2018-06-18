angular.module('doverApp')
.directive("safetyAValidation", ['mainService', 'safetyAuditService', '$location', function(mainService, safetyAuditService, location) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/safetyAudit/d-safetyAuditValidation.html',
    link: function (scope, element) {
      element.on("click", (function(){
        if($( ".form-element-required" ).hasClass( "ng-empty" )){
          document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
          $("#errors").addClass("errors-show");
        }
        else {
					//Removes errors div
          document.getElementById("errors").style.display = "none";
					//Clears the locations hash so that we can use anchor links within route 3
					location.hash(null);
					//Sets the location url
          var checkLocation = location.url();
					if (checkLocation === '/safety-audit/1' && mainService.location11P === 0) {
						window.location.href = "/#/safety-audit/2";
					}
					else if (checkLocation === '/safety-audit/1' && mainService.location11P === 1) {
						window.location.href = "/#/pin";
					}
          else if (checkLocation === '/safety-audit/2') {
              window.location.href = "/#/safety-audit/3";
          }
          else if (checkLocation === '/safety-audit/3') {
              window.location.href = "/#/safety-audit/submit";
          }
          else {}
        }
      }));
    }
  };
}]);