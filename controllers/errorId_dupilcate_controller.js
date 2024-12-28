//////// ERROR CONTROLLERS TO TEST ID AND OTHER ERRORS
const CustomError = require('./../utils/CustomError');
// to handle development and production errors.
// the error means we are returning the error occured.
const devErrors = (res, error) =>{
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
} // it is recieving the error object.

const castErrorHandler = (err)=>{
    const msg = `Invalid value for ${err.path}: ${err.value}!`;
    return new CustomError(msg, 400);
}

const duplicateKeyErrorHandler = (err)=>{
   const name = err.keyValue.name;
   const msg = `There already exist a movie with: ${name} on the server `;
   return new CustomError(msg, 400)
}

const prodError = (res, error)=>{
    if(error.isOperational){
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    }
  
    else{
        res.status(500).json({
        status: 'error',
        message: "Oops something went wrong please try again later"
        })
    }

}

module.exports = (error,req, res,next)=>{
    error.statusCode = error.statusCode || 500; // returns the defined statuscode based on the defined error
   error.status = error.status || 'error';
   if(process.env.NODE_ENV === 'development'){
    devErrors(res, error);
   }
   else if(process.env.NODE_ENV === 'production'){
    //let err = {...error};
    if(error.status === 'CastError' || error.kind === 'ObjectId') {
      error = castErrorHandler(error);
    }
   else if(error.code === 11000){
     error = duplicateKeyErrorHandler(error);
   }
    
   // should be in the same line.
      
    
    prodError(res, error);
   }
  };