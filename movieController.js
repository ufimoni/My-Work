// Here we are to export all route Handlers or functions.
const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));
// this is to display the ID in the CLI along with the middleware.
exports.checkID = ( req, res, next, value) =>{
    console.log("Movie ID :" +value);
    let movie = movies.find(elo => elo.id ===value *1);   // change id to value

    if(!movie){
        return res.status(404).json({
            status : "fail",
            message: "Movie with ID :"+value+ ' not found'
        })

    }

next();
}

// to check if there is a code in the body.
exports.validbody = (req, res, next) =>{
    if(!req.body.name || !req.body.type){
       return res.status(400).json({
        status : 'fail',
        message: 'Not a valid movie data'
       });
    }
    next();
}



// creating routers
/// to know how many movies length we have in the database for now we use the Json since it is like a database 
///// Router = Url + http methods
// ROUTE HANDLERS.
// get request
exports.getAllmovies = (req, res)=>{
    res.status(200).json({
        status: "success",   
        requestDate : req.reqDate,
        data: {
            count: movies.length,
            newmovie : movies
        }
    });
    }
// get request by ID.
exports.getmovie = (req, res) =>{
    //console.log(req.params);
    // CONVERT ID FROM STRING TO NUMBER OR INTERGER
    const id = req.params.id * 1;
    // find Movie based on id params.the find() will through the elit.
     // the short method of movies.find((elit) => { return elit.id ====  id})
    //to check if it exists in this server
    let movie = movies.find(elo => elo.id ===id);

    //if(!movie){
      //  return res.status(404).json({
        //    status : "fail",
          //  message: "Movie with ID :"+id+ ' not found'
       // })

    //}

//next();
//}
    
    // send movie in response
    
    res.status(200).json({   // using the jsens json methos
    status : "success",
    data : {
        nmovie : movie 
    }
    
    });
    }
// post request
exports.createMovie = (req, res) =>{
    //console.log(req.body);
    const newId = movies[movies.length-1].id + 1;
    const newmovies = Object.assign({id: newId}, req.body);

    movies.push(newmovies); // add it to the database
    // we want to avoid a break in event loop.
    fs.writeFile('./data/movies.json',JSON.stringify(movies), (err) =>{
        res.status(201).json({
            status: "success",
            data: {
                movies : newmovies
            } 
        })
    })
    
  //res.send("Created Successfully..");
}
// patch request
exports.updatemovie =  (req, res) =>{
    let id = req.params.id * 1; // here we convert the route parameter to integer and store it inside the id variable
    let movieToUpdate = movies.find(elit => elit.id === id) // here use find method to find the id in movies array and comapre it with route parameter
                                                             // and it is stored to movieToUpdate
   // if(!movieToUpdate){
     //   return res.status(404).json({
          //  status: "fail",
         //   message: "Sorry There is no ID " +id+ ' found on this server'
      //  })
  //  }
    
    let index = movies.indexOf(movieToUpdate)   // we find the index of movieToUpdate in the array and store it in the index variable
                                                // e.g id = 500 index = 501.
    Object.assign(movieToUpdate, req.body)      
    movies[index] = movieToUpdate  // checking if the index of both are the same. or making them the same
    // to response if the url not found.
    
    fs.writeFile('./data/movies.json',JSON.stringify(movies), (err)=>{
        res.status(200).json({
            status: "success",
            data:{
                movie: movieToUpdate
            }
        })
    })                               
    
    }
    // delete request
 exports.deletemovie = (req, res) =>{
    const id = req.params.id * 1;
    const movieToDelete = movies.find(elit => elit.id === id);  // if no if statement it will return undefine and crash it
  // if(!movieToDelete){
   // return res.status(404).json({
      //  status: 'fail',
      //  message: 'Sorry there is no movie object: ' + id + ' found on this server'
   // })
  // }
    const index = movies.indexOf(movieToDelete);
    movies.splice(index, 1) /// we delete an movie from the array.
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) =>{
        res.status(204).json({
            status: "success",
            data : {
                movie: null
            }
        })
    })

}
