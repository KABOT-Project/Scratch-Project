const sessionController = {};
const db = require('../models/models');
// const session = require('express-session');

sessionController.isLoggedIn = (req, res, next) => {
    //check if user has a cookie with SSID 
    console.log(req.cookies);
    // console.log(req.cookies['SSID']);
    try {
        if (req.session.authentication = true) {
            next(); 
        } else {
            window.location.href = '/welcome'
        }
    }

    catch (error) {
            return next({
                log: error,
                status: 400,
                message: {error: 'Error occurred in sessionController.isLoggedIn middleware'}
            })
    }
    // if (req.cookies['ssid']){
    // //   //query session table 
    //     const queryCookie = 'SELECT user_id FROM session WHERE username = $1';
    //     const queryDatabase = ''
    //     const resultId = await db.query(queryId, value);
    //   Session.find({cookieId: req.cookies.ssid}, (err, data) => {
    //     if (data.length !== 0){
    //       return next();
    //     } else {
    //       res.redirect('/signup');
    //     }
    //   })
    // } else {
    //   res.redirect('/signup');
    // }
    // check whether there is an active session with their SSID 
    // if yes -> go to page; 
    // if no -> redirect to signup 
    console.log("end of isLoggedIn")
    return next();
  };
  
// sessionController.createSession = async (req, res, next) => {
//     await sessionConfig.store({ cookieId: res.locals.user_id });
//     console.log("session has been created");
//     return next();
// }

sessionController.startSession = (req, res, next) => {
  try{
    req.session.user_id = res.locals.user_id; 
    req.session.authentication = true; 
    console.log(req.session.user_id);
    console.log('startSession middleware hit');
    next();
  }
  catch (error) {
    return next({
        log: error,
        status: 400,
        message: {error: 'Error starting session.'}
    })
  }
}

module.exports = sessionController; 