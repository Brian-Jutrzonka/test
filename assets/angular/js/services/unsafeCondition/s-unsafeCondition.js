angular.module('doverApp').factory('unsafeCService', function unsafeCFactory($http) {

//Initialization
  var service = {};
	//Initializes Variables
	service.A21 = [];
	service.dropzone = [];
	service.dropzoneThumb = [];
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
	service.changeA = function(elName, elValue, index, parentIndex, extras) {
		switch(elName) {
			case "A21":
			//Main Checkbox set for A21 (Top Level)
				service.A21[index].splice(1, 1, elValue);
			//SubCheck1's (Second Level)
				angular.forEach(service.A21[index][2][1], function(subCheck1) {
					if (typeof subCheck1[1] !== 'undefined' && subCheck1[1] === true) {
						//Clears the Sub Checkboxes if checked off
						subCheck1.splice(1, 1, false);
					}
					//Clears radio buttons for if checked off
					else if (subCheck1[1] !== false) {
						service.A21[index][2][1].splice(0, 1, '');
						service.A21[index][2][1].splice(1, 1, []);
					}
				});
			//Clears SubSub Checkboxes/Radio Buttons (Third Level)
				angular.forEach(service.A21[index][2][1], function(subCheck1) {
					if (typeof subCheck1[2] !== 'undefined') {
						//Clears checkboxes for subSub1 if checked off
						if (Array.isArray(subCheck1[2][1][0])) {
							angular.forEach(subCheck1[2][1], function(subSubCheck1) {
								subSubCheck1.splice(1, 1, false);
							});
						}
						//Clears radio buttons for subSub1 if checked off
						else {
							subCheck1[2][1] = [];
						}
					}
				});
			//SubCheck2's (Second Level)
				angular.forEach(service.A21[index][3][1], function(subCheck2) {
					if (typeof subCheck2[1] !== 'undefined' && subCheck2[1] === true) {
						//Clears the Sub Checkboxes if checked off
						subCheck2.splice(1, 1, false);
					}
					//Clears radio buttons for if checked off
					else if (subCheck2[1] !== false) {
						service.A21[index][3][1].splice(0, 1, '');
						service.A21[index][3][1].splice(1, 1, []);
					}
				});
			//Clears SubSub Checkboxes/Radio Buttons (Third Level)
				angular.forEach(service.A21[index][3][1], function(subCheck2) {
					if (typeof subCheck2[2] !== 'undefined') {
					//Clears checkboxes for subSub1 if checked off
						if (Array.isArray(subCheck2[2][1][0])) {
							angular.forEach(subCheck2[2][1], function(subSubCheck2) {
								subSubCheck2.splice(1, 1, false);
							});
						}
					//Clears radio buttons for subSub2 if checked off
						else {
							subCheck2[2][1] = [];
						}
					}
				});
			break;
		//SubCheck1's (Second Level)
			case "A211C":
			//Clears SubSub Checkboxes/Radio Buttons (Third Level)
				if (typeof service.A21[parentIndex][2][1][index][2] !== 'undefined') {
				//Unchecks Third level checkboxes when you click off the second level check/radio button
					if (Array.isArray(service.A21[parentIndex][2][1][index][2][1][0])) {
						angular.forEach(service.A21[parentIndex][2][1][index][2][1], function(subCheck1) {
							subCheck1.splice(1, 1, false);
						});
					}
				//Unchecks Third level Radio Buttons when you click off the second level check/radio button
					else {
						service.A21[parentIndex][2][1][index][2][1] = [];
					}
				}
			break;
		//Second Level Radio Buttons
			case "A211R":
			//Changes the Second Level Radio Buttons
				service.A21[parentIndex][2][1].splice(0, 1, elValue);
			//If the subSub check is a checkbox set
				if (typeof extras !== 'undefined' && extras[1] === "c") {
					angular.forEach(extras[2], function(subSubCheck1) {
						subSubCheck1.splice(1, 1, false);
					});
					service.A21[parentIndex][2][1].splice(1, 1, [extras[0], extras[2]]);
				}
			//If the subSub check is a Radio Button set
				else if (typeof extras !== 'undefined' && extras[1] === "r") {
					service.A21[parentIndex][2][1].splice(1, 1, [extras[0], []]);
				}
				else {
					service.A21[parentIndex][2][1].splice(1, 1, []);
				}
			break;
		//Third Level Checkboxes
			case "A211CSub":
			break;
		//subCheck 2
			case "A212C":
				//Clears SubSub Checkboxes/Radio Buttons (Third Level)
				if (typeof service.A21[parentIndex][3][1][index][2] !== 'undefined') {
					//Unchecks Third level checkboxes when you click off the second level check/radio button
					if (Array.isArray(service.A21[parentIndex][3][1][index][2][1][0])) {
						angular.forEach(service.A21[parentIndex][3][1][index][2][1], function(subCheck2) {
							subCheck2.splice(1, 1, false);
						});
					}
				//Unchecks Third level Radio Buttons when you click off the second level check/radio button
					else {
						service.A21[parentIndex][3][1][index][2][1] = [];
					}
				}
			break;
		//Second Level Radio Buttons
			case "A212R":
			//Changes the Second Level Radio Buttons
				service.A21[parentIndex][3][1].splice(0, 1, elValue);
			//If the subSub check is a checkbox set
				if (typeof extras !== 'undefined' && extras[1] === "c") {
					angular.forEach(extras[2], function(subSubCheck2) {
						subSubCheck2.splice(1, 1, false);
					});
					service.A21[parentIndex][3][1].splice(1, 1, [extras[0], extras[2]]);
				}
			//If the subSub check is a Radio Button set
				else if (typeof extras !== 'undefined' && extras[1] === "r") {
					service.A21[parentIndex][3][1].splice(1, 1, [extras[0], []]);
				}
				else {
					service.A21[parentIndex][3][1].splice(1, 1, []);
				}
			break;
		//Third Level Checkboxes
			case "A212CSub":
			break;
		//Third Page Answers
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
				console.log('Try Again - Service');
		}
	};
		
  return service;
});