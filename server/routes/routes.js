const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController')
const axios = require('axios');
const cors = require('cors')
require('dotenv').config()


const router = express.Router();
router.use(cors());

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

//google auth handler

// router.post('/tokensignin', (req, res) => {
//   const {OAuth2Client} = require('google-auth-library');
//   const client = new OAuth2Client(CLIENT_ID);
//   async function verify() {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     const payload = ticket.getPayload();
//     const userid = payload['sub'];
//     // If request specified a G Suite domain:
//     // const domain = payload['hd'];
//     res.sendStatus(200)
//   }
//   verify().catch(console.error);
// })
// http://localhost:3000/auth-receiver
//gibhub oauth route handlers (does not working because of cors related issues on github's side)
// router.get('/auth', (req, res) => {
//   console.log("router /auth hit");
//   // const clientId = process.env.CLIENT_ID; 
//   // const redirectUri = `http://localhost:3000/api/oauth/github/callback`;
//   // const scope = `read:user`;
//   // const authUrl = 'https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}';
//   // res.redirect(authUrl);
//   const params = {
//     //refers to a string that specifies the amount of access an OAuth app has to a user's info
//     scope: "read:user",
//     client_id: process.env.CLIENT_ID
//   };
//     //convert parameters to a URL-encoded string 
//     const urlEncodedParams = new URLSearchParams(params).toString();
//     res.redirect(`https://github.com/login/oauth/authorize?${urlEncodedParams}`)
//   });

// router.get("/oauth/github/callback", (req, res) => {
//   console.log("router /oauth/github/callback hit");
//   const { code } = req.query; 

//   const body = {
//     client_id: process.env.CLIENT_ID, 
//     client_secret: process.env.CLIENT_SECRET,
//     code, 
//   };

//   let accessToken;
//   const options = {headers: {accept: "application/json"}};

//   axios
//     .post("https://github.com/login/oauth/access_token", body, options)
//     .then((response) => response.data.access_token)
//     .then((token) => {
//       accessToken = token;
//       res.redirect(`/?token=${token}`);
//     })
//     .catch((err) => res.status(500).json({ err: err.message }));
// });

module.exports = router; 