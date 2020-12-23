const mongoose = require('mongoose');
const users = require('./collections.js').users();
const boards = require('./collections.js').tweets();

// cryptage des mots de passes
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {

    // récupère un utilisateur en fonction d'un login donné
    getSpecificUser: function(login) {
        return users.findOne({login : login},(error, user) => {
            if(error) return console.error(error);
            return user;
        });
    },

    getUserByLoginAndPassword: async function(login, password) {
        const currentUser = await this.getSpecificUser(login);
        if(currentUser == null) {
            return "-1";
        }
        const result = await bcrypt.compare(password, currentUser.password);
        if(result == true) {
            return currentUser;
        }
        else {
            return "-1";
        }
    },

    getUserById: async function(userId) {
        return users.findOne({_id : mongoose.Types.ObjectId(userId)}, (error, user) => {
            if(error) return error;
            return user;
        });
    },

    // ajoute un utilisateur dans la base de données
    addUser: async function(login, password) {
        const result = await this.getSpecificUser(login);

        if(result == null) {
            const cryptedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new users({ 
                _id : mongoose.Types.ObjectId(),
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
    }
};
  