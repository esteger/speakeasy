angular.module('speakeasy').filter('postHandle', function() {
	return function(user) {
		if (!user) {
			return '';
		}

		if (user.profile && user.profile.handle) {
			return user.profile.handle;
		} else {
			return '';
		}
	}
});