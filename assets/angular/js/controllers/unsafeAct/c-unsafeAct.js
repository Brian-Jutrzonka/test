angular.module('doverApp')
.controller('unsafeAController', function($scope, unsafeAService, mainService, $animate, $timeout, $cookies){
	
//Initialization
	//Initialize any needed variables
		$scope.dropzone = unsafeAService.dropzone;
		$scope.dropzoneThumb = unsafeAService.dropzoneThumb;
		$scope.routeName = mainService.routeName;
		$scope.listL11 = mainService.location11;
		$scope.listL11N = mainService.location11N;
		$scope.listL12 = mainService.location12;
		$scope.listL1N = mainService.location1N;
		$scope.listL1O = mainService.location1O;
		$scope.listL12T = mainService.location12T;
		$scope.listA21 = unsafeAService.A21;
		$scope.listA3R = unsafeAService.A3R;
		$scope.listA31 = unsafeAService.A31;
		$scope.listA32 = unsafeAService.A32;
		$scope.listA33 = unsafeAService.A33;
		$scope.listA34 = unsafeAService.A34;
		$scope.listA35 = unsafeAService.A35;
		$scope.listA36 =  JSON.stringify(unsafeAService.dropzone);

	//Runs on timeout so that when the JSON data loads within the service, it can be saved in a variable on the controller
		//On success, it then creates the JSON data necessary for Page 2 to run
		var getData = function() {
			if (typeof mainService.selectedLanguage !== 'undefined') {
				//Data for all of the checkboxes on Page 2
				$scope.list = mainService.selectedLanguage.unsafeAct.page2.list;
				//Creates our large array full of data.
				if ($scope.listA21.length === 0) {
					//Creates the A21 variable
					$scope.A21 = [];
					//Creates the top level arrays
					angular.forEach($scope.list, function(list) {
						//Initializes subChecks to place within A21
						$scope.subCheck1Temp = [];
						$scope.subCheck2Temp = [];
						/*Initializes the radio button index if it is a radio button set.  This is here to make sure that the radio buttons only get an array of 1 value instead
						of multiple like the checkbox sets have.*/
						let r1Index = 0;
						let r2Index = 0;
						angular.forEach(list.subCheck1, function(subCheck1) {
							//If the Type is a Radio Button, push an individual value to the array.
							if (list.subCheck1Type === "r") {
								if (r1Index === 0) {
									$scope.subCheck1Temp.push([""]);
									r1Index++;
								}
							}
							else {
								//If the Type is a Checkbox, push multiple true/false values to the array.
								$scope.subCheck1Temp.push([subCheck1, false]);
							}
						});
						angular.forEach(list.subCheck2, function(subCheck2) {
							//If the Type is a Radio Button, push an individual value to the array.
							if (list.subCheck2Type === "r") {
								if (r2Index === 0) {
									$scope.subCheck2Temp.push([""]);
									r2Index++;
								}
							}
							else {
								//If the Type is a Checkbox, push multiple true/false values to the array.
								$scope.subCheck2Temp.push([subCheck2, false]);
							}
						});
						$scope.A21.push([list.checkName, false, [list.subTitle1, $scope.subCheck1Temp], [list.subTitle2, $scope.subCheck2Temp]]);
					});
					//Send Arrays to the service
					unsafeAService.initA21('A21', $scope.A21);
					//Returns the service after it is done initializing
					$scope.listA21 = unsafeAService.A21;
				}
			}
			else {
				$timeout(getData, 50);
			}
		};
		getData();
	
//Functions that run once someone changes an input
	$scope.changeA = function(elName, elValue, index, parentIndex) {
		switch(elName) {
			case "A21":
				unsafeAService.changeA(elName, elValue, index, parentIndex);
				break;
			default:
				unsafeAService.changeA(elName, elValue, index, parentIndex);
				cFunctionName = ('$scope.list' + elName);
				sFunctionName = ('unsafeAService.' + elName);
				cFunctionName = sFunctionName;
		}
	};
	
//Dropzone
	//Dropzone Initialization settings
	Dropzone.autoDiscover = false; // disable auto mode. we'll instantiate explicitly.
	var dropzone_results={'submitted':{},'received':{}}; // global variable to hold the final result.
	//On Click, adds dropzone id and index to be used within the config variable below
	$scope.addDropzoneID = function(id, index) {
		$scope.currentDropzoneSelected = id;
		$scope.currentDropzoneIndex = index;
	};
	//Dropzone Config settings
  $scope.dropzoneConfig = {
    'options': { // passed into the Dropzone constructor
      'url': '/upload.json',
			'paramName':'file',
			'addRemoveLinks':false,
			'maxFiles':5,
			'maxFilesize':10, // MB
			'uploadMultiple':false,
			'params':{},
			'clickable':true,
			'acceptedFiles':".png,.jpg",
			'dictInvalidFileType':'You can\'t upload files of this type',
			'accept':function(file, done) {
				done();
			}
    },
    'eventHandlers': {
      'sending': function (file, xhr, formData) {
				$(".dropzone-previews").addClass('loading');
				$(".dropzone-wait-container").addClass('image-uploading');
      },
      'error': function (file, response) {
				$(".dropzone-wait-container").removeClass('image-uploading');
				$(".dropzone-no-files").addClass('inactive');
				$(".dropzone-error").addClass('active');
      },
      'success': function (file, response) {
				//Removes Preview Image
				this.removeFile(file);
				$(".dropzone-previews").removeClass('loading');
				$(".dropzone-error").addClass('inactive');
				$(".dropzone-wait-container").removeClass('image-uploading');
				if (response.message=='success'){
					unsafeAService.changeDropzone($scope.currentDropzoneSelected, response, $scope.currentDropzoneIndex);
					//Timeout needed until the file fully uploads
					$timeout(checkDropzone, 500);
				} else {
					console.log("Sorry. The server could not save your file.");
				}
			}
    }
  };
	//Called on timeout after a short period of time to get the image.
	var checkDropzone = function() {
		$scope.dropzone = unsafeAService.dropzone;
		$scope.dropzoneThumb = unsafeAService.dropzoneThumb;
	};
	//Remove File from dropzone array
	$scope.removeFile = function(id, index) {
		if (confirm('Are you sure you want to delete this image?')) {
			unsafeAService.changeDropzone(id, '' , index);
			$scope.dropzone = unsafeAService.dropzone;
		} else {}
	};
	
//Edit page
	//Gets location data for Edit page
	var locationGetLocations = function () {$scope.locations = mainService.locations;};
	locationGetLocations();
	//Fires function when page loads to get the locations
	var locationGetAreas = function () {
		if (mainService.routeName === 'safetyaudit'){$scope.listL12T = '12';} else {$scope.listL12T = '11';}
	};
	locationGetAreas();
	//Base Location Answers
	$scope.changeLocation = function(elName, elValue) {
		switch(elName) {
			case "L11":
				//Adds it locally first then pushes it to the service
				$scope.listL11 = elValue;
				mainService.changeLocation(elName, elValue);
				//On view enter, it shows up with a message.
				$scope.listL11Length = $scope.listL11.length;
				//Reinitializes L12 so if user changes L11, the data isn't still stored for L12
				$scope.listL12 = '';
				//Changes the name of the location.  With L11, we can only get ID but this changes location name for use around the app.
				angular.forEach($scope.locations,function(value)	{
					if (value.guid === elValue) {
						mainService.changeLocation('L11N', value.title);
						$scope.listL11Name = value.title;
						return;
					}
				});
				break;
			case "L12":
				mainService.changeLocation(elName, elValue);
				break;
			default:
				console.log('Try Again - Controller');
		}
	};

//Submit Page
	//Place answers in form elements on submit
		$scope.submitRoute = function() {
			$scope.listA32 = ( moment($scope.listA32).unix() )*1000;
			document.getElementById('routeName').value = $scope.routeName;
			document.getElementById('listL11').value = $scope.listL11N;
			document.getElementById('listL12').value = $scope.listL12;
			document.getElementById('listL1N').value = $scope.listL1N;
			document.getElementById('otherArea').value = $scope.listL1O;
			document.getElementById('listA21').value = prepareModxInputString( JSON.stringify($scope.listA21) );
			document.getElementById('listA3R').value = $scope.listA3R;
			document.getElementById('listA31').value = $scope.listA31;
			document.getElementById('listA32').value = $scope.listA32;
			document.getElementById('listA34').value = $scope.listA34;
			document.getElementById('listA35').value = $scope.listA35;
			document.getElementById('listA36').value = $scope.listA36;
		};
	
//Tour for this route
	var tourCookie = $cookies.get('tour');
	if (tourCookie == 1) {
		console.log(tourCookie);
		$("body").addClass("tour-active");
		angular.element(document).ready(function () {
			hopscotch.startTour(mainService.tour, mainService.currentTourIndex);
		});
	}
	else {}
	
});