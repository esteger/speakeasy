angular.module('speakeasy').directive('settings', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/settings.html',
		controllerAs: 'settings',
		controller: function($scope, $reactive, $mdSidenav) {
			var speakeasy = $scope.$root.speakeasy;

			this.currentUser = speakeasy.currentUser;

			this.save = () => {
				Meteor.users.update(this.currentUser._id, {
					$set: { 'profile': this.currentUser.profile }
				});
				speakeasy.toggleControlPanel(speakeasy.activeControlPanel);
			};

			this.cancel = () => {
				this.currentUser.profile = Meteor.user().profile;
				speakeasy.toggleControlPanel(speakeasy.activeControlPanel);
			};
			
		}
	}
});