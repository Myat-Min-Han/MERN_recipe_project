const express = require('express');
const userController = require('../Controllers/userController.js');
const {body} = require('express-validator');
const handleError = require('../middleware/handleError.js');
const AuthMiddleware = require('../middleware/AuthMiddleware.js')

const router = express.Router();

router.get('/me', AuthMiddleware, userController.me)
router.post('/register', [
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty().isLength({min: 5})
], handleError,userController.register);

router.post('/login', userController.login);

router.post('/logout', userController.logout)

module.exports = router