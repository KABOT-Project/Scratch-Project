

// const { decodeBase64 } = require('bcryptjs');
// const pgPromise = require('pg-promise');
// const pgp = pgPromise();
const db = require('../models/models');
const userController = {};

const bcrypt = require('bcryptjs');

// import db from ../db (or wherever)
// Create user (use postgresql)

userController.createUser = async (req, res, next) => {
    try{
        const {username, password, first_name, last_name, email} = req.body;  
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        //bcrypt to hash password
        const query = 'INSERT INTO users (username, password, first_name, last_name, email) VALUES ($1, $2, $3, $4, $5) RETURNING user_id';
        const values = [username, hashedPassword, first_name, last_name, email];
        const result = await db.query(query, values); 
        const user_id = result.rows[0].user_id; 
        res.locals.user_id = user_id;
        req.session.user_id = user_id; 
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

userController.verifyUser = async (req, res, next) => {
    //obtain username and password from req body
    const {username, password} = req.body; 
    const query = "SELECT password FROM users WHERE username = $1";
    const value = [username];
    const result = await db.query(query, value);

    if (result.rows.length === 0) {
        //user is not found
        return next({
            status: 401, 
            message: "Authentication failed."
        })
    };

    const hashedPassword = result.rows[0].password; 
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (passwordsMatch){
        const queryId = 'SELECT user_id FROM users WHERE username = $1';
        const resultId = await db.query(queryId, value);
        const user_id = resultId.rows[0].user_id; 
        res.locals.user_id = user_id;
        req.session.user_id = user_id; 
        return next();
    }
    else {
        return next({
         status: 401, message: "Authentication failed."
        })
    };
}

module.exports = userController; 