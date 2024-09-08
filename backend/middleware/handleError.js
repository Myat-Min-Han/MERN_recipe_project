const {validationResult} = require('express-validator')
const handleError = (req, res, next) => {
    let result = validationResult(req);

    if(!result.isEmpty()) {
        return res.status(400).json({errors: result.mapped()})
    } else {
        next()
    }
};

module.exports = handleError;