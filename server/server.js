const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const router = require('./routes/routes');

const PORT = 3000;

const app = express();

const mongoURI = 'mongodb+srv://thomaskpappas:1a0ZIDIO5ZNfDM3H@scratch-project.d18n579.mongodb.net/';

mongoose.connect(mongoURI, err => {
  if (err) {
    console.error('MongoDB connection error:', err);
  } else {
    console.log('Connected to MongoDB Atlas');
  }
});

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
  user_id: ""
}
 
app.use(session(sessionConfig))
// setup session functionality 
// app.use(
//   session({
//     secret: 'tkpaps', 
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: mongoURI, 
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24, 
//     },
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
//   next();
// });

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