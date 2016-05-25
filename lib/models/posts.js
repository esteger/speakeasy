Posts = new Mongo.Collection('posts');

Posts.allow({
	insert: function(userId, post) {
		return userId && (post.text || post.imgur);
	},
	update: function(userId, post, fields, modifier) {
		return userId && (post.text || post.imgur);
	},
	remove: function(userId, post) {
		return false;
	}
});

