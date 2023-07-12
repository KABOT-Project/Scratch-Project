// const { decodeBase64 } = require('bcryptjs');
// const pgPromise = require('pg-promise');
// const pgp = pgPromise();
const db = require('../models/models');
const userController = {};
const bcrypt = require('bcryptjs');
const connectPgSimple = require('connect-pg-simple');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

userController.createUser = async (req, res, next) => {
    try{
        const {username, password, first_name, last_name, email} = req.body;  
        
        const hashedPassword = bcrypt.hashSync(password, 10);
        //bcrypt to hash password
        const query = 'INSERT INTO users (username, password, first_name, last_name, email, provider) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id';
        const values = [username, hashedPassword, first_name, last_name, email, "App"];
        const result = await db.query(query, values); 
        const user_id = result.rows[0].user_id; 
        res.locals.user_id = user_id;
        res.locals.username = username; 
        // req.session.user_id = user_id; 
        // req.session.username = username; 
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
        return next();
    }
    else {
        return next({
         status: 401, message: "Authentication failed."
        })
    };
}

userController.googDb = async (req, res, next) => {
    try{
        const { email, given_name, family_name, sub } = req.body.decodedToken;
        console.log(req.body.decodedToken);
        const query = "SELECT user_id FROM users WHERE email = $1 AND provider = $2 AND first_name = $3 AND last_name = $4";
        const emailArray = [email, "GoogleOAuth", given_name, family_name];
        const userIdQuery = await db.query(query, emailArray);
        console.log(userIdQuery.rows.length);
        
        if (userIdQuery.rows.length === 0){
            //create account in the database
            //THIS NEEDS TO BE CHANGED IN THE FUTURE; password should be NULL - need to alter database so that password space can be null. 
            const emailValues = [sub, null, given_name, family_name, email, "GoogleOAuth"];
            const queryCreate = "INSERT INTO users (username, password, first_name, last_name, email, provider) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id";
            const createUser = await db.query(queryCreate, emailValues);
            console.log(createUser);
            res.locals.user_id = createUser; 
            console.log("A user has been created through Google Oauth.");
            next(); 
        } else {
            //grab user_id based on email
            res.locals.user_id = userIdQuery;
            console.log("A user has been authenticated through Google Oauth.");  
            next();
        }
    }

    catch (error) {
        return next({
            log: error,
            status: 400,
            message: {error: 'Error googDb.'}
        })
    }
}   

//Google oauth
// const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     'postmessage',
//   );

// userController.googleLogin = async (req, res, next) => {
    
// }
module.exports = userController; 