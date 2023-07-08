const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');
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

//userController -> verifyUser, setSSIDcookie, start session
router.post('/login', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
  console.log("Post request for /login")
  res.sendStatus(200);
});


module.exports = router; 