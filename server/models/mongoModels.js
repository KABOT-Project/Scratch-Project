const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fullUserDataSchema = new Schema({
    user_id: {type: Number, required: true, unique: true},
    responseObj: Object,
    reducedData: Array
});

const UserData = mongoose.model('UserData', fullUserDataSchema);

module.exports = {
    UserData
};