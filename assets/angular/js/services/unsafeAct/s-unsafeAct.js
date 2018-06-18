angular.module('doverApp').factory('unsafeAService', function unsafeAFactory($http) {
  
//Initialization
  var service = {};
	//Initializes Variables
	service.A21 = [];
	service.dropzone = [];
	service.dropzoneThumb = [];
	service.A3R = 3;
	service.A32 = new Date();
	
//Functions that run once someone changes an input
	service.initA21 = function(elName, elValue) {
		switch(elName) {
			case "A21":
				service.A21 = elValue;
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	service.changeA = function(elName, elValue, index, parentIndex) {
		switch(elName) {
			case "A21":
				service.A21[index].splice(1, 1, elValue);
				for (i = 0; i < service.A21[index][2][1].length; i++) {
					//Clears True/False for subCheck1 values if they click checkbox again.
					if (service.A21[index][2][1].length > 1) {
						service.A21[index][2][1][i].splice(1, 1, false);
					}
					//Clears Value for subCheck1 values if they click radio button again.
					else {
						service.A21[index][2][1].splice(0, 1, "");
					}
				}
				//Clears True/False values for subCheck2 if they click checkbox again.
				for (i = 0; i < service.A21[index][3][1].length; i++) {
					if (service.A21[index][3][1].length > 1) {
						service.A21[index][3][1][i].splice(1, 1, false);
					}
					//Clears Value for subCheck2 values if they click radio button again.
					else {
						service.A21[index][3][1].splice(0, 1, "");
					}
				}
			break;
			case "A21C"://Handles all checkboxes
			break;
			case "A211R"://SubCheck 1 Radio Buttons
				service.A21[parentIndex][2][1].splice(0, 1, elValue);
			break;
			case "A212R"://SubCheck 2 Radio Buttons
				service.A21[parentIndex][3][1].splice(0, 1, elValue);
			break;
			case "A3R":
				service.A3R = elValue;
			break;
			case "A31":
				service.A31 = elValue;
			break;
			case "A32":
				service.A32 = elValue;
			break;
			case "A34":
				service.A34 = elValue;
			break;
			case "A35":
				service.A35 = elValue;
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	//Dropzone
	service.changeDropzone = function(id, response, index) {
		switch(id) {
			case "A36A":
				service.dropzone.push(response.url);
				service.dropzoneThumb.push(response.thumb);
			break;
			case "A36R":
				service.dropzone.splice(index, 1);
				service.dropzoneThumb.splice(index, 1);
			break;
			default:
			console.log('Try Again - Controller');
		}
	};
		
  return service;
});