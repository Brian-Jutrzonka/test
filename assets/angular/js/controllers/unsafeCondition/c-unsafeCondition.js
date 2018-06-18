angular.module('doverApp')
.controller('unsafeCController', function($scope, unsafeCService, mainService, $animate, $timeout, $translate, $filter, $cookies, $cookieStore){
	
//Initialization
	//Initialize any needed variables
		$scope.dropzone = unsafeCService.dropzone;
		$scope.dropzoneThumb = unsafeCService.dropzoneThumb;
		$scope.routeName = mainService.routeName;
		$scope.listL11 = mainService.location11;
		$scope.listL11N = mainService.location11N;
		$scope.listL12 = mainService.location12;
		$scope.listL1N = mainService.location1N;
		$scope.listL1O = mainService.location1O;
		$scope.listL12T = mainService.location12T;
		$scope.listA21 = unsafeCService.A21;
		$scope.listA3R = unsafeCService.A3R;
		$scope.listA31 = unsafeCService.A31;
		$scope.listA32 = unsafeCService.A32;
		$scope.listA33 = unsafeCService.A33;
		$scope.listA34 = unsafeCService.A34;
		$scope.listA35 = unsafeCService.A35;
		$scope.listA36 =  JSON.stringify(unsafeCService.dropzone);

	//Runs on timeout so that when the JSON data loads within the service, it can be saved in a variable on the controller
		//On success, it then creates the JSON data necessary for Page 2 to run
			var getData = function() {
				if (typeof mainService.selectedLanguage !== 'undefined') {
					//Data for all of the checkboxes on Page 2
					$scope.list = mainService.selectedLanguage.unsafeCondition.page2.list;
					//Creates our large array full of data.
					if ($scope.listA21.length === 0) {
						//Creates the A21 variable
						$scope.A21 = [];
						//Creates the top level arrays
						//Initializes subChecks to place within A21
						angular.forEach($scope.list, function(list) {
							$scope.subCheck1Temp = [];
							$scope.subCheck2Temp = [];
							/*Initializes the radio button index if it is a radio button set.  This is here to make sure that the radio buttons only get an array of 1 value instead
							of multiple like the checkbox sets have.*/
							//SubCheck1
							angular.forEach(list.subCheck1, function(subCheck1, subCheck1Index) {
								//If the Type is a Radio Button, push an individual value to the array.
								if (list.subCheck1Type === "r") {
									if (subCheck1Index === 0) {
										$scope.subCheck1Temp.push([""]);
									}
								}
								//If the Type is a Checkbox, push the values along with a true false value to the array
								else {
									//Checks if there is a sub sub checkbox list.  If so, it enters more fields with T/F values
									$scope.subCheck1Temp.push([subCheck1[0], false, subCheck1[2]]);
									if (typeof subCheck1[1] !== 'undefined') {
										//Checks to see if the sub sub check lists are checkboxes or radio buttons
										//If SubSub1 is a checkbox set
										if (subCheck1[1][1] === "c") {
											subCheck1[2] = [];
											$scope.subCheck1Temp[subCheck1Index][2] = [subCheck1[1][0],[]];
											angular.forEach(subCheck1[1][2], function(subSubCheck1) {
												subSubCheck1.splice(1, 1, false);
												$scope.subCheck1Temp[subCheck1Index][2][1].push(subSubCheck1);
											});
										}
										//If SubSub1 is a radio button set
										else {
											$scope.subCheck1Temp[subCheck1Index][2] = [subCheck1[1][0], [""]];
										}
									}
								}
							});
							//SubCheck2
							angular.forEach(list.subCheck2, function(subCheck2, subCheck2Index) {
								//If the Type is a Radio Button, push an individual value to the array.
								if (list.subCheck2Type === "r") {
									if (subCheck2Index === 0) {
										$scope.subCheck2Temp.push([""]);
									}
								}
								//If the Type is a Checkbox, push the values along with a true false value to the array
								else {
									//Checks if there is a sub sub checkbox list.  If so, it enters more fields with T/F values
									$scope.subCheck2Temp.push([subCheck2[0], false, subCheck2[2]]);
									if (typeof subCheck2[1] !== 'undefined') {
										//Checks to see if the sub sub check lists are checkboxes or radio buttons
										//If SubSub1 is a checkbox set
										if (subCheck2[1][1] === "c") {
											subCheck2[2] = [];
											$scope.subCheck2Temp[subCheck2Index][2] = [subCheck2[1][0],[]];
											angular.forEach(subCheck2[1][2], function(subSubCheck2) {
												subSubCheck2.splice(1, 1, false);
												$scope.subCheck2Temp[subCheck2Index][2][1].push(subSubCheck2);
											});
										}
										//If SubSub1 is a radio button set
										else {
											$scope.subCheck2Temp[subCheck2Index][2] = [subCheck2[1][0], [""]];
										}
									}
								}
							});
							$scope.A21.push([list.checkName, false, [list.subTitle1, $scope.subCheck1Temp], [list.subTitle2, $scope.subCheck2Temp]]);
						});
						//Send Arrays to the service
						unsafeCService.initA21('A21', $scope.A21);
						//Returns the service after it is done initializing
						$scope.listA21 = unsafeCService.A21;
					}
				}
				else {
					$timeout(getData, 50);
				}
			};
			getData();
	
//Functions that run once someone changes an input
	$scope.changeA = function(elName, elValue, index, parentIndex, extras) {
		switch(elName) {
			case "A21":
				unsafeCService.changeA(elName, elValue, index, parentIndex, extras);
				break;
			default:
				unsafeCService.changeA(elName, elValue, index, parentIndex, extras);
				cFunctionName = ('$scope.list' + elName);
				sFunctionName = ('unsafeCService.' + elName);
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
					unsafeCService.changeDropzone($scope.currentDropzoneSelected, response, $scope.currentDropzoneIndex);
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
		$scope.dropzone = unsafeCService.dropzone;
		$scope.dropzoneThumb = unsafeCService.dropzoneThumb;
	};
	
	//Remove File from dropzone array
	$scope.removeFile = function(id, index) {
		if (confirm('Are you sure you want to delete this image?')) {
			unsafeCService.changeDropzone(id, '' , index);
			$scope.dropzone = unsafeCService.dropzone;
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
		
	//Check to see if the hopscotch cookie has been created.  If so, it will end the tour and start back up after the view has loaded.
	var tourCookie = $cookieStore.get('tour');
	if (tourCookie == 1) {
		$("body").addClass("tour-active");
		angular.element(document).ready(function () {
			hopscotch.startTour(mainService.tour, mainService.currentTourIndex);
		});
	}
	else {}
		
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
});