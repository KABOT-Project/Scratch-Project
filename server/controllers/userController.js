// const { decodeBase64 } = require('bcryptjs');
const db = require('../models/models'); 

const userController = {};

// import db from ../db (or wherever)
// Create user (use postgresql)

userController.createUser = async (req, res, next) => {
    try{
        const {username, password, first_name, last_name, email} = req.body; 
        const values = [username, password, first_name, last_name, email];
        const query = 'INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = await db.query(query, values); 
        return next();
    }
    catch (error) {
        return next({
            log: error,
            status: 400,
            message: {error: 'Error creating user.'}
        })
    }
};

// userController.createUser = (req, res, next) => {
//     // write code here
//     User.create(req.body, (err, user) => {
//       console.log(err);
//       if (err === null){
//         res.locals._id = user._id.toString();
//         return next();
//       } else {
//         return next(err);
//       }
//     });
//   };
  
module.exports = userController; 