const express = require('express');
const recipeController = require('../Controllers/recipeController.js');
const { body } = require('express-validator');
const handleError = require('../middleware/handleError.js');
const upload = require('../helpers/multer.js')

const router = express.Router();

router.get('', recipeController.index)
router.get('/:id', recipeController.single)
router.patch('/:id', recipeController.update)
router.post('', [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('ingridients').notEmpty().isArray({min: 1}),
    body('procedure').notEmpty()
], handleError, recipeController.create);
router.post('/:id/upload',upload.single('photo'),[
    body('photo').custom((value, {req}) => {
        if(!req.file) {
            throw Error('Photo must be provided')
        }

        if(!req.file.mimetype.startsWith("image")) {
            throw Error("Photo must be image")
        }

        return true;
    })
], handleError,recipeController.upload)
router.delete('/:id', recipeController.delete)

module.exports = router