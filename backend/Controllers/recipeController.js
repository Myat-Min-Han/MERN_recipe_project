const Recipe = require('../models/recipe.js')// model
const mongoose = require('mongoose');
const removeFile = require('../helpers/removeFile.js');
const User = require('../models/user.js');
const emailQueue = require('../queues/emailQueue.js');

const recipeController = {
    index: async (req, res) => {
        let limit = 6;
        let page = req.query.page || 1;
        let recipes = await Recipe
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({createdAt: -1});

        let count = await Recipe.countDocuments();
        let recipesCount = Math.ceil(count/limit)

        return res.send(
            {
                recipes,
                recipesCount
            }
        )
    },

    single: async (req, res) => {
        try {
            let id = req.params.id;

            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({error: "not a valid id"})
            }   
            let singleRecipe = await Recipe.findById(id);

            if(!singleRecipe) {
                return res.status(404).json({msg: "recipe not found"})
            };

            return res.send(singleRecipe)
        } catch(err) {
            return res.status(500).send('Internal Server Error')
        }
    },

    update: async (req, res) => {
        let id = req.params.id;
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({msg: "not a valid id"})
        }

        let updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body);

        await removeFile(__dirname + '/../public' + updatedRecipe.photo)
        
        return res.send(updatedRecipe)
    },

    create: async (req, res) => {
        try {
            let {title, description, ingridients, procedure, time} = req.body; 
            const recipe = await Recipe.create({
                title,
                description,
                ingridients,
                procedure,
                time
            });

            let users = await User.find(null, ['email']);
            let emails = users.map(user => user.email);
            emails.filter(email => email !== req.logInUser.email)

            emailQueue.add({
                path: 'email',
                data: {
                    name: req.logInUser.name,
                    recipe
                },
                from: req.logInUser.email,
                to: emails,
                subject: "New recipe is created by someone"
            })
            // await sendEmail({
            //     path: 'email',
            //     data: {
            //         name: req.logInUser.name,
            //         recipe
            //     },
            //     from: req.logInUser.email,
            //     to: emails,
            //     subject: "New recipe is created by someone"
            // })
            return res.send(recipe)
        } catch(e) {
            return res.status(500).json({msg: e.message})
        }
    
    },

    delete: async (req, res) => {
            let id = req.params.id;
            const deletedRecipe = await Recipe.findByIdAndDelete(id);
            await removeFile(__dirname + '/../public' + deletedRecipe.photo)
            return res.send(deletedRecipe)
    },

    upload: async (req, res) => {
        try {

            let id = req.params.id;

            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({msg: "not a valid id"})
            }

            let updatedRecipe = await Recipe.findByIdAndUpdate(id, {
                photo: "/" + req.file.filename
            });

            if(!updatedRecipe) {
                return res.status(404).json({msg: "recipe not found"})
            }

            return res.json(updatedRecipe)
            
        } catch(e) {
            console.log(e);
            return res.status(500).send('Internal server error')
        }
    }
};

module.exports = recipeController;