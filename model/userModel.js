///// Creating a user Model
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const { validate } = require('./moviemodel');


/// name, email, password, confirmPassword, photo
const userSchema = new mongoose.Schema({
    // starts with the name
    name: {
        type: String,
        required: [true, 'Please Enter the user name']
    },
    email: {
        type: String,
        required: [true,'Please Enter the Email Again'],
        lowercase: true,
        validate: [validator.isEmail, 'Please Enter a Valid Email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please Enter Password which is mixed of different characters'],
        minlength: 8,
        select: false

    },
    confirmPassword: {
        type: String,
        required: [true, 'Please Confirm Password'],
        validate: {
        validator: function(val){
            return val == this.password;  // validating the password.
        },
        message: 'Password and Confirm password does not match!'


        }

    }

})


userSchema.pre('save', async function(next){
if(!this.isModified('password'))
    return next();

//// encrypting the password
this.password = await bcrypt.hash(this.password, 11); // assign it to the password
this.confirmPassword = undefined; //// not to save the confirm password and it's value in the database

next()
})
///// Using a method to handle the two password one from the user and other from the db
userSchema.methods.comparetwoPassword = async function (pswd, pswdDB){
///// return the compare function to check them
return await bcrypt.compare(pswd, pswdDB);

}

const User = mongoose.model('User',userSchema);

module.exports = User;