angular.module('speakeasy').directive('postControls', function() {
	return {
		retrict: 'E',
		templateUrl: 'client/views/post-controls.html',
		controllerAs: 'postControls',
		controller: function($scope, $filter) {
			var speakeasy = $scope.$root.speakeasy,
				threadCtrl = $scope.$parent.threadCtrl;

			this.voteProcessing = false;

			this.isEdit = false;

			this.foldedComments = threadCtrl.foldedComments;
			this.commentsExpanded = false;
			this.btnCollapse = this.foldedComments + ' More';
			
			this.getVotes = (post, parent) => {
				let thread = parent || post;
				let votes = { ups: 0, downs: 0 };

				if (Array.isArray(thread.votes)) {
					thread.votes.filter(threadVote => threadVote.post_id === post._id).forEach(vote => {
						switch (vote.value) {
							case 'U': votes.ups++;
							break;
							case 'D': votes.downs++;
							break;
							case 'UU': votes.ups += 69;
							break;
							case 'DD': votes.downs += 69;
							break;
						}
					});
				}
				return votes;
			};

			this.submitVote = ($event, post, value, parentId) => {
				if (this.voteProcessing) { return; }

				this.voteProcessing = true;

				let threadId = parentId || post._id;

				let vote = {
					post_id: post._id,
					post_user_id: post.author,
					user_id: Meteor.userId()
				};

				let existingVote = $filter('filter')(speakeasy.votes, vote)[0];

				vote.value = $event.shiftKey ? (value + value) : value;

				if (!existingVote) {
					Meteor.call('addVote', vote, threadId, (error, result) => {
						this.voteProcessing = false;
					});
				} else if (existingVote.value !== vote.value) {
					Meteor.call('changeVote', existingVote, vote.value, threadId, (error, result) => {
						this.voteProcessing = false;
					});
				} else {
					Meteor.call('removeVote', existingVote, threadId, (error, result) => {
						this.voteProcessing = false;
					});
				}
			};

			this.quote = (post) => {
				var postForm = $scope.$parent.postForm;

				postForm.newPost.quote = {
					author: post.author,
					date: post.date,
					text: Array.isArray(post.edits) ? post.edits[0] : post.text,
					imgur: post.imgur
				};

				postForm.quotePreview = {
					author: $scope.post.getAuthor(post),
					date: $scope.post.getTimeAgo(post),
					text: $scope.post.getPostText(post),
					imgur: post.imgur
				};

			};

			this.isEditable = (post) => {
				let timeAgo = speakeasy.currentTime - post.date.getTime();
				// 5 minutes
				return post.author === Meteor.userId() && timeAgo < 300000 && !post.edits;
			};

			this.editPost = (post) => {
				if (!this.isEditable(post)) { return; }

				this.isEdit = true;
				this.editText = post.text;
			};

			this.cancelEdit = () => {
				this.isEdit = false;
			};

			this.saveEdit = (postId, parentId) => {
				let threadId = parentId || postId;
				let commentId = !!parentId ? postId : null;

				if (!commentId) {
					Meteor.call('editThreadText', this.editText, threadId, (error, result) => {
						this.isEdit = false;
					});
				} else {
					Meteor.call('editCommentText', this.editText, threadId, commentId, (error, result) => {
						this.isEdit = false;
					});
				}
			};

			this.isEdited = (post) => {
				return Array.isArray(post.edits);
			};

			this.toggleEdit = (post) => {
				this.showOriginal = !this.showOriginal;
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