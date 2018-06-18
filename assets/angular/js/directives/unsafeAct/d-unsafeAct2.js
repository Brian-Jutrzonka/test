angular.module('doverApp')
.directive("unsafeA2", ['unsafeAService', function(unsafeAService) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/unsafeAct/d-unsafeAct2.html'
  };
}]);