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

	// mapping des tableaux
	tweets: function() {
		const tweetsSchema = new mongoose.Schema({
		 	_id: Object,
			content:  String,
			creator_id : Object,
			created_at: Date,
			modified_at: Date,
			/*creator_name: String,
			notes : Array,
			users : Array */
		});
		return mongoose.model('tweets', tweetsSchema, 'tweets');
	}
};
  