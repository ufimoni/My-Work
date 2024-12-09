class CustomError extends Error{
    constructor(message, statusCode){
      super(message); // calling the constructor of the error base class
      this.statusCode = statusCode; // the value recieved for the statuscode error parameter. 
      // so the constructor takes two parameters 1. error message 2. status code
      // check if status ranges from 400 to 499
      this.status = statusCode >= 400 && statusCode < 500 ? 'fail': 'error';
      this.isOprational = true;
      Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = CustomError;   