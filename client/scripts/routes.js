angular.module('speakeasy').config(function($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('board', {
			url: '/',
			template: '<board id="speakeasy" layout="column" layout-align="start center" flex-offset="0" flex-offset-gt-sm="5" flex="100" flex-gt-sm="90"></board>',
			resolve: {
				currentUser: ($q) => {
					if (Meteor.userId() === null) {
						return $q.reject('AUTH_REQUIRED');
					} else {
						return $q.resolve();
					}
				}
			}
		})
		.state('login', {
			url: '/login',
			template: '<login layout="column" layout-align="center center"></login>',
			resolve: {
				currentUser: ($q) => {
					if (!!Meteor.userId()) {
						return $q.reject('AUTH_GRANTED');
					} else {
						return $q.resolve();
					}
				}
			}
		})
		.state('register', {
			url: '/register',
			template: '<register layout="column" layout-align="center center"></register>',
			resolve: {
				currentUser: ($q) => {
					if (!!Meteor.userId()) {
						return $q.reject('AUTH_GRANTED');
					} else {
						return $q.resolve();
					}
				}
			}
		});

	$urlRouterProvider.otherwise('/');

}).run(function($rootScope, $state) {
	
	$rootScope.$state = $state;

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		if (error === 'AUTH_REQUIRED') {
			$state.go('login');
		}
		if (error === 'AUTH_GRANTED') {
			$state.go('board');
		}
	});
	
});