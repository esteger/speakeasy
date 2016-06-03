angular.module('speakeasy').directive('userlist', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/userlist.html',
		controllerAs: 'userlist',
		controller: function($scope, $filter, TimeService) {
			var speakeasy = $scope.$root.speakeasy;

			this.users = speakeasy.users;

			this.getTime = (timestamp) => {
				timeAgo = speakeasy.currentTime - timestamp.getTime();
				return TimeService.formatTime(timeAgo);
			};

			this.getUpvotes = (user) => {
				let upvotes = $filter('filter')(speakeasy.votes, { post_user_id: user._id, value: 'U' });
				return upvotes.length;
			};

			this.getDownvotes = (user) => {
				let downvotes = $filter('filter')(speakeasy.votes, { post_user_id: user._id, value: 'D' });
				return downvotes.length;
			}

			this.getStats = (user) => {
				
			};
		}
	}
});