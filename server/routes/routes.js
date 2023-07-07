const express = require('express');
const path = require('path');
const userController = require('../controllers/userController')

// const cookieController = require('../controllers/cookieController');
// const userController = require('../controllers/userController');
// const goalController = require('../controllers/goalController');

const router = express.Router();

// Signup route
router.post('/signup', userController.createUser,(req, res) => {
    // what should happen here on successful sign up?
    console.log("Post request for /signup")
    res.sendStatus(200);
  });


module.exports = router; 