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

    // récupère un utilisateur par son pseudo et son mot de passe
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

    // récupère un utilisateur par son id
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
    
    // changement des valeurs de mot de passe et/ou pseudo d'un utilisateur
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

    // suppression d'un utilisateur
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
        return tweets.find(
            {creator_id: creator_id},
            null, 
            {
                sort: {
                    created_at: -1
                }
            }).exec();
    },

    // change la valeur d'un tweet
    editTweet: async function (newValues) {
        return tweets.findOneAndUpdate({ _id: mongoose.Types.ObjectId(newValues._id) }, {
            $set: {
                content: newValues.content,
                modified_at: new Date(),
            }
        }).exec();
    },

    // ajoute followingId à la liste des following de userId
    addFollowing: async function(userId, followingId) {
        const user = await this.getUserById(userId);

        for(var userFollowed of user.following) {
            if(userFollowed.followingId == followingId) {
                return "-1";
            }
        }
        var newFollowing = {
            followingId: mongoose.Types.ObjectId(followingId),
        }
        user.following.push(newFollowing);
        user.save();
        return newFollowing;
    },

    // supprime followingId à la liste des following de userId
    removeFollowing: async function(userId, followingId) {
        const user = await this.getUserById(userId);
        users.updateOne(
            {
                _id: mongoose.Types.ObjectId(userId)
            }, 
            {
                $pull: 
                {
                    following: 
                    {
                        followingId: mongoose.Types.ObjectId(followingId)
                    }
                }
            }, 
            function(err){
                if(err) return err;
            }
        );
        user.save();
        return "1";
    },

    getFollowers: async function(userId) {
        return users.find({"following.followingId": mongoose.Types.ObjectId(userId)});
    },

    getFeed: async function(userId) {
        var user = await this.getUserById(userId);
        var followersArray = [];
        for(var follower of user.following) {
            followersArray.push(follower.followingId.toString());
        }
        followersArray.push(userId.toString());                                                                    

        return tweets.find(
            { creator_id : { $in : followersArray } } ,
            null, 
            {
                sort: {
                    created_at: -1
                }
            }
        );
    }
};
