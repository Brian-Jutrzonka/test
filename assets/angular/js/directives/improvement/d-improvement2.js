angular.module('doverApp')
.directive("improvement2", ['improvementService', function(unsafeCService) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/improvement/d-improvement2.html'
  };
}]);