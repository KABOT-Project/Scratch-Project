const { Pool } = require('pg');

const PG_URI = 'postgres://bwkdjkqj:Mc0GUvXKF9M5wNiMDUYKyHvQoDojVdYZ@lallah.db.elephantsql.com/bwkdjkqj';

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// const userSchema = new Schema({
//   username: {type: String, required: true, unique: true},
//   password: {type: String, required: true}
// });

// userSchema.pre('save', function(next){
//   bcrypt.hash(this['password'], SALT_WORK_FACTOR, (err, hash) => {
//     console.log(this['password']);
//     this['password'] = hash; 
//     console.log(hash);
//     next();
//   });
// })


// module.exports = mongoose.model('User', userSchema);

//change for postgresql
