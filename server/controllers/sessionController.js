const sessionController = {};

const sessionConfig = require('../server.js');

// sessionController.createSession = async (req, res, next) => {
//     await sessionConfig.store({ cookieId: res.locals.user_id });
//     console.log("session has been created");
//     return next();
// }

module.exports = sessionController; 