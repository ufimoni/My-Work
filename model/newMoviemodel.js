const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The Name field is required'],
        unique: true,
        trim: true
    },
    description:{
        type: String,
        required: [true, 'The description feild field is required'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration field is required']
    },
    ratings: {
        type: Number,
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release Year Required ']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    genres: {
        type: [String],
        required: [true,'Genres is required']
    },
    directors: {
        type: [String],
        required: [true, 'Directors Feild Required']
    },
    coverImages: {
        type: String,
        required: [true, 'cover Image Required']
    },
    actors: {
        type: [String],
        required: [true, 'actors field Required']
    },
    price: {
        type: Number,
        required: [true, 'price Feild Requird']
    }

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
