angular.module('doverApp')
.controller('improvementController', function($scope, improvementService, mainService, $animate, $timeout, $cookies){

//Initialization
	//Initialize any needed variables
		$scope.dropzone = improvementService.dropzone;
		$scope.dropzoneThumb = improvementService.dropzoneThumb;
		$scope.routeName = mainService.routeName;
		$scope.listL11 = mainService.location11;
		$scope.listL11N = mainService.location11N;
		$scope.listL12 = mainService.location12;
		$scope.listL12T = mainService.location12T;
		$scope.listL1N = mainService.location1N;
		$scope.listL1O = mainService.location1O;
		$scope.listA21 = improvementService.A21;
		$scope.listA31 = improvementService.A31;
		$scope.listA32 = JSON.stringify(improvementService.dropzone);
		$scope.listA33 = improvementService.A33;
		$scope.listA34 = improvementService.A34;
		$scope.listA341 = improvementService.A341;
	
	//Runs on timeout so that when the JSON data loads within the service, it can be saved in a variable on the controller
		//On success, it then creates the JSON data necessary for Page 2 to run
			var getData = function() {
				if (typeof mainService.selectedLanguage !== 'undefined') {
					//Data for all of the checkboxes on Page 2
					$scope.list = mainService.selectedLanguage.opportunityForImprovement.page2.list;
				}
				else {
					$timeout(getData, 50);
				}
			};
			getData();
		
//Functions that run once someone changes an input
	$scope.changeA = function(elName, elValue) {
		switch(elName) {
			case "A34":
				improvementService.changeA(elName, $scope.listA34);
				break;
			default:
				improvementService.changeA(elName, elValue);
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
					$(".dropzone-wait-container").removeClass('image-uploading');
					if (response.message=='success'){
						improvementService.changeDropzone($scope.currentDropzoneSelected, response, $scope.currentDropzoneIndex);
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
			$scope.dropzone = improvementService.dropzone;
			$scope.dropzoneThumb = improvementService.dropzoneThumb;
		};
	//Remove File from dropzone array
		$scope.removeFile = function(id, index) {
			if (confirm('Are you sure you want to delete this image?')) {
				improvementService.changeDropzone(id, '' , index);
				$scope.dropzone = improvementService.dropzone;
			} else {}
		};
	
//Edit page
	//This code is used for the edit page because the controller for this route is the only one that can be added to the route.
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
					//On view enter, it it show up with a message.
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
			document.getElementById('routeName').value = $scope.routeName;
			document.getElementById('listL11').value = $scope.listL11N;
			document.getElementById('listL12').value = $scope.listL12;
			document.getElementById('listL1N').value = $scope.listL1N;
			document.getElementById('otherArea').value = $scope.listL1O;
			document.getElementById('listA21').value = $scope.listA21;
			document.getElementById('listA31').value = $scope.listA31;
			document.getElementById('listA32').value = $scope.listA32;
			document.getElementById('listA33').value = $scope.listA33;
			document.getElementById('listA34').value = $scope.listA34;
		};
		
//Misc.
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