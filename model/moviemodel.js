const mongoose = require('mongoose');

// creating schemas. and setting up schemas
//unique says no name should be the same.
/// ADDING DATA INTO OUT DATABASE FROM EXPRESS.
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
const Movie = mongoose.model('Movie',movieschema); // here we design the model for the database.
// create movie and insert document into the database
//// please the Movie can be any name.
//// TESTING CONNECTION.

exports.module = Movie;