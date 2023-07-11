const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')
const generationController = require('../controllers/generationController');

// const cookieController = require('../controllers/cookieController');
// const userController = require('../controllers/userController');
// const goalController = require('../controllers/goalController');

const router = express.Router();

// Signup route
router.post('/signup', userController.createUser, cookieController.setSSIDCookie, (req, res) => {
    // what should happen here on successful sign up?
    console.log("Post request for /signup")
    res.sendStatus(200);
  });

// route handler to get recipes for recipe page
router.get('/recipes', recipeController.getRecipes, recipeController.getIngredients, (req, res) => {
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
    console.log('/homepage GET request for recipeController.getRecipes, recipeController.getIngredients & gernationController.handleUserData has fired');
    res.status(200).json(res.locals);
});

// route handler to render recipe generation if user already generated a set
router.get('/homepage'), generationController.fetchCreatedData, (req, res) => {
  console.log('/homepage GET request for generationController.fetchCreatedData has fired');
  res.status(200).json(res.locals.data);
}

//userController -> verifyUser, setSSIDcookie, start session
router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
  console.log("Post request for /login")
  console.log(req.session.user_id);
  res.sendStatus(200);
});


module.exports = router; 