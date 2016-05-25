Meteor.publish('users', function() {
	let selector = {
		'status.online': true
	};

	Counts.publish(this, 'usersOnline', Meteor.users.find(selector), { noReady: true });

	return Meteor.users.find({}, {fields: {
		emails: 1, 
		profile: 1, 
		status: 1
	}});
});