angular.module('speakeasy').directive('register', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/register.html',
		controllerAs: 'register',
		controller: function($state) {
			var accessCode = 'this guy fucks';

			this.user = {
				email: '',
				password: '',
				profile: {
					handle: ''
				}
			};

			this.retypePassword = '';
			this.accessCode = '';

			this.error = '';

			this.register = () => {
				if (this.user.password !== this.retypePassword) {
					this.error = 'Passwords do not match.';
				} else if (this.accessCode !== accessCode) {
					this.error = 'Incorrect access code.';
				} else {
					Accounts.createUser(this.user, (error) => {
						if (error) {
							console.log(error);
							this.error = error.reason;
						} else {
							$state.go('board');
						}
					});
				}
			};
		}
	}
});