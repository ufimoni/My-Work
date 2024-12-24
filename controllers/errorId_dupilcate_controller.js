//// import the custom error class
////// These code is usd to handle error ID  and duplicate keys with express and mongoose.
const CustomError = require('./../utils/CustomError');


// test the devErroes  
//// first function
const devErrors = (res, error)=>{
   res.status(error.statusCode).json({
      staus: error.statusCode,
      message: error.message,
      stackTrace: error.stack,
      error: error
     });
}
//// second function
const castErrorHandler = (err)=>{
 const  msg = `Invalid value for ${err.path}: ${err.value}`;
  return new CustomError(msg, 400);  // return this and use it in another function
}
const duplicateKeyHandler = (err)=>{
 // assign the name inputed in the server in to the name variable object
 const name = err.keyValue ? err.keyValue.name : 'unknown field';
   const msg = `There exist a movie with this name: ${name} in the server`;
   return new CustomError(msg, 400);

}

const prodErrors = (res, error)=>{
   if(error.isOperational){
      res.status(error.statusCode).json({
         staus: error.statusCode,
         message: error.message
        });
   }
   else{
      res.status(500).json({
         status: 500,
         message: 'Oops something went wrong, please try again later'
      })
   }
   }

//// Error Middleware to test for both development and production.
module.exports = (error, req, res, next)=>{
error.statusCode = error.statusCode || 500;
error.status = error.status || 500;
error.isOperational = error.isOperational !== undefined ? error.isOperational : true;
if(process.env.NODE_ENV==='development'){
   devErrors(res, error);
}
else if(process.env.NODE_ENV === 'production'){
   
    let new_error = { ...error, name: error.name, message: error.message, stack: error.stack, path: error.path, value: error.value }


   if(error.name === 'CastError') new_error = castErrorHandler(error)

   if(error.code === '11000') new_error = duplicateKeyHandler(error);

   prodErrors(res, new_error);
}

}