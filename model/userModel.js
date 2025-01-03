const mongoose = require('mongoose')
const validator = require('validator'); //// Install validator with npm i validator

const {validate} = require('./moviemodel') //// can be ('./RestauModel') or ('./anyProducts-Model')

////// Creating Schema for the database
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter your user name']
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        lowercase: true,
        validate: [validator.isEmail,'Please Enter a Valid Email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please Enter a Valid password'],
        minlength: 8
    },
    confirmpassword: {
        type: String,
        required: [true, 'Please Confirm Password'],
        minlength: 8
    }
})
/// send it to the database
const User = mongoose.model('User', UserSchema) //// the one in "User" will be added into the database


module.exports = User;