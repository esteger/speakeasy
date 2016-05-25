Ratings = new Mongo.Collection('ratings');

Ratings.allow({
	insert: (userId, rating) => {
		return !!userId;
	},
	update: (userId, rating, fields, modifier) => {
		return !!userId && userId === rating.user_id;
	},
	remove: (userId, rating) => {
		return !!userId && userId === rating.user_id;
	}
});