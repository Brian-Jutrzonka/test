angular.module('doverApp')
.directive("safetyA2", ['safetyAuditService', function(safetyAuditService) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/safetyAudit/d-safetyAudit2.html'
  };
}]);