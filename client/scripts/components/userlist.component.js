angular.module('speakeasy').directive('userlist', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/userlist.html',
		controllerAs: 'userlist',
		controller: function($scope, TimeService) {
			var speakeasy = $scope.$root.speakeasy;
			this.users = speakeasy.users;

			this.getTime = (timestamp) => {
				timeAgo = speakeasy.currentTime - timestamp.getTime();
					
				return TimeService.formatTime(timeAgo);
			};
		}
	}
});