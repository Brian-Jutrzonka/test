angular.module('doverApp').factory('mainService', function mainFactory($http, $route, $cookies) {

//Initialization
	var service = {};
	//Create Other Reusable Variables
	var currentFormStatus = '';
	service.currentTourIndex = 0;
	service.endCurrentTour = 'no';
	service.randomThankYou = '';
	service.tourRoute = $cookies.get('tourRoute');
		
	//Gets the correct language data from our JSON file to be used within this controller
		var getLanguageData = function () {
			var languageCookie = $cookies.get('language');
			$http.get('/assets/angular/js/angular/config/lang-' + languageCookie + '.json').success(function(data) {
				service.selectedLanguage = data;
				
				//Gets random Thank You for the Thank You pages
					let subTitleCount = -1;
					let subTitleArray = [];
					angular.forEach(service.selectedLanguage.global.thankYou.subTitle, function(subTitle) {
						subTitleCount++;
						subTitleArray.push([subTitle]);
					});
					var randomNum = Math.floor(Math.random() * (subTitleCount + 1));
					service.randomThankYou = subTitleArray[randomNum];
			});
		};
		getLanguageData();
		
//In Form Section
	//Checks to see if user is in the form.  If they are, set it equal to In Form
	service.userInForm = function() {
		currentFormStatus = 'In Form';
	};
	//Used when a user clicks on a link outside of the form area while they are in the form area.
	service.userFormStatus = function(path) {
		if (currentFormStatus === 'In Form') {
			service.userFormStatus = currentFormStatus;
			if (confirm(service.selectedLanguage.global.alert.leaveForm)) {
				//Ends tour if the user is in one
				$cookies.put('tour', 0);
				hopscotch.endTour();
				//Moves the user to their page.
				window.location.href = path;
				currentFormStatus = '';
			} else {}
		}
		else {
			//Keeps the user on the same page
			service.userFormStatus = currentFormStatus;
			window.location = path;
		}
	};
//Pin Page
	//Redirects the Pin page link to the correct url. 
	service.goToRoute = function(route, routeName) {
		service.chooseRoute = route;
		service.routeName = routeName;
	};
		
//Location Page
	//Fires function when page loads to get the location variable
		var locationLayoutEnter = function () {
			//$http.get('/assets/api/locations.json').success(function(data) {
			$http.get('/api/locations.json').success(function(data) {
				//Sorts the Locations data alphabetically
				data.sort(function(a, b) {
					var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase();
					if (titleA < titleB) //sort string ascending
							return -1 ;
					if (titleA > titleB)
							return 1;
					return 0; //default return value (no sorting)
				});
				//Setting our service variable so that we can use data across the app
				service.locations = data;
			});
		};
		locationLayoutEnter();
	//Main Location change function 
    service.changeLocation = function(elName, elValue) {
     switch(elName) {
			case "L11":
				service.location11 = elValue;
				angular.forEach(service.locations,function(value)	{
					if (value.guid === elValue) {
						service.location11P = value.require_auth;
					}
				});
				service.location12 = '';
			break;
			case "L11N":
				service.location11N = elValue;
			break;
			case "L12":
				service.location12 = elValue;
			break;
			case "L1N":
				service.location1N = elValue;
			break;
			case "L1O":
				service.location1O = elValue;
			break;
			case "L13":
				service.location13 = elValue;
			break;
			default:
				console.log('Try Again - Service');
			}
		};
		
//Tour Plugin
	//Function to start tour when called
	service.initTour = function(tour) {
		service.tour = tour;
	};
	//Function to change the Tour Cookies when called
	service.changeTourCookie = function(value, routeName) {
		$cookies.put('tour', value);
		if (routeName === 'destroy') {
			$cookies.remove('tourRoute');
			$cookies.remove('tour');
		}
		else {
			$cookies.put('tourRoute', routeName);
		}
	};
	//Current Tour Index (Only runs if a button is clicked)
	service.changeCurrentTourIndex = function(prevOrNext, endTour) {
		if (prevOrNext == 'previous') {
			service.currentTourIndex = service.currentTourIndex - 1;
			if (endTour) {
				service.endCurrentTour = endTour;
			}
		}
		else if (prevOrNext == 'next') {
			service.currentTourIndex = service.currentTourIndex + 1;
			if (endTour) {
				service.endCurrentTour = endTour;
			}
		}
	};
	
  return service;
});