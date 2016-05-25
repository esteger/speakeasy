angular.module('speakeasy').directive('post', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/post.html',
		controllerAs: 'post',
		scope: {
			content: '='
		},
		controller: function($scope, $filter, $sce, ThreadService) {
			var speakeasy = $scope.$root.speakeasy;
			
			this.imgExpand = false;
			this.youTube = false;
			this.imgur = null;

			this.toggleImgExpand = () => {
				this.imgExpand = !this.imgExpand;
			};

			this.getAuthor = (post) => {
				var user = $filter('filter')(speakeasy.users, {_id: post.author})[0],
					author = '';

				if (user) {
					author = user.profile.handle;
				}
				
				return author;
			};

			this.getTimeAgo = (post) => {
				var date = post.date,
					timePost = date.getTime(),
					timeNow = Date.now(),
					timeAgo = timeNow - timePost;

				return ThreadService.formatTimeAgo(timeAgo);
			};

			this.getPostImg = (post, store = 'original') => {
				var img = $filter('filter')(speakeasy.images, {_id: post.img})[0];
				
				if (!!img) {
					return img.url({store: store});
				}
			};

			this.getPostText = (post) => {
				if (!!post.text) {
					var text = post.text;

					this.embedYouTube(text);

					return text;
				}
			};

			this.embedImgur = (text) => {
				let imgur = /i.imgur.com\/(.{7})(\..[a-zA-Z0-9]*)/;

				if (text.match(imgur)) {
					this.imgur = 'http://' + text.match(imgur)[0];
				}
			}

			this.embedYouTube = (text) => {
				let youTube = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;

				if (text.match(youTube)) {
					this.youTube = true;

					var youTubeId = text.match(youTube)[1].substring(0,11),
						youTubeUrl = 'https://www.youtube.com/embed/' + youTubeId;

					this.embededYouTube = $sce.trustAsResourceUrl(youTubeUrl);
				}
			};

		}
	}
});