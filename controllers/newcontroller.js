///// USING THIS CONTROLLER FILE TO CONNECT TO THE DATABASE WITH EXPRESS.
const Movie = require('./../model/moviemodel');
// const Restau
// ROUTE HANDLERS.
// get request
exports.getAllmovies = async(req, res)=>{
  try{
    console.log(req.query);
    const movies = await Movie.find({duration: +req.query.duration, ratings: +req.query.ratings});

 res.status(200).json({
    status: 'success',
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

    }
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
