const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

module.exports = mongoose.model('User', userSchema);