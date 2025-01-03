const User = require('./model/userModel')
const asyncErrorHandler = require('./../utils/asyncErrorHandler') /// make sure the require the async errorhandler

///// the signup is a post request since it is a function
exports.signup = asyncErrorHandler ( async (req, res, next) =>{
const newUser = await User.create(req.body)
res.status(201).json({
    status: 'Success',
    data: {
        user: newUser
    }
})


}

)