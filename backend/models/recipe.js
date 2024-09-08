const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ingridients: {
        type: Array,
        required: true
    },

    procedure: {
        type: String,
        required: true
    },

    photo: {
        type: String
    },

    time: {
        type: String
    }
}, {timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);//recipes

module.exports = Recipe;