const sessionController = {};

const sessionConfig = require('../server.js');

sessionController.isLoggedIn = (req, res, next) => {
    // write code here
    //check if user has a cookie with SSID 
    console.log(req.cookies['ssid']);
    console.log("hello");
    // if (req.cookies['ssid']){
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
    //check whether there is an active session with their SSID 
    //if yes -> go to page; 
    //if no -> redirect to signup 
    next();
  };
  
// sessionController.createSession = async (req, res, next) => {
//     await sessionConfig.store({ cookieId: res.locals.user_id });
//     console.log("session has been created");
//     return next();
// }

module.exports = sessionController; 