angular.module('doverApp').directive('dropzone', ['nearMService', function(nearMService) {
  return function (scope, element, attrs) {
		var config, dropzone;
		config = scope[attrs.dropzone];
		// create a Dropzone for the element with the given options
		dropzone = new Dropzone(element[0], config.options);
		// bind the given event handlers
		angular.forEach(config.eventHandlers, function (handler, event) {
			dropzone.on(event, handler);
		});
	};
}]);


		//restrict: "E",
		//templateUrl:'/assets/angular/templates/directives/near-miss/d-nearMissDropzone.html',