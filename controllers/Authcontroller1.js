/* 
this file is for all authentication and how the logic are been handled.

every authentication and security takes place here
*/
const User = require('./../model/userModel') // import the User model
const jwt = require('jsonwebtoken')
const asyncErrorHandler = require('./../utils/asyncErrorHandler')
const CustomError = require('./../utils/CustomError')
const util = require('util');
/// Creating a Reusable function for the token. or reuse token
const signToken = id =>{
    return jwt.sign({id}, process.env.SECRET_STR,{
        expiresIn:  process.env.Login_Expires // for the expiring time
      })
}



// creating a post signup function
/// creatiing a user adding asyncErrorHandler func.
exports.signup = asyncErrorHandler ( async (req, res, next)=>{
//// creating a new user
const _newUser = await User.create(req.body);
const token = signToken(_newUser._id)
console.log(req.body)
res.status(201).json({
    status: 'sucess',
    token,
    data: {
        user: _newUser
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

// const Ismatch = await user.comparetwoPassword(password, user.password) // compare both database password and user's password
//// should incase the findOne returns an empty strings in some scenarios
///// checks if user and password matches
if(!user || !(await user.comparetwoPassword(password, user.password))){
const error = new CustomError('Please enter the password and email correctly ',400);
return next(error);
}

const token = signToken(user._id)
res.status(200).json({
    status: 'sucess',
    token: token,
    user
  

})

})

////// Putting Security.

exports.protect = asyncErrorHandler(async (req, res, next)=>{
    // 1.  Read the token and check it if it exists
    // / check the authorization and read it's value in which it returns an array
    const testToken = req.headers.authorization
  var token;
    if(testToken && testToken.startsWith('bearer')){
    token = testToken.split(' ')[1];
    console.log(token);
    next();
    }
   else if(!token){
    next(new CustomError('You have been unable to logged in', 401))
   }
   else{
    next(new CustomError('You are not allowed to this resource try again', 401))
   }
   // 2. Validate the token
    //// here we will check the token
/* the main code here is the jwt.verify(token, secrete_String) this is how we validate the token
promisify converts it into a promise
    */
   const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);
  console.log(decodedToken);

})


