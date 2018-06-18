angular.module('doverApp')
.controller('homeController', function($scope, mainService, $cookies, $cookieStore, $timeout){

//This is placed on the buttons to direct angular to the correct path and to add routeName variable
	$scope.homeClick = function(route, routeName) {
		mainService.goToRoute(route, routeName);
	};
	
//Tooltips on the home page
	$(".tooltip-container").click(function(){
		event.stopPropagation();
		$(this).toggleClass('active');
	});
	$(document).click( function(){
			$(".tooltip-container.active").toggleClass('active');
	});
	
//Check to see if the hopscotch cookie has been created.  If so, it will end the tour and start back up after the view has loaded.
	var tourCookie = $cookieStore.get('tour');
	angular.element(document).ready(function () {
		var startTour = function() {
			if (tourCookie == 1 && typeof mainService.tour !== 'undefined') {
				hopscotch.startTour(mainService.tour, mainService.currentTourIndex);
				$("body").addClass("tour-active");
			}
			else {
				$timeout(startTour, 50);
				return;
			}
		};
		startTour();
	});
	
});