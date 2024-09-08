const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config()

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeValue) => {
            if(err) {
                return res.status(401).json({error: "Unauthorized"})
            } else {
                let user = User.findById(decodeValue._id)
                    req.logInUser = user;
                    next()
                
            }
        })
    } else {
        return res.status(401).json({error: 'jwt must be provided'})
    }

};

module.exports = AuthMiddleware;