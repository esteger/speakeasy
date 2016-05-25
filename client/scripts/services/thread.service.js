angular.module('speakeasy').service('ThreadService', function() {
		
	this.formatTimeAgo = function(milliseconds) {
		pluralize = (number) => {
			return (number > 1) ? 's' : '';
		}
		var seconds = Math.floor(milliseconds / 1000),
			minutes = Math.floor(seconds / 60),
			hours = Math.floor(minutes / 60),
			days = Math.floor(hours / 24),
			months = Math.floor(days / 30),
			years = Math.floor(months / 12),
			timeAgoStr = 'just now';
		if (years >= 1) {
			months -= (years * 12);
			timeAgoStr = years + ' year' + pluralize(years);
			timeAgoStr += months > 0 ? ' ' + months + ' month' + pluralize(months) + ' ago' : ' ago';
		} else if (months >= 1) {
			days -= (months * 30);
			timeAgoStr = months + ' month' + pluralize(months);
			timeAgoStr += days > 0 ? ' ' + days + ' day' + pluralize(days) + ' ago' : ' ago';
		} else if (days >= 1) {
			hours -= (days * 24);
			timeAgoStr = days + ' day' + pluralize(days);
			timeAgoStr += hours > 0 ? ' ' + hours + ' hour' + pluralize(hours) + ' ago' : ' ago';
		} else if (hours >= 1) {
			minutes -= (hours * 60);
			timeAgoStr = hours + ' hour' + pluralize(hours);
			timeAgoStr += minutes > 0 ? ' ' + minutes + ' minute' + pluralize(minutes) + ' ago' : ' ago';
		} else if (minutes >= 1) {
			timeAgoStr = minutes + ' minute' + pluralize(minutes) + ' ago';
		}
		return timeAgoStr;
	};

});