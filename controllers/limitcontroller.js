/////////////////////////////////////////
/*
  
This code will filter out the fields and return the object in that format
based on the given fields in the URL.
  
 */

const { query } = require('express');
const  { param }  = require('../Route/moviesRoute');
const Movie = require('./../model/moviemodel');
const { unlock } = require('../app1');

exports.getAllmovies = async (req, res)=>{
  try{
console.log(req.query);
const { sort, fields, limit, page } = req.query;
// convert query into JSON format
let queryStr = JSON.stringify(req.query);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // for functionality
let queryObj = JSON.parse(queryStr)


// You Must delete the queryObj first before sorting
if(req.query.sort){
 delete queryObj.sort;
}
let query = Movie.find()
if(req.query.sort) {
    // to sort other query strings.
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy)  
    query = query.sort(sortBy);
 }else{
    query=query.sort('createdAt');
 }
 

///// LIMITING FIELDS


if(fields){
    delete queryObj.fields;
}
if (fields) { 
    const selectFields = fields.split(',').join(' '); 
    console.log('Selecting fields:', selectFields);
     query = query.select(selectFields); 
    
    
    } 

let movies = await query;

res.status(200).json({
    status: 'success',
    length: movies.length,
    data: {
        movies
    }

})

    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err.message
          })
    }
}; // end of getAllmovies
// get request by ID.
exports.getmovie = async (req, res) =>{
    try{
         const movie = await Movie.findById(req.params.id);
         res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        
        })
        }catch(err){
            res.status(400).json({
                status: 'fail',
                message: err.message
            })

        }


    }
// post request
exports.createMovie =  async(req, res) =>{
try{
    console.log(req.body);
    const movie = await Movie.create(req.body);
    res.status(201).json({
        status: 'sucess',
        data: {
            movie
        }
    })

}catch(err){
    res.status(400).json({
        status: 'fail',
        message: err.message
    })
}
}
// patch request
exports.updatemovie = async (req, res) =>{
        try{
   const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
   res.status(202).json({
    status: "success",
    data: {
       movie: updatedMovie
    }
   })  
        }
        catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
        }
    
    }
    // delete request
 exports.deletemovie = async (req, res) =>{
    
try{
   await Movie.findByIdAndDelete(req.params.id);
   res.status(201).json({
    status: "success",
    data: null
   })
}
catch(err){
    res.status(404).json({
        status: "fail",
        message: err.message
    })
}
}
