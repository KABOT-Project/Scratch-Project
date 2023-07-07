const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Hint: Why is bcrypt required here?
*/
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.pre('save', function(next){
  bcrypt.hash(this['password'], SALT_WORK_FACTOR, (err, hash) => {
    console.log(this['password']);
    this['password'] = hash; 
    console.log(hash);
    next();
  });
})


module.exports = mongoose.model('User', userSchema);

//change for postgresql