const mongoose = require('mongoose');
const users = require('./collections.js').users();
const tweets = require('./collections.js').tweets();


// chiffrement des mots de passe
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {

    // récupère la liste des utilisateurs
    getAllUsers: function () {
        return users.find({}, (error, users) => {
            if (error) return console.error(error);
            return users;
        });
    },

    // récupère un utilisateur en fonction d'un login donné
    getSpecificUser: function (login) {
        return users.findOne({ login: login }, (error, user) => {
            if (error) return console.error(error);
            return user;
        });
    },

    getUserByLoginAndPassword: async function (login, password) {
        const currentUser = await this.getSpecificUser(login);
        if (currentUser == null) {
            return "-1";
        }
        const result = await bcrypt.compare(password, currentUser.password);
        if (result == true) {
            return currentUser;
        }
        else {
            return "-1";
        }
    },

    getUserById: async function (userId) {
        return users.findOne({ _id: mongoose.Types.ObjectId(userId) }, (error, user) => {
            if (error) return error;
            return user;
        });
    },

    // ajoute un utilisateur dans la base de données
    addUser: async function (login, password) {
        const result = await this.getSpecificUser(login);

        if (result == null) {
            const cryptedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new users({
                _id: mongoose.Types.ObjectId(),
                login: login,
                password: cryptedPassword,
                nickname: login,
                following: []
            });
            newUser.save((error) => {
                if (error) {
                    console.error(error);
                }
            });
            return newUser;
        }
        else {
            return "-1";
        }
    },
    editUser: async function (newValues) {
        var newPassword = newValues.password;
        if (newValues.password.length != 60) {
            newPassword = await bcrypt.hash(newValues.password, saltRounds)
        }
        return users.findOneAndUpdate({ _id: mongoose.Types.ObjectId(newValues._id) }, {
            $set: {
                nickname: newValues.nickname,
                password: newPassword
            }
        }).exec();
    },

    deleteUser: function (userId) {
        return users.findOneAndDelete({ _id: mongoose.Types.ObjectId(userId) }).exec();
    },

    //Gestion des publications

    //ajoute une publication
    addTweet: async function (content, creator_id) {
        const newTweet = new tweets({
            _id: mongoose.Types.ObjectId(),
            content: content,
            creator_id: creator_id,
            created_at: new Date(),
        });
        newTweet.save((error) => {
            if (error) {
                console.error(error);
            }
        });
        return newTweet;


    },

    //supprime une publication
    deleteTweet: function (tweet_id) {
        return tweets.findOneAndDelete({ _id: mongoose.Types.ObjectId(tweet_id) }).exec();
    },

    //recupere un tweet par id
    getTweetByCreatorId: function (creator_id) {
        return tweets.find({creator_id: creator_id}).exec();
    },


    editTweet: async function (newValues) {
        return users.findOneAndUpdate({ _id: mongoose.Types.ObjectId(newValues._id) }, {
            $set: {
                content: newValues.content,
                modified_at: new Date(),
            }
        }).exec();
    },

};
