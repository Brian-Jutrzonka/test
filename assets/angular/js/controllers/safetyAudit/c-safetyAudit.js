angular.module('doverApp')
.controller('safetyAuditController', function($scope, safetyAuditService, mainService, $location, $animate, ScrollMagicService, $timeout, $cookies){
	
//Initialization
	//Get all the form contents that were entered for use around this section.  More specifically for Submit/Edit pages.
	$scope.routeName = mainService.routeName;
	$scope.listL11 = mainService.location11;
	$scope.listL11N = mainService.location11N;
	$scope.listL12 = mainService.location12;
	$scope.listL12T = mainService.location12T;
	$scope.listL1N = mainService.location1N;
	$scope.listL1O = mainService.location1O;
	$scope.listL13 = mainService.location13;
	$scope.listA21 = safetyAuditService.A21;
	$scope.listA21Thumb = safetyAuditService.A21Thumb;
	$scope.listA21AB = safetyAuditService.A21AB;
	
	//Runs on timeout so that when the JSON data loads within the service, it can be saved in a variable on the controller
		//On success, it then creates the JSON data necessary for Page 2 to run
		var getData = function() {
			if (typeof mainService.selectedLanguage !== 'undefined') {
				//Data for all of the checkboxes on Page 2
				$scope.list = mainService.selectedLanguage.safetyAudit.page3.list;
	
				if ($scope.listA21.length === 0) {
					//Creates the A21 variable
					$scope.A21 = [];
					//Creates the top level arrays
					angular.forEach($scope.list, function(list) {
						$scope.A21.push([list.aElName, '', [], '', []]);
					});
					//Creates the checkbox arrays for A21.  Arrays within arrays within arrays...
					angular.forEach($scope.list, function(list) {
						angular.forEach(list.aElDesc, function(desc) {
							$scope.A21[list.aElID][2].push([desc, false]);
						});
					});
					//Send Arrays to the service
					safetyAuditService.changeA21('A21', $scope.A21);
					$scope.listA21 = safetyAuditService.A21;
				}
			}
			else {
				$timeout(getData, 50);
			}
		};
		getData();

//Functions that run once someone changes an input
	$scope.changeA = function(id, elArray, elName, elValue, elParentIndex) {
		switch(id) {
			//A/I, N/A, N/I
			case "A21A":
				safetyAuditService.changeA(id, '', elName, elValue, elParentIndex);
				break;
			//Checkboxes
			case "A21":
				elIndex = elArray.indexOf(elName);
				safetyAuditService.changeA(id, elIndex, elName, elValue, elParentIndex);
				break;
			//Additional Comments
			case "A21B":
				safetyAuditService.changeA(id, '', '', elValue, elParentIndex);
				break;
			default:
				console.log('Try Again - Controller');
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
				$(".dropzone-error").addClass('inactive');
				$(".dropzone-wait-container" + $scope.currentDropzoneIndex).removeClass('image-uploading');
				if (response.message=='success'){
					safetyAuditService.changeDropzone($scope.currentDropzoneSelected, response, $scope.currentDropzoneIndex);
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
		$scope.listA21 = safetyAuditService.A21;
	};
	//Remove File from dropzone array
	$scope.removeFile = function(id, index, parentIndex) {
		if (confirm('Are you sure you want to delete this image?')) {
			safetyAuditService.changeDropzone(id, '' , index, parentIndex);
			$scope.listA21 = safetyAuditService.A21;
		} else {}
	};
	
//Edit page.
	//This code is used for the edit page because the controller for this route is the only one that can be added to the route.
	//Gets location data for Edit page
	var locationGetLocations = function () {
		$scope.locations = mainService.locations;
	};
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
			case "L13":
				mainService.changeLocation(elName, elValue);
				break;
			default:
				console.log('Try Again - Controller');
		}
	};
	
//Submit/Edit Pages
	//Place answers in form elements on submit
	$scope.submitRoute = function() {
		//$scope.change2End();
		//$scope.submitValues = JSON.stringify(safeService.submitValues);
		document.getElementById('routeName').value = $scope.routeName;
		document.getElementById('listL11').value = $scope.listL11N;
		document.getElementById('listL12').value = $scope.listL12;
		document.getElementById('listL1N').value = $scope.listL1N;
		document.getElementById('listL13').value = $scope.listL13;
		document.getElementById('listA21').value = prepareModxInputString( JSON.stringify($scope.listA21) );
	};
	
//Misc.
	//Anchor Links for Page 3
	$scope.anchor = function(anchorLink) {
		$location.hash(anchorLink);
	};
	//Menu Toggle
	$scope.toggleMenu =  function() {
		event.stopPropagation();
		$("#safety-audit-menu").toggleClass('active');
	};
	$(".safety-audit-container").click( function(){
			$("#safety-audit-menu.active").toggleClass('active');
	});
	
	//Check to see if the hopscotch cookie has been created.  If so, it will end the tour and start back up after the view has loaded.
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
