angular.module('speakeasy').directive('thread', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/thread.html',
		controllerAs: 'threadCtrl',
		controller: function($scope) {
			this.commentLimit = 2;	

			let comments = $scope.thread.comments || [];
		
			if (comments.length < this.commentLimit) {
				this.foldedComments = 0;
			} else {
				this.foldedComments = comments.length - this.commentLimit;
			}
		}
	}
});