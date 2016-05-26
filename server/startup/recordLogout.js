UserStatus.events.on('connectionLogout', function(event) {
	Meteor.users.update(event.userId, {
		$set: { 'status.logoutTime': event.logoutTime }
	});
});