angular.module('speakeasy').directive('login', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/login.html',
		controllerAs: 'login',
		controller: function($state) {
			this.error = '';
			
			this.credentials = {
				email: '',
				password: ''
			};

			this.login = () => {
				Meteor.loginWithPassword(this.credentials.email, this.credentials.password, (error) => {
					if (error) {
						this.error = error.reason;
						console.error(error);
					} else {
						$state.go('board');
					}
				});
			};

			this.loginAsGuest = () => {
				this.error = 'Not yet implemented.';
			};
		}
	}
});