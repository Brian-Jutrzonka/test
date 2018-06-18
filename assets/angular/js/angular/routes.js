angular.module('doverApp')
.config(['$routeProvider', function($routeProvider){
  $routeProvider
    //Home
			.when('/home', {
				templateUrl:'/assets/angular/templates/pages/home/index.html',
				controller: 'homeController',
				controllerAs: 'home'
			})
			.when('/', {
				templateUrl:'/assets/angular/templates/pages/home/index.html',
				controller: 'homeController',
				controllerAs: 'home'
			})
			//General Routes
			.when('/notices', {
				templateUrl:'/assets/angular/templates/pages/notices/index.html',
				controller: 'noticesController',
				controllerAs: 'notices'
			})
			.when('/faq', {
				templateUrl:'/assets/angular/templates/pages/faq/index.html',
				controller: 'noticesController',
				controllerAs: 'notices'
			})
			.when('/tour', {
				templateUrl:'/assets/angular/templates/pages/tour/index.html',
				controller: 'miscellaneousController',
				controllerAs: 'miscellaneous'
			})
			.when('/pin', {
				templateUrl:'/assets/angular/templates/pages/pin/index.html',
				controller: 'pinController',
				controllerAs: 'pin'
			})
			.when('/9-guiding-principles', {
				templateUrl:'/assets/angular/templates/pages/9-guiding-principles/index.html',
				controller: 'noticesController',
				controllerAs: 'notices'
			})
			.when('/thank-you', {
				templateUrl:'/templates/pages/thank-you/thank-you.html'
			})
			.when('/contact', {
				templateUrl:'/assets/angular/templates/pages/contact/contact.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
    //Unsafe Act Route
			.when('/unsafe-act/1', {
				templateUrl:'/assets/angular/templates/pages/unsafe-act/1.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
			.when('/unsafe-act/2', {
				templateUrl:'/assets/angular/templates/pages/unsafe-act/2.html',
				controller: 'unsafeAController',
				controllerAs: 'unsafe'
			})
			.when('/unsafe-act/3', {
				templateUrl:'/assets/angular/templates/pages/unsafe-act/3.html',
				controller: 'unsafeAController',
				controllerAs: 'unsafe'
			})
			.when('/unsafe-act/edit', {
				templateUrl:'/assets/angular/templates/pages/unsafe-act/edit.html',
				controller: 'unsafeAController',
				controllerAs: 'unsafe'
			})
			.when('/unsafe-act/submit', {
				templateUrl:'/assets/angular/templates/pages/unsafe-act/submit.html',
				controller: 'unsafeAController',
				controllerAs: 'unsafe'
			})
    //Unsafe Condition Route
			.when('/unsafe-condition/1', {
				templateUrl:'/assets/angular/templates/pages/unsafe-condition/1.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
			.when('/unsafe-condition/2', {
				templateUrl:'/assets/angular/templates/pages/unsafe-condition/2.html',
				controller: 'unsafeCController',
				controllerAs: 'unsafe'
			})
			.when('/unsafe-condition/3', {
				templateUrl:'/assets/angular/templates/pages/unsafe-condition/3.html',
				controller: 'unsafeCController',
				controllerAs: 'unsafe'
			})
			.when('/unsafe-condition/edit', {
				templateUrl:'/assets/angular/templates/pages/unsafe-condition/edit.html',
				controller: 'unsafeCController',
				controllerAs: 'unsafe'
			})
			.when('/unsafe-condition/submit', {
				templateUrl:'/assets/angular/templates/pages/unsafe-condition/submit.html',
				controller: 'unsafeCController',
				controllerAs: 'unsafe'
			})
    //Safe Route
			.when('/safe/1', {
				templateUrl:'/assets/angular/templates/pages/safe/1.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
			.when('/safe/2', {
				templateUrl:'/assets/angular/templates/pages/safe/2.html',
				controller: 'safeController',
				controllerAs: 'safe'
			})
			.when('/safe/3', {
				templateUrl:'/assets/angular/templates/pages/safe/3.html',
				controller: 'safeController',
				controllerAs: 'safe'
			})
			.when('/safe/edit', {
				templateUrl:'/assets/angular/templates/pages/safe/edit.html',
				controller: 'safeController',
				controllerAs: 'safe'
			})
			.when('/safe/submit', {
				templateUrl:'/assets/angular/templates/pages/safe/submit.html',
				controller: 'safeController',
				controllerAs: 'safe'
			})
		//Near Miss Route
			.when('/near-miss/construction', {
				templateUrl:'/assets/angular/templates/pages/near-miss/construction.html',
			})
			.when('/near-miss/1', {
				templateUrl:'/assets/angular/templates/pages/near-miss/1.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
			.when('/near-miss/2', {
				templateUrl:'/assets/angular/templates/pages/near-miss/2.html',
				controller: 'nearMController',
				controllerAs: 'nearMiss'
			})
			.when('/near-miss/edit', {
				templateUrl:'/assets/angular/templates/pages/near-miss/edit.html',
				controller: 'nearMController',
				controllerAs: 'nearMiss'
			})
			.when('/near-miss/submit', {
				templateUrl:'/assets/angular/templates/pages/near-miss/submit.html',
				controller: 'nearMController',
				controllerAs: 'nearMiss'
			})
    //Safety Audit Route
			.when('/safety-audit/construction', {
				templateUrl:'/assets/angular/templates/pages/safety-audit/construction.html',
			})
			.when('/safety-audit/1', {
				templateUrl:'/assets/angular/templates/pages/safety-audit/1.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
			.when('/safety-audit/2', {
				templateUrl:'/assets/angular/templates/pages/safety-audit/2.html',
				controller: 'safetyAuditController',
				controllerAs: 'safetyAudit'
			})
			.when('/safety-audit/3', {
				templateUrl:'/assets/angular/templates/pages/safety-audit/3.html',
				controller: 'safetyAuditController',
				controllerAs: 'safetyAudit'
			})
			.when('/safety-audit/edit', {
				templateUrl:'/assets/angular/templates/pages/safety-audit/edit.html',
				controller: 'safetyAuditController',
				controllerAs: 'safetyAudit'
			})
			.when('/safety-audit/submit', {
				templateUrl:'/assets/angular/templates/pages/safety-audit/submit.html',
				controller: 'safetyAuditController',
				controllerAs: 'safetyAudit'
			})
		//Improvement Route
			.when('/improvement/construction', {
				templateUrl:'/assets/angular/templates/pages/improvement/construction.html',
			})
			.when('/improvement/1', {
				templateUrl:'/assets/angular/templates/pages/improvement/1.html',
				controller: 'locationController',
				controllerAs: 'location'
			})
			.when('/improvement/2', {
				templateUrl:'/assets/angular/templates/pages/improvement/2.html',
				controller: 'improvementController',
				controllerAs: 'improvement'
			})
			.when('/improvement/3', {
				templateUrl:'/assets/angular/templates/pages/improvement/3.html',
				controller: 'improvementController',
				controllerAs: 'improvement'
			})
			.when('/improvement/edit', {
				templateUrl:'/assets/angular/templates/pages/improvement/edit.html',
				controller: 'improvementController',
				controllerAs: 'improvement'
			})
			.when('/improvement/submit', {
				templateUrl:'/assets/angular/templates/pages/improvement/submit.html',
				controller: 'improvementController',
				controllerAs: 'improvement'
			})
			
			
			
			.when('/profile', {
				templateUrl:'/assets/angular/templates/pages/profile/index.html',
			});
}]);