angular.module('doverApp').factory('safetyAuditService', function safetyAuditFactory() {
	
//Initialization
	var service = {};
	//Initializes Variables
	service.A21 = [];
	service.A21Thumb = [];
	//Initializes the A21 variable with all of the safety audit answers within it.
	service.changeA21 = function(id, value) {
		switch(id) {
			//A/I, N/A, N/I
			case "A21":
				service.A21 = value;
			break;
			default:
				console.log('Try Again - Service');
		}
	};

//Functions that run once someone changes an input
	//This is for changes within the Safety Audit 3 route.  All go into A21.
	service.changeA = function(id, elID, elName, elValue, elParentIndex) {
		switch(id) {
			//A/I, N/A, N/I
			case "A21A":
				service.A21[elParentIndex].splice(1, 1, elValue);
				//Resets answers if they click No Applicable of Not Inspected
				if (service.A21[elParentIndex][1] === 'Not Applicable' || service.A21[elParentIndex][1] === 'Not Inspected' || service.A21[elParentIndex][1] === 'No aplicable' || service.A21[elParentIndex][1] === 'No inspeccionado') {
					//Resets the checkboxes
					angular.forEach(service.A21[elParentIndex][2], function(check) {
						check[1] = false;
					});
					//resets the TextArea
					service.A21[elParentIndex][3] = '';
				}
			break;
			//Checkboxes
			case "A21":
				service.A21[elParentIndex][2][elID].splice(1, 1, elValue);
			break;
			//Additional Comments
			case "A21B":
				service.A21[elParentIndex][3] = elValue;
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	//Dropzone
	service.changeDropzone = function(id, response, index, parentIndex) {
		switch(id) {
			case "A21D":
				service.A21[index][4].push(response.url);
				//Thumbnail Array for front end.  If the array is not built yet, it will build it here.
				if (service.A21Thumb.length === 0) {
					for (var i = 0; i < service.A21.length; i++) {
						service.A21Thumb.push([]);
					}
				}
				service.A21Thumb[index].push(response.thumb);
			break;
			case "A21DR":
				service.A21[parentIndex][4].splice(index, 1);
				service.A21Thumb[parentIndex].splice(index, 1);
			break;
			default:
				console.log('Try Again - Service');
		}
	};
	
  return service;
});