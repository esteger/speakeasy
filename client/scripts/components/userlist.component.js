angular.module('speakeasy').directive('userlist', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/userlist.html',
		controllerAs: 'userlist',
		controller: function($scope) {
			var speakeasy = $scope.$root.speakeasy;

			this.users = speakeasy.users;
			this.detailView = false;
			this.userDetail = {};

			let updateTags = () => {
				var tagExists = false;

				let userTags = speakeasy.currentUser.profile.userTags || [];
				
				userTags.forEach((userTagObj, index, array) => {
					if (userTagObj.user_id === this.userDetail._id) {
						if (!this.userDetail.userTag) {
							array.splice(index, 1);
						} else {
							userTagObj.userTag = this.userDetail.userTag;
						}
						tagExists = true;
						return;
					}
				});

				if (!tagExists && !!this.userDetail.userTag) {
					userTags.push({
						user_id: this.userDetail._id,
						userTag: this.userDetail.userTag
					});
				}

				Meteor.users.update(speakeasy.currentUser._id, {
					$set: { 'profile.userTags': userTags }
				});
			};

			this.cancel = () => {
				this.detailView = false;
				this.userDetail = {};
			};

			this.save = () => {
				updateTags();

				this.detailView = false;
				this.userDetail = {};
			};
		}
	}
});