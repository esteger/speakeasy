angular.module('speakeasy').directive('userlistItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/userlist-item.html',
		controllerAs: 'userlistItem',
		controller: function($scope, $filter, TimeService) {
			var speakeasy = $scope.$root.speakeasy;

			this.getStatus = (user) => {
				let status = 'offline';
				
				if (user.status.online) {
					status = user.status.idle ? 'idle' : 'online';
				}

				let timestamp = null;

				switch(status) {
					case 'online':
						timestamp = user.status.lastLogin.date;
						break;
					case 'idle':
						timestamp = user.status.lastActivity;
						break;
					case 'offline':
						timestamp = user.status.logoutTime;
						break;
				}

				let timeAgo = speakeasy.currentTime - timestamp.getTime();

				return status + ' for ' + TimeService.formatTime(timeAgo);
			};

			this.getVotes = (user, value) => {
				let selector = { post_user_id: user._id };
				
				if (!!value) { 
					selector.value = value; 
				}
				
				return $filter('filter')(speakeasy.votes, selector).length;
			};
		}
	}
});