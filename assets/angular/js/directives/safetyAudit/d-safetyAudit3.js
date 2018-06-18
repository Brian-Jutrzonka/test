angular.module('doverApp')
.directive("safetyA3", ['safetyAuditService', function(safetyAuditService) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/safetyAudit/d-safetyAudit3.html'
  };
}]);