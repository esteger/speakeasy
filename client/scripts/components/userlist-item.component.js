angular.module('speakeasy').directive('userlistItem', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/userlist-item.html',
		controllerAs: 'userlistItem',
		controller: function($scope, $filter, TimeService) {
			var speakeasy = $scope.$root.speakeasy;

			this.status = 'offline';

			this.getStatus = (user) => {
				if (user.status.online) {
					this.status = user.status.idle ? 'idle' : 'online';
				}

				let timestamp = null;

				switch(this.status) {
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

				return this.status + ' for ' + TimeService.formatTime(timeAgo);
			};

			this.getVotes = (user, value) => {
				let selector = { post_user_id: user._id };
				if (!!value) { 
					selector.value = value; 
				}
				return $filter('filter')(speakeasy.votes, selector).length;
			};

			this.getUserTag = (user) => {
				let userTags = speakeasy.currentUser.profile.userTags || [],
					userTagObj = userTags.filter(userTag => userTag.user_id === user._id);
				return !!userTagObj[0] ? userTagObj[0].userTag : null;
			};

			this.showDetailView = (user, userlist) => {
				let userTag = this.getUserTag(user);
				userlist.userDetail = Object.assign({}, user, { userTag });
				userlist.detailView = true;
			};
		}
	}
});