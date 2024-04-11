const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userType: { type: String, enum: ['patient', 'nurse'] }
})

const UserModel = mongoose.model('users',UserSchema )
module.exports = UserModel;