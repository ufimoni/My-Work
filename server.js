const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

// this is always below.
const app = require('./app1');



//// CONNECTING MONGODB
mongoose.connect(process.env.conn_str, {
// useNewUrlParser: true. this is used for older versions of nodejs.
}).then((conn) =>{
    //console.log(conn);
    console.log("Database Connected Successfully..");
}).catch((error) =>{
console.log("Error has Occured")
})

/// THIS CODE SHOWS HOW WE ADD DATA AND INSERT DATA FROM EXPRESS INTO OUR DATABASE.

// creating schemas. and setting up schemas
//unique says no name should be the same.
const movieschema = new mongoose.Schema({
    name: {      
        // name must never be two. and it is required
     type:  String,
     required: [true, 'The Name field is required'],
     unique: true
    },
    description: String,
    duration: {
        type: Number,
            required: [true,'Duration feild is required']
    },
    ratings: {
        type: Number,
        required: [true,'Ratings feild is required'],
        default: 1.0
    }
});
const movie = mongoose.model('Movie',movieschema); // here we design the model for the database.
// create movie and insert document into the database
const testMovie = new movie({
    name: "King Kong 4",
    description: "Action packed Movie with Jack Black in this Summer movie",
    duration: 140,
    rating: 5.5
});
// this is to save the movie
testMovie.save()
//// TESTING CONNECTION.
.then(doc =>{
    console.log('Uploaded Sucessful');
console.log(doc)
}).catch(err =>{ 
    console.log("Error Occured :"+err);
})

// starting server
const PORT = process.env.PORT || 4000;
//console.log(app.get('env'))
console.log(process.env)
app.listen(PORT, ()=>{
    console.log("Running on port: 4000");
})
