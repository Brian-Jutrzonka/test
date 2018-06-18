angular.module('doverApp').factory('improvementService', function improvementFactory($http) {

//Initialization
  var service = {};
	//Initializes Variables
	service.dropzone = [];
	service.dropzoneThumb = [];
	
//Functions that run once someone changes an input
	service.changeA = function(elName, elValue) {
		switch(elName) {
			case "A21":
				service.A21 = elValue;
			break;
			case "A31":
				service.A31 = elValue;
			break;
			case "A32":
				service.A32 = elValue;
			break;
			case "A33":
				service.A33 = elValue;
			break;
			case "A34":
				service.A34 = elValue;
				if (elValue === true) {service.A341 = 'Yes';}
				else {service.A341 = 'No';}
			break;
			default:
				console.log('Try Again - Service');
		}
	};
//Dropzone
	service.changeDropzone = function(id, response, index) {
		switch(id) {
			case "A32A":
				service.dropzone.push(response.url);
				service.dropzoneThumb.push(response.thumb);
			break;
			case "A32R":
				service.dropzone.splice(index, 1);
				service.dropzoneThumb.splice(index, 1);
			break;
			default:
				console.log('Try Again - Service');
		}
	};
		
  return service;
});