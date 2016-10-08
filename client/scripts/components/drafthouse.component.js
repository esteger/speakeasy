angular.module('speakeasy').directive('drafthouse', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/drafthouse.html',
		controllerAs: 'drafthouse',
		controller: function($scope) {
			var picksPerRound = 10;

			this.roundPicks = [];

			for (var i = 0; i < picksPerRound; i++) {
				this.roundPicks.push(i + 1);
			}
		}
	}
});