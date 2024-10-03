//// Import the express package 
////// create an fs module
const fs = require('fs');
const express = require('express');
let app = express();                    // defining the app to the express.

//// Creating a router.  
///// Router = Url + http method
var movies = JSON.parse(fs.readFileSync('./data/movies.json'));

// call the movie variable inside the get method.
/// to know how many movies length we have in the database for now we use the Json since it is like a database 
///// we use the count: variable,length and also use a middleware = app.use()
app.use(express.json());

// to keep all Route Handler function in one place.
const getAllmovies = (req, res)=>{
    res.status(200).json({
        status: "success",   
        data: {
            count: movies.length,
            newmovie : movies
        }
    });
    }

const getmovie = (req, res) =>{
    //console.log(req.params);
    // CONVERT ID FROM STRING TO NUMBER OR INTERGER
    const id = req.params.id * 1;
    // find Movie based on id params.the find() will through the elit.
    let movie = movies.find(elit => elit.id===id)  // the short method of movies.find((elit) => { return elit.id ====  id})
    //to check if it exists in this server
    if(!movie){
        return res.status(404).json({    // we have to avoid the looping so we send a return res.
             status: "fail",
             message : "The ID: " +id+ "is not found on this server"
         })
     }; 
    
    // send movie in response
    
    res.status(200).json({   // using the jsens json methos
    status : "success",
    data : {
        nmovie : movie 
    }
    
    });
    }

const createMovie = (req, res) =>{
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

const updatemovie =  (req, res) =>{
    let id = req.params.id * 1; // here we convert the route parameter to integer and store it inside the id variable
    let movieToUpdate = movies.find(elit => elit.id === id) // here use find method to find the id in movies array and comapre it with route parameter
                                                             // and it is stored to movieToUpdate
    if(!movieToUpdate){
        return res.status(404).json({
            status: "fail",
            message: "Sorry There is no ID " +id+ ' found on this server'
        })
    }
    
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
 const deletemovie = (req, res) =>{
    const id = req.params.id * 1;
    const movieToDelete = movies.find(elit => elit.id === id);  // if no if statement it will return undefine and crash it
   if(!movieToDelete){
    return res.status(404).json({
        status: 'fail',
        message: 'Sorry there is no movie object: ' + id + ' found on this server'
    })
   }
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











//app.get('/api/v1/movies', getAllmovies);
/// 2vrcqjbpex4gxc7
//// HERE WE WANT TO GET THE ROUTE PARAMETERS AND WE WILL GET A DOCUMENT OR A PARTICULAR MOVIE BASED ON THE ID FROM THE API. OR 
///// Get api/v1/movies/id

//app.get('/api/v1/movies/:id', getmovie);
/////// HERE WE WANT TO USE PATCH HTTP REQUEST RESPONSE METHOD.
//// :id is a route pararmeter

//app.patch('/api/v1/movies/:id', updatemovie)
// Using the post request. or post method where we will add data as client into the server.
/// we are using a call back function and setting a new id and the data we got from the client into our database
/// we will convert the js objects into json object.

//app.post('/api/v1/movies', createmovie)
///// Using the Delete Request

//app.delete('/api/v1/movies/:id', deletemovie)

// in this code no semicolon at the end end of the line 
app.route('/api/v1/movies')
    .get(getAllmovies)
    .post(createMovie)

app.route('/api/v1/movies/:id')
   .get(getmovie)
   .patch(updatemovie)
   .delete(deletemovie)
///  Creating and Launching Server
const port = 4000;
app.listen(port, ()=>{
    console.log("Running on port: 4000");
})