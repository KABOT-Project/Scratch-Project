const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')
const axios = require('axios');
const cors = require('cors')
require('dotenv').config()

const generationController = require('../controllers/generationController');

const router = express.Router();
router.use(cors());

// Signup route
router.post('/signup', userController.createUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
    // what should happen here on successful sign up?
    console.log("Post request for /signup")
    res.sendStatus(200);
  });

//google oauth route handler
router.post('/googauth', userController.googDb, cookieController.setSSIDCookie, (req, res) => {
  //googDb determines whether user exists; if they do -> next, don't -> create user in database
  console.log("Post request for /googauth");
  res.sendStatus(200);
})

// route handler to get recipes for recipe page
router.get('/recipes', sessionController.isLoggedIn, recipeController.getRecipes, recipeController.getIngredients, (req, res) => {
    console.log('/recipes GET request for recipeController.getRecipes & recipeController.getIngredients has fired');
    res.status(200).json(res.locals.data);
  });

// route handler to post recipes and return posting to render on frontend
router.post('/recipes', recipeController.postRecipe, (req, res) => {
    console.log('/recipes POST request for recipeControler.postRecipe has fired');
    res.status(200).json(res.locals.data);
  });


// *** switch out this middleware after testing - DRY ***
// route handler to retrieve user recipes for the homepage and parse data for randomized week with additional parameters 
router.post('/homepage', generationController.getRecipes, generationController.getIngredients, generationController.handleUserData, generationController.handleLoginData, (req, res) => {
    console.log('/homepage POST request for recipeController.getRecipes, recipeController.getIngredients & gernationController.handleUserData has fired');
    res.status(200).json(res.locals);
});

// route handler to render recipe generation if user already generated a set
router.get('/homepage', sessionController.isLoggedIn, generationController.fetchCreatedData, (req, res) => {
  console.log('/homepage GET request for generationController.fetchCreatedData has fired');
  res.status(200).json(res.locals.data);
});

//userController -> verifyUser, setSSIDcookie, start session
router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, sessionController.startSession, (req, res) => {
  console.log("Post request for /login")
  console.log(req.session.user_id);
  res.sendStatus(200);
});

//logout user
router.get('/logout', (req, res) => {
  console.log('/logout route hit');
  req.session.destroy();
  res.send("Session destroyed.")
})

module.exports = router; 