const mongoose = require('mongoose');
const cryptojs = require('crypto-js');
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
});

userSchema.statics.register = async function(name, email, password) {
            let userExists = await this.findOne({email})
            if(userExists) {
                throw Error("Email already exists")
            }

            let ciphertext = cryptojs.AES.encrypt(password, process.env.SECRET_KEY).toString();
            
            let userData = await this.create({
                name,
                email,
                password: ciphertext
            });
            return userData
}

userSchema.statics.login = async function(email, password) {
    let user = await this.findOne({email});
    if(!user) {
        throw new Error('User does not exist')
    }

    var bytes  = cryptojs.AES.decrypt(user.password, process.env.SECRET_KEY);
    var originalText = bytes.toString(cryptojs.enc.Utf8);

    if(password === originalText) {
        return user
    } else {
        throw new Error("password incorrect")
    }
}
const User = mongoose.model('User', userSchema)//users

module.exports = User