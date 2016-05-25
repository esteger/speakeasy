Images = new FS.Collection('images', {
	stores: [
		new FS.Store.GridFS('thumbnail', {
			transformWrite: function(fileObj, readStream, writeStream) {
				gm(readStream, fileObj.name()).resize('200').stream().pipe(writeStream);
			}
		}),
		new FS.Store.GridFS('original')
	],
	filter: {
		maxSize: 1048576,
		allow: {
			contentTypes: ['image/*']
		},
		onInvalid: function(message) {
			if (Meteor.isClient) {
				alert(message);
			} else {
				console.error(message);
			}
		}
	}
});

Images.allow({
	insert: function(userId) {
		return !!userId;
	},
	remove: function(userId) {
		return !!userId;
	},
	download: function(userId) {
		return !!userId;
	},
	update: function(userId) {
		return !!userId;
	}
});