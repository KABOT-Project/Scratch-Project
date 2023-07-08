const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  res.cookie('ssid', res.locals.user_id, { httpOnly: true } );
  console.log("SSID cookie set.")
  return next();
}
//Inside of `cookieController.setSSIDCookie`, create a cookie named 'ssid' with a value that is equal to the id of the user (mongoose creates an id for each user - you will need to implement a method to get the id of the user)

module.exports = cookieController;