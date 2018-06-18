angular.module('doverApp').factory('nearMService', function nearMFactory() {
  
//Initialization
  var service = {};
	//Initializes Variables
	service.dropzone = [[],[]];
	service.dropzoneThumb = [[],[]];
	
//Functions that run once someone changes an input
	service.changeA = function(elName, elValue) {
		switch(elName) {
			case "A31":
				service.A31 = elValue;
			break;
			case "A3R":
				service.A3R = elValue;
			break;
			case "A32":
				service.A32 = elValue;
			break;
			case "A33":
				service.A33 = elValue;
			break;
			case "A34":
				service.A34 = elValue;
			break;
			case "A35":
				service.A35 = elValue;
				if (elValue === true) {service.A351 = 'Yes';}
				else {service.A351 = 'No';}
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	//Dropzone
	service.changeDropzone = function(id, response, index) {
		switch(id) {
			case "A32A":
				service.dropzone[index].push(response.url);
				service.dropzoneThumb[index].push(response.thumb);
			break;
			case "A32R":
				service.dropzone[0].splice(index, 1);
				service.dropzoneThumb[0].splice(index, 1);
			break;
			case "A34A":
				service.dropzone[index].push(response.url);
				service.dropzoneThumb[index].push(response.thumb);
			break;
			case "A34R":
				service.dropzone[1].splice(index, 1);
				service.dropzoneThumb[1].splice(index, 1);
			break;
			default:
				console.log('Try Again - Controller');
		}
	};
	
  return service;
});