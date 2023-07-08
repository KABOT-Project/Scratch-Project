const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')

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

  router.get('/recipes', recipeController.getRecipes, recipeController.getIngredients, (req, res) => {
    console.log('GET request for recipeController.getRecipes has fired');
    res.status(200).json(res.locals.data);
  });

  router.post('/recipes', recipeController.postRecipe, (req, res) => {
    console.log('POST request for recipeControler.postRecipe has fired');
    res.status(200).json(res.locals.data);
  })


//userController -> verifyUser, setSSIDcookie, start session
router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
  console.log("Post request for /login")
  res.sendStatus(200);
});


module.exports = router; 