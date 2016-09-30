angular.module('speakeasy').directive('postControls', function() {
	return {
		retrict: 'E',
		templateUrl: 'client/views/post-controls.html',
		controllerAs: 'postControls',
		controller: function($scope, $filter) {
			var speakeasy = $scope.$root.speakeasy,
				threadCtrl = $scope.$parent.threadCtrl;

			this.foldedComments = threadCtrl.foldedComments;
			this.commentsExpanded = false;
			this.btnCollapse = this.foldedComments + ' More';

			this.getVotes = (post, value) => {
				// let selector = { post_id: post._id };

				// if (value !== undefined) {
				// 	selector.value = value;
				// }

				// let votes = $filter('filter')(speakeasy.votes, selector);

				// return votes.length;
			};

			this.submitVote = (post, value) => {
				let vote = {
					post_id: post._id,
					post_user_id: post.author,
					user_id: Meteor.userId()
				};

				let existingVote = $filter('filter')(speakeasy.votes, vote)[0];

				if (!existingVote) {
					vote.value = value;
					Votes.insert(vote);
				} else if (existingVote.value !== value) {
					Votes.update({ _id: existingVote._id }, {
						$set: { value: value }
					});
				} else {
					Votes.remove({ _id: existingVote._id });
				}
			};

			this.quote = (post) => {
				var postForm = $scope.$parent.postForm;

				postForm.newPost.quote = {
					author: post.author,
					date: post.date,
					text: post.text,
					imgur: post.imgur
				};

				postForm.quotePreview = {
					author: $scope.post.getAuthor(post),
					date: $scope.post.getTimeAgo(post),
					text: $scope.post.getPostText(post),
					imgur: post.imgur
				};

			};

			this.collapseComments = (post) => {
				var commentLimit = threadCtrl.commentLimit,
					numComments = !!post.comments ? post.comments.length : 0;

				if (!this.commentsExpanded) {
					threadCtrl.foldedComments = 0;
					this.btnCollapse = 'Less';
					this.commentsExpanded = true;
				} else {
					this.foldedComments = numComments - commentLimit;
					threadCtrl.foldedComments = this.foldedComments;
					this.btnCollapse = this.foldedComments + ' More';
					this.commentsExpanded = false;
				}
			};

		}
	}
});