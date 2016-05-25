
angular.module('speakeasy').directive('userlist', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/views/userlist.html',
		controllerAs: 'userlist',
		controller: function($scope) {
			var speakeasy = $scope.$root.speakeasy;
			this.users = speakeasy.users;
		}
	}
});