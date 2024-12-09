module.exports = (error,req, res,next)=>{
    error.statusCode = error.statusCode || 500; // returns the defined statuscode based on the defined error
    error.status = error.status || 'error' // this message will display the given specific error from defined like 404,400,500, and other
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })

  };