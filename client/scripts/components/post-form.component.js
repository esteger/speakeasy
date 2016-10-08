angular.module('speakeasy').directive('postForm', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/post-form.html',
		controllerAs: 'postForm',
		controller: function($scope, Upload) {
			this.newPost = {};
			this.previewReady = false;
			this.imgLoading = false;

			this.uploadToImgur = (files) => {
				if (files.length > 0) {
					this.imgLoading = true;

					let fileReader = new FileReader();
					fileReader.readAsDataURL(files[0]);

					fileReader.onload = (e) => {
						var dataUrl = e.target.result;
						var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
						Imgur.upload({
							apiKey: '99f7ee18e1cf7c4',
							image: base64Data
						}, (error, data) => {
							if (!error) {
								this.newPost.imgur = data;
								this.imgPreview = data.link;
							} else {
								console.error(error);
								alert('Error!');
							}
							this.imgLoading = false;
							$scope.$apply();
						});
					}
				}
			};

			this.cancelImage = () => {
				delete this.newPost.imgur;
				delete this.imgPreview;
			};

			this.cancelQuote = () => {
				delete this.newPost.quote;
				delete this.quotePreview;
			};

			this.submitPost = (parentId) => {
				if (!this.newPost.text && !this.newPost.imgur) {
					return;
				}

				this.newPost.author = Meteor.userId();
				this.newPost.date = new Date;

				if (!parentId) {
					this.newPost.bumped = this.newPost.date;
					Posts.insert(this.newPost);
				} else {
					this.newPost._id = Random.id();

					Posts.update({ _id: parentId }, {
						$push: { comments: this.newPost },
						$set: { bumped: this.newPost.date } 
					});
				}
				
				this.newPost = {};
				this.previewReady = false;
				delete this.imgPreview;
				delete this.quotePreview;
			};
		}
	}
});