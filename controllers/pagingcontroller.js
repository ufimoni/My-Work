
const { query } = require('express');
const  { param }  = require('../Route/moviesRoute');
const Movie = require('./../model/moviemodel');
const { unlock } = require('../app1');

exports.getAllmovies = async (req, res)=>{
  try{
console.log(req.query);
//// to limit the feilds that is sorting only the query strings in the feilds 
const { sort, fields, limit, page } = req.query; // uncomment if commented else do reverse
// convert query into JSON format
let queryStr = JSON.stringify(req.query);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // for functionality
let queryObj = JSON.parse(queryStr)


// You Must delete the queryObj first before sorting
if(req.query.sort){
 delete queryObj.sort;
}
let query = Movie.find()  // to limit remove anything inside function
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
    else {
  query = query.select('-__v');

    }
 ////PAGINATION.....
 
    npage = page*1 || 1;
    nlimit = limit*1 || 10; // specify the default value to be 10
    const skip = (npage-1)*limit;
    query = query.skip(skip).limit(nlimit)
    // to handle the page limit.
    if(page){
       const moviecount = await Movie.countDocuments(); // add await() here
       if(skip > moviecount){
           throw new Error("Page Not Found");
       }
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
