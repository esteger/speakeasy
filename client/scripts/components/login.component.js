angular.module('speakeasy').directive('login', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/login.html',
		controllerAs: 'login',
		controller: function($scope, $state) {
			var speakeasy = $scope.$parent.speakeasy;

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
						speakeasy.resetControlPanel();
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