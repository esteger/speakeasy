angular.module('speakeasy').directive('board', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/board.html',
		controllerAs: 'board',
		controller: function($scope, $reactive) {
			let reactiveContext = $reactive(this).attach($scope);

			this.perPage = 10;
			this.page = 1;
			this.sort = {
				bumped: -1
			};

			this.stickies = [
				// { text: 'Click on an item in the user list to set a tag for that user.' }
			];

			reactiveContext.subscribe('threads', () => [{
				limit: parseInt(this.perPage),
				skip: parseInt((this.getReactively('page') - 1) * this.perPage),
				sort: this.getReactively('sort')
			}]);

			reactiveContext.helpers({
				threads: () => {
					return Posts.find({}, {
						sort: this.getReactively('sort')
					});
				},
				threadCount: () => {
					return Counts.get('numberOfThreads');
				}
			});

			this.pageChanged = (newPage) => {
				this.page = newPage;
			};

		}
	}
});