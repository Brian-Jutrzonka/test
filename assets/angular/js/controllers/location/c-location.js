angular.module('doverApp')
.controller('locationController', function($scope, mainService, $http, $timeout, $cookies){

//Initialization
	//Get all the form contents that were entered for use around this section.  More specifically for Submit/Edit pages.
		$scope.routeName = mainService.routeName;
		$scope.listL11 = mainService.location11;
		$scope.listL11N = mainService.location11N;
		$scope.listL12 = mainService.location12;
		$scope.listL1N = mainService.location1N;
		$scope.listL1O = mainService.location1O;
		$scope.listL13 = mainService.location13;
		$scope.listL12T = mainService.location12T;
		$scope.listL11Length = 0;
	
	//Fires function when page loads to get the locations and puts the user in the form
		var locationGetLocations = function () {
			$scope.locations = mainService.locations;
			mainService.userInForm();
			if (typeof $scope.locations === 'undefined'){
				$timeout(locationGetLocations, 500);
			}
		};
		locationGetLocations();
		
	//Fires function when page loads to get the locations.  Differs for Safety Audits because they have specialized locations
		var locationGetAreas = function () {
			if (mainService.routeName === 'safetyaudit'){$scope.listL12T = '12';}else {$scope.listL12T = '11';}
		};
		locationGetAreas();
		
//Functions that run once someone changes an input
	$scope.changeLocation = function(elName, elValue) {
		switch(elName) {
			case "L11":
				//Adds it locally first then pushes it to the service
				$scope.listL11 = elValue;
				mainService.changeLocation(elName, elValue);
				//On view enter, it will show up with a message.
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
				$scope.listL12 = mainService.location12;
				break;
			default:
				mainService.changeLocation(elName, elValue);
		}
	};
	
//Contact Page
	$scope.changeContact = function(elName, elValue) {
		switch(elName) {
			case "name":
					$scope.contactName = elValue;
				break;
			case "location":
				$scope.contactlocation = elValue;
				break;
			case "comments":
				$scope.contactComments = elValue;
				break;
			default:
				console.log('Try Again - Controller');
		}
	};
		
	//For use on the contact page.  The contact page currently uses this location controller. --- MOVE OVER TO DIFFERENT CONTROLLER
		$scope.checkContact = function() {
			if($( ".form-element-required" ).hasClass( "ng-empty" )){
				document.getElementById("errors").innerHTML = mainService.selectedLanguage.global.validation.message;
				$("#errors").addClass("errors-show");
			}
			else{
				document.getElementById("contact-content").submit();
			}
		};
	
//Tour for this section
	//Check to see if the hopscotch cookie has been created.  If so, it will end the tour and start back up after the view has loaded.
	var tourCookie = $cookies.get('tour');
	if (tourCookie == 1) {
		$("body").addClass("tour-active");
		angular.element(document).ready(function () {
			hopscotch.startTour(mainService.tour, mainService.currentTourIndex);
		});
	}
	else {}
});