angular.module('doverApp')
.controller('nearMController', function($scope, nearMService, mainService, $animate, $timeout, $cookies){
	
//Initialization
	//Initialize any needed variables
	$scope.dropzone = nearMService.dropzone;
	$scope.dropzoneThumb = nearMService.dropzoneThumb;
	$scope.routeName = mainService.routeName;
	$scope.listL11 = mainService.location11;
	$scope.listL11N = mainService.location11N;
	$scope.listL12 = mainService.location12;
	$scope.listL12T = mainService.location12T;
	$scope.listL1N = mainService.location1N;
	$scope.listL1O = mainService.location1O;
	$scope.listA31 = nearMService.A31;
	$scope.listA3R = nearMService.A3R;
	$scope.listA32 = JSON.stringify(nearMService.dropzone[0]);
	$scope.listA33 = nearMService.A33;
	$scope.listA34 = JSON.stringify(nearMService.dropzone[1]);
	$scope.listA35 = nearMService.A35;
	$scope.listA351 = nearMService.A351;
	
//Functions that run once someone changes an input
	$scope.changeA = function(elName, elValue) {
		switch(elName) {
			case "A35":
				nearMService.changeA(elName, $scope.listA35);
				break;
			default:
				nearMService.changeA(elName, elValue);
				cFunctionName = ('$scope.list' + elName);
				sFunctionName = ('nearMService.' + elName);
				cFunctionName = sFunctionName;
		}
	};
	
//Dropzone
	//Dropzone Initialization settings
	Dropzone.autoDiscover = false; // disable auto mode. we'll instantiate explicitly.
	var dropzone1_results={'submitted':{},'received':{}}; // global variable to hold the final result.
	
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
				$(".dropzone-previews" + $scope.currentDropzoneIndex).addClass('loading');
				$(".dropzone-wait-container" + $scope.currentDropzoneIndex).addClass('image-uploading');
			},
      'error': function (file, response) {
				$(".dropzone-wait-container" + $scope.currentDropzoneIndex).removeClass('image-uploading');
				$(".dropzone-no-files").addClass('inactive');
				$(".dropzone-error").addClass('active');
      },
      'success': function (file, response) {
				//Removes Preview Image
				this.removeFile(file);
				$(".dropzone-previews" + $scope.currentDropzoneIndex).removeClass('loading');
				$(".dropzone-wait-container" + $scope.currentDropzoneIndex).removeClass('image-uploading');
				$(".dropzone-error").addClass('inactive');
				if (response.message=='success'){
					nearMService.changeDropzone($scope.currentDropzoneSelected, response, $scope.currentDropzoneIndex);
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
		$scope.dropzone = nearMService.dropzone;
		$scope.dropzoneThumb = nearMService.dropzoneThumb;
	};
	//Remove File from dropzone array
	$scope.removeFile = function(id, index) {
		if (confirm('Are you sure you want to delete this image?')) {
			nearMService.changeDropzone(id, '' , index);
			$scope.dropzone = nearMService.dropzone;
		} else {}
	};
	
//Edit page
	//Gets location data for Edit page
	var locationGetLocations = function () {$scope.locations = mainService.locations;};
	locationGetLocations();
	//Fires function when page loads to get the locations
	var locationGetAreas = function () {
		$scope.listL12T = '11';
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
		document.getElementById('listA31').value = $scope.listA31;
		document.getElementById('listA3R').value = $scope.listA3R;
		document.getElementById('listA32').value = $scope.listA32;
		document.getElementById('listA33').value = $scope.listA33;
		document.getElementById('listA34').value = $scope.listA34;
		document.getElementById('listA35').value = $scope.listA35;
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