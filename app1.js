//// Import the express package 
////// create an fs module

const express = require('express');
const morgan = require('morgan');
const movRoute = require('./Route/moviesRoute');


 // defining the app to the express.
let app = express(); 
//// Creating a router.  

// Creating a middleware 
const logger = function(req, res, next){
    console.log("Hello the Middleware function is called");
    next();
}
///// we use the count: variable,length and also use a middleware = app.use()
app.use(express.json());
app.use (logger);
app.use(morgan('dev'))
app.use(express.static('./public'))
// here we want to get the time if a request is made
app.use((req, res, next) =>{
    req.reqDate = new Date().toISOString();
    next();
})
    // uisng the routes
   app.use('/api/v1/movies',movRoute)
module.exports = app;