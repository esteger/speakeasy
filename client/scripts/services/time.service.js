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
			unit = getUnits(milliseconds),
			post = !!postString ? ' ' + postString : '';

		if (unit.years >= 1) {
			unit.months -= (unit.years * 12);
			timeStr = unit.years + ' year' + pluralize(unit.years);
			timeStr += unit.months > 0 ? ' ' + unit.months + ' month' + pluralize(unit.months) + post : post;
		} else if (unit.months >= 1) {
			days -= (unit.months * 30);
			timeStr = unit.months + ' month' + pluralize(unit.months);
			timeStr += days > 0 ? ' ' + unit.days + ' day' + pluralize(unit.days) + post : post;
		} else if (unit.days >= 1) {
			unit.hours -= (unit.days * 24);
			timeStr = unit.days + ' day' + pluralize(days);
			timeStr += unit.hours > 0 ? ' ' + unit.hours + ' hour' + pluralize(unit.hours) + post : post;
		} else if (unit.hours >= 1) {
			unit.minutes -= (unit.hours * 60);
			timeStr = unit.hours + ' hour' + pluralize(unit.hours);
			timeStr += unit.minutes > 0 ? ' ' + unit.minutes + ' minute' + pluralize(unit.minutes) + post : post;
		} else if (unit.minutes >= 1) {
			timeStr = unit.minutes + ' minute' + pluralize(unit.minutes) + post;
		}
		return timeStr;
	};

});