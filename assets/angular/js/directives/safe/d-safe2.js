angular.module('doverApp')
.directive("safe2", ['safeService', function(safeService) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/safe/d-safe2.html'
  };
}]);