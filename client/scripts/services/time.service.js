angular.module('speakeasy').service('TimeService', function() {

	let pluralize = (number) => {
		return (number > 1) ? 's' : '';
	};

	let getUnits = (milliseconds) => {
		var seconds = Math.floor(milliseconds / 1000),
			minutes = Math.floor(seconds / 60),
			hours = Math.floor(minutes / 60),
			days = Math.floor(hours / 24),
			months = Math.floor(days / 30),
			years = Math.floor(months / 12);
		return { seconds, minutes, hours, days, months, years };
	};

	this.formatTime = (milliseconds, initUnit, postString) => {
		initUnit = initUnit || 'less than 1 minute';

		var timeStr = initUnit,
			units = getUnits(milliseconds),
			post = !!postString ? ' ' + postString : '';

		if (units.years >= 1) {
			units.months -= (units.years * 12);
			timeStr = units.years + ' year' + pluralize(units.years);
			timeStr += units.months > 0 ? ' ' + units.months + ' month' + pluralize(units.months) + post : post;
		} else if (units.months >= 1) {
			units.days -= (units.months * 30);
			timeStr = units.months + ' month' + pluralize(units.months);
			timeStr += units.days > 0 ? ' ' + units.days + ' day' + pluralize(units.days) + post : post;
		} else if (units.days >= 1) {
			units.hours -= (units.days * 24);
			timeStr = units.days + ' day' + pluralize(units.days);
			timeStr += units.hours > 0 ? ' ' + units.hours + ' hour' + pluralize(units.hours) + post : post;
		} else if (units.hours >= 1) {
			units.minutes -= (units.hours * 60);
			timeStr = units.hours + ' hour' + pluralize(units.hours);
			timeStr += units.minutes > 0 ? ' ' + units.minutes + ' minute' + pluralize(units.minutes) + post : post;
		} else if (units.minutes >= 1) {
			timeStr = units.minutes + ' minute' + pluralize(units.minutes) + post;
		}
		return timeStr;
	};

	this.secondsAgo = (milliseconds) => {
		var seconds = getUnits(milliseconds).seconds
		return seconds + ' second' + pluralize(seconds) + ' ago';
	};

});