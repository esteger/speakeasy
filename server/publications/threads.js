Meteor.publish('threads', function(options) {
	let selector = {};

	Counts.publish(this, 'numberOfThreads', Posts.find(selector), { noReady: true });

	return Posts.find(selector, options);
});