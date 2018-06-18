angular.module('doverApp')
.directive("unsafeC2", ['unsafeCService', function(unsafeCService) {
  return {
    restrict: "E",
    templateUrl:'/assets/angular/templates/directives/unsafeCondition/d-unsafeCondition2.html'
  };
}]);