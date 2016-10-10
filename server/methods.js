let addVote = (vote, threadId) => {
	return new Promise((resolve, reject) => {
		Votes.insert(vote, (error, result) => {
			if (!!error) {
				reject(error);
			} else {
				vote._id = result;
				Posts.update({ _id: threadId }, {
					$push: { votes: vote }
				}, {}, (error, result) => {
					if (!!error) { reject(error); } else { resolve(result); }
				});
			}
		});
	});
};
let changeVote = (vote, newValue, threadId) => {
	return new Promise((resolve, reject) => {
		Votes.update({ _id: vote._id }, {
			$set: { value: newValue }
		}, {}, (error) => {
			if (!!error) {
				reject(error);
			} else {
				Posts.update({ _id: threadId, 'votes._id': vote._id }, {
					$set: { 'votes.$.value': newValue }
				}, {}, (error, result) => {
					if (!!error) { reject(error); } else { resolve(result); }
				});
			}
		});
	});
};
let removeVote = (vote, threadId) => {
	return new Promise((resolve, reject) => {
		Votes.remove({ _id: vote._id }, (error) => {
			if (!!error) {
				reject(error);
			} else {
				Posts.update({ _id: threadId }, {
					$pull: { votes: { _id: vote._id }}
				}, {}, (error, result) => {
					if (!!error) { reject(error); } else { resolve(result); }
				});
			}
		});
	});
};
let editThreadText = (text, threadId) => {
	return new Promise((resolve, reject) => {
		Posts.update({ _id: threadId }, {
			$push: { edits: text }
		}, {}, (error, result) => {
			if (!!error) { reject(error); } else { resolve(result); }
		});
	});
};
let editCommentText = (text, threadId, commentId) => {
	return new Promise((resolve, reject) => {
		Posts.update({ _id: threadId, 'comments._id': commentId }, {
			$push: { 'comments.$.edits': text }
		}, {}, (error, result) => {
			if (!!error) { reject(error); } else { resolve(result); }
		});
	});
};

Meteor.methods({
	addVote: function(vote, threadId) {
		return addVote(vote, threadId).then(result => {
			return result;
		}).catch(error => {
			throw new Meteor.Error('400', error);
		});
	},
	changeVote: function(vote, newValue, threadId) {
		return changeVote(vote, newValue, threadId).then(result => {
			return result;
		}).catch(error => {
			throw new Meteor.Error('400', error);
		});
	},
	removeVote: function(vote, threadId) {
		return removeVote(vote, threadId).then(result => {
			return result;
		}).catch(error => {
			throw new Meteor.Error('400', error);
		});
	},
	editThreadText: function(text, threadId) {
		return editThreadText(text, threadId).then(result => {
			return result;
		}).catch(error => {
			throw new Meteor.Error('400', error);
		});
	},
	editCommentText: function(text, threadId, commentId) {
		return editCommentText(text, threadId, commentId).then(result => {
			return result;
		}).catch(error => {
			throw new Meteor.Error('400', error);
		});
	}
});