const mongoose = require('mongoose');

module.exports = {
	// mapping des utilisateurs
	users: function() {
		const usersSchema = new mongoose.Schema({
 			_id:  Object,
			login: { type : String , unique : true, required : true },
            password: { type : String, required : true },
            nickname: { type : String, required : true },
            following: { type : Array, required : true}
		});
		return mongoose.model('users', usersSchema, 'users');
	},

	// mapping des tweets
	tweets: function() {
		const tweetsSchema = new mongoose.Schema({
		 	_id: Object,
			content:   { type : String, required : true },
			creator_id :  { type : Object, required : true },
			created_at:  { type : Date, required : true },
			modified_at: Date,
			likes: { type : Array, required : true }
		});
		return mongoose.model('tweets', tweetsSchema, 'tweets');
	}
};
  