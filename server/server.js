const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const PORT = 3000;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(cookieParser());

const mongoURI = 'mongodb+srv://thomaskpappas:1a0ZIDIO5ZNfDM3H@scratch-project.d18n579.mongodb.net/';

// mongoose.connect(mongoURI, err => {
//   if (err) {
//     console.error('MongoDB connection error:', err);
//   } else {
//     console.log('Connected to MongoDB Atlas');
//   }
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
  store: new (require('connect-pg-simple')(session))({
    conString: 'postgres://bwkdjkqj:Mc0GUvXKF9M5wNiMDUYKyHvQoDojVdYZ@lallah.db.elephantsql.com/bwkdjkqj'
  }),
  secret: 'secret',
  saveUnitialized: false,
  resave: false,  
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  user_id: "",
  authentication,
}

app.use(session(sessionConfig))

//Google oauth
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

//google oauth; after the post request, the user then receives an access_taken (talk with google APIs), refresh token, and id_token (JWT contains all user's info)
app.post('/auth/google', async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);
  res.json(tokens);
});

app.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    clientId,
    clientSecret,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})

// serve static pages
app.use('/client', express.static(path.resolve(__dirname, '../client')));

// use all routes in routes folder
app.use('/api', router);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('404 page not found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });

module.exports = app;