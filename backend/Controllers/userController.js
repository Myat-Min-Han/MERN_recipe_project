const User = require('../models/user.js');
const createToken = require('../helpers/createToken.js')

const userController = {

    me: async (req, res) => {
        return res.json(req.logInUser);
    },

    register: async (req, res) => {
        try {
            let {name, email, password} = req.body
            let user = await User.register(name, email, password);
            let token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 60 * 60 * 24 * 1000})
            return res.json({user, token})
        } catch(e) {
            return res.status(400).json({error: e.message})
        }
    },

    login: async (req, res) => {
        try {
            let {email, password} = req.body;
            let user = await User.login(email,password);
            let token = createToken(user._id);
            res.cookie('jwt', token)
            return res.json({user, token})
            
        }catch(e) {
            return res.status(400).json({error: e.message})
        }
    },

    logout: (req, res) => {
        res.cookie('jwt', '', {maxAge: 1})
        return res.json({msg: 'user logged out'})
    }

};

module.exports = userController;