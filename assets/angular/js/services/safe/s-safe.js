angular.module('doverApp').factory('safeService', function safeFactory() {

//Initialization
  var service = {};
	//Initializes Variables
	service.listA21 = [];
	service.dropzone = [];
	service.dropzoneThumb = [];
	service.A331 = 'No';
	service.A32 = new Date();
	
//Functions that run once someone changes an input
	service.changeA = function(elID, elName, elValue, a21) {
		switch(elID) {
			case "A1":
				service.A1 = elValue;
				service.listA21 = a21;
			break;
			default:
				console.log('Try Again - Service');
		}
	};
  //Handles everything for the checkbox choices.
	service.changeA2 = function(elID, elName, elValue, index) {
		switch(elID) {
			case "A2":
				service.listA21[index].splice(1, 1, elValue);
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	//Handles everything for the FreeForm choices/Submit Values.
	service.changeA3 = function(elName, elValue) {
		switch(elName) {
			case "A31":
				service.A31 = elValue;
			break;
			case "A32":
				service.A32 = elValue;
			break;
			case "A33":
				service.A33 = elValue;
				if (elValue === true) {
					service.A331 = 'Yes';
				}
				else {
					service.A331 = 'No';
				}
			break;
			case "AS":
				service.submitValues = elValue;
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	//Dropzone
	service.changeDropzone = function(id, response, index) {
		switch(id) {
			case "A34A":
				service.dropzone.push(response.url);
				service.dropzoneThumb.push(response.thumb);
			break;
			case "A34R":
				service.dropzone.splice(index, 1);
				service.dropzoneThumb.splice(index, 1);
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	
  return service;
});