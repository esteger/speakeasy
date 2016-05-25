angular.module('speakeasy').directive('starRating', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/star-rating.html',
		controllerAs: 'starRating',
		controller: function($scope, $reactive) {
			let reactiveContext = $reactive(this).attach($scope);

			var scale = 5;
				
			this.stars = [];
			this.rating = 0;

			reactiveContext.subscribe('ratings');

			reactiveContext.helpers({
				ratings: () => {
					return Ratings.find({post_id: 0});
				}
			});

			for (var i = 0; i < scale; i++) {
				this.stars.push({
					rating: i < this.rating
				});
			}
		}
	}
});