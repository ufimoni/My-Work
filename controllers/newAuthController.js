const User = require('./../model/userModel') // import the User model
const jwt = require('jsonwebtoken')
const asyncErrorHandler = require('./../utils/asyncErrorHandler')
const CustomError = require('./../utils/CustomError')


// creating a post signup function
/// creatiing a user adding asyncErrorHandler func.
exports.signup = asyncErrorHandler ( async (req, res, next)=>{
//// creating a new user
const newUser = await User.create(req.body);
/// the token will carry 3 params.
const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR,{
  expiresIn:  process.env.Login_Expires // for the expiring time
})
console.log(req.body)
res.status(201).json({
    status: 'sucess',
    token,
    data: {
        user: newUser
    }
})
    
});

/// for login
exports.login = asyncErrorHandler ( async (req, res, next)=>{
const email = req.body.email;
const password = req.body.password;
// using destructuring syntax
// const {email, password} = req.body
//// return error the token is incorrect
if(!email || !password){
const error = new CustomError('Please Enter the Email ID and Password again to Login!', 400) // require from utils
return next(error);


}

//// checking if the user exist with given email
const user = await User.findOne({email: email}).select('+password');

const Ismatch = await user.comparetwoPassword(password, user.password) // compare both database password and user's password
 
///// checks if user and password matches
if(!user || !Ismatch){
const error = new CustomError('Please enter the password and email correctly ',400);
return next(error);
}


res.status(200).json({
    status: 'sucess',
    token: " ",
    user

})

})

