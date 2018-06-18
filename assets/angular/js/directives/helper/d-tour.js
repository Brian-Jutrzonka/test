angular.module('doverApp').directive("tour", ['mainService', function(mainService) {
  return {
		restrict: 'E',
		link: function(scope, element, attribute){
			//Tour plugin.
			// Defining the tour.  Each route has a different tour with different content.
			var tour = '';
			var tourRoute = mainService.tourRoute;
			if (tourRoute === 'unsafe-act') {
				tour = {
					id: "tour",
					steps: [
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.one.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.one.description,
							target: document.querySelector("#header-left a"),
							placement: "right",
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.two.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.two.description,
							target: document.querySelector("#home-unsafe-act-button"),
							placement: "right",
							multipage: true,
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-act/1";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.three.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.three.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/home";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-act/2";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.four.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.four.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/unsafe-act/1";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-act/3";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.five.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.five.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/unsafe-act/2";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-act/submit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.six.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.six.description,
							target: "form-heading",
							placement: "left",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/unsafe-act/3";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next', 'yes');
								window.location.href = "/#/unsafe-act/edit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeAct.seven.title,
							content: mainService.selectedLanguage.global.tour.unsafeAct.seven.description,
							target: "form-heading",
							placement: "left",
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous', 'no');
								window.location.href = "/#/unsafe-act/3";
							}
						}
					],
					showPrevButton: true,
					onClose: function() {
						mainService.changeTourCookie(0);
						window.location.href = "/";
					},
					onEnd:  function() {
						if (mainService.endCurrentTour === 'yes') {
							hopscotch.endTour();
							mainService.changeTourCookie(0, '');
							window.location.href = "/";
						}
					},
				};
				mainService.initTour(tour);
			}
			else if (tourRoute === 'unsafe-condition') {
				tour = {
					id: "tour",
					steps: [
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.one.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.one.description,
							target: document.querySelector("#header-left a"),
							placement: "right",
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.two.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.two.description,
							target: document.querySelector("#home-unsafe-condition-button"),
							placement: "right",
							multipage: true,
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-condition/1";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.three.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.three.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/home";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-condition/2";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.four.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.four.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/unsafe-condition/1";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-condition/3";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.five.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.five.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/unsafe-condition/2";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/unsafe-condition/submit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.six.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.six.description,
							target: "form-heading",
							placement: "left",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/unsafe-condition/3";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next', 'yes');
								window.location.href = "/#/unsafe-condition/edit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.unsafeCondition.seven.title,
							content: mainService.selectedLanguage.global.tour.unsafeCondition.seven.description,
							target: "form-heading",
							placement: "left",
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous', 'no');
								window.location.href = "/#/unsafe-condition/3";
							}
						}
					],
					showPrevButton: true,
					onClose: function() {
						mainService.changeTourCookie(0);
						window.location.href = "/";
					},
					onEnd:  function() {
						if (mainService.endCurrentTour === 'yes') {
							hopscotch.endTour();
							mainService.changeTourCookie(0, '');
							window.location.href = "/";
						}
					},
				};
				mainService.initTour(tour);
			}
			else if (tourRoute === 'near-miss') {
				tour = {
					id: "tour",
					steps: [
						{
							title: mainService.selectedLanguage.global.tour.nearMiss.one.title,
							content: mainService.selectedLanguage.global.tour.nearMiss.one.description,
							target: document.querySelector("#header-left a"),
							placement: "right",
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.nearMiss.two.title,
							content: mainService.selectedLanguage.global.tour.nearMiss.two.description,
							target: document.querySelector("#home-near-miss-button"),
							placement: "left",
							multipage: true,
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/near-miss/1";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.nearMiss.three.title,
							content: mainService.selectedLanguage.global.tour.nearMiss.three.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/home";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/near-miss/2";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.nearMiss.four.title,
							content: mainService.selectedLanguage.global.tour.nearMiss.four.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/near-miss/1";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/near-miss/submit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.nearMiss.five.title,
							content: mainService.selectedLanguage.global.tour.nearMiss.five.description,
							target: "form-heading",
							placement: "left",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/near-miss/2";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next', 'yes');
								window.location.href = "/#/near-miss/edit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.nearMiss.six.title,
							content: mainService.selectedLanguage.global.tour.nearMiss.six.description,
							target: "form-heading",
							placement: "left",
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous', 'no');
								window.location.href = "/#/near-miss/submit";
							}
						}
					],
					showPrevButton: true,
					onClose: function() {
						mainService.changeTourCookie(0);
						window.location.href = "/";
					},
					onEnd:  function() {
						if (mainService.endCurrentTour === 'yes') {
							hopscotch.endTour();
							mainService.changeTourCookie(0, '');
							window.location.href = "/";
						}
					},
				};
				mainService.initTour(tour);
			}
			else if (tourRoute === 'safe') {
				tour = {
					id: "tour",
					steps: [
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.one.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.one.description,
							target: document.querySelector("#header-left a"),
							placement: "right",
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.two.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.two.description,
							target: document.querySelector("#home-safe-button"),
							placement: "right",
							multipage: true,
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safe/1";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.three.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.three.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/home";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safe/2";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.four.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.four.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/safe/1";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safe/3";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.five.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.five.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/safe/2";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safe/submit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.six.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.six.description,
							target: "form-heading",
							placement: "left",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/safe/3";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next', 'yes');
								window.location.href = "/#/safe/edit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.somethingSafe.seven.title,
							content: mainService.selectedLanguage.global.tour.somethingSafe.seven.description,
							target: "form-heading",
							placement: "left",
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous', 'no');
								window.location.href = "/#/safe/submit";
							}
						}
					],
					showPrevButton: true,
					onClose: function() {
						mainService.changeTourCookie(0);
						window.location.href = "/";
					},
					onEnd:  function() {
						if (mainService.endCurrentTour === 'yes') {
							hopscotch.endTour();
							mainService.changeTourCookie(0, '');
							window.location.href = "/";
						}
					},
				};
				mainService.initTour(tour);
			}
			else if (tourRoute === 'improvement') {
				tour = {
					id: "tour",
					steps: [
						{
							title: mainService.selectedLanguage.global.tour.improvement.one.title,
							content: mainService.selectedLanguage.global.tour.improvement.one.description,
							target: document.querySelector("#header-left a"),
							placement: "right",
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.improvement.two.title,
							content: mainService.selectedLanguage.global.tour.improvement.two.description,
							target: document.querySelector("#home-safe-button"),
							placement: "right",
							multipage: true,
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/improvement/1";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.improvement.three.title,
							content: mainService.selectedLanguage.global.tour.improvement.three.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/home";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/improvement/2";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.improvement.four.title,
							content: mainService.selectedLanguage.global.tour.improvement.four.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/improvement/1";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/improvement/3";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.improvement.five.title,
							content: mainService.selectedLanguage.global.tour.improvement.five.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/improvement/2";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/improvement/submit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.improvement.six.title,
							content: mainService.selectedLanguage.global.tour.improvement.six.description,
							target: "form-heading",
							placement: "left",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/improvement/3";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next', 'yes');
								window.location.href = "/#/improvement/edit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.improvement.seven.title,
							content: mainService.selectedLanguage.global.tour.improvement.seven.description,
							target: "form-heading",
							placement: "left",
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous', 'no');
								window.location.href = "/#/improvement/submit";
							}
						}
					],
					showPrevButton: true,
					onClose: function() {
						mainService.changeTourCookie(0);
						window.location.href = "/";
					},
					onEnd:  function() {
						if (mainService.endCurrentTour === 'yes') {
							hopscotch.endTour();
							mainService.changeTourCookie(0, '');
							window.location.href = "/";
						}
					},
				};
				mainService.initTour(tour);
			}
			else if (tourRoute === 'safety-audit') {
				tour = {
					id: "tour",
					steps: [
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.one.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.one.description,
							target: document.querySelector("#header-left a"),
							placement: "right",
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.two.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.two.description,
							target: document.querySelector("#home-safety-audit-button"),
							placement: "left",
							multipage: true,
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safety-audit/1";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.three.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.three.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/home";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safety-audit/2";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.four.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.four.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/safety-audit/1";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safety-audit/3";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.five.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.five.description,
							target: "form-heading",
							placement: "right",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/safety-audit/2";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next');
								window.location.href = "/#/safety-audit/submit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.six.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.six.description,
							target: "form-heading",
							placement: "left",
							multipage: true,
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous');
								window.location.href = "/#/safety-audit/3";
							},
							onNext: function() {
								mainService.changeCurrentTourIndex('next', 'yes');
								window.location.href = "/#/safety-audit/edit";
							}
						},
						{
							title: mainService.selectedLanguage.global.tour.safetyAudit.seven.title,
							content: mainService.selectedLanguage.global.tour.safetyAudit.seven.description,
							target: "form-heading",
							placement: "left",
							onPrev: function() {
								mainService.changeCurrentTourIndex('previous', 'no');
								window.location.href = "/#/safety-audit/3";
							}
						}
					],
					showPrevButton: true,
					onClose: function() {
						mainService.changeTourCookie(0);
						window.location.href = "/";
					},
					onEnd:  function() {
						if (mainService.endCurrentTour === 'yes') {
							hopscotch.endTour();
							mainService.changeTourCookie(0, '');
							window.location.href = "/";
						}
					},
				};
				mainService.initTour(tour);
			}
		},
		replace: true,
    templateUrl:'/assets/angular/templates/directives/helper/tour.html'
  };
}]);