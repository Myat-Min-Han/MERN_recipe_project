const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 8080
const app = express();
const recipeRouter = require('./routes/recipeRouter.js');
const userRouter = require('./routes/userRouter.js')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AuthMiddleware = require('./middleware/AuthMiddleware.js');

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//view engine
app.set('views', "./views")
app.set('view engine', "ejs");

//route middleware
app.use("/api/recipes", AuthMiddleware, recipeRouter);
app.use("/api/user",userRouter);
//connect to db
mongoose.connect("mongodb://localhost:27017/Menu")
    .then(() => {
        console.log('connected to db');
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        })
    })
    .catch((err) => {
        console.log(err)
    })








