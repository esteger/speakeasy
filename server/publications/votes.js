Meteor.publish('votes', function(options) {

	let selector = {};

	return Votes.find(selector, options);
});