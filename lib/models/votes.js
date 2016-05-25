Votes = new Mongo.Collection('votes');

Votes.allow({
	insert: function(userId, vote) {
		return !!userId;
	},
	update: function(userId, vote, fields, modifier) {
		return !!userId && userId === vote.user_id;
	},
	remove: function(userId, vote) {
		return !!userId && userId === vote.user_id;
	}
});