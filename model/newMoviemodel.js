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
        default: Date.now(),
        select: false
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
    },
    createdBy: String

},
{
    toJSON :{virtuals: true},
    toObject :{virtuals: true}

});
/////// VIRTUAL PROPERTIES.

//// dont use arrow function use the normal function
movieSchema.virtual('durationInHours').get(function(){
    return this.duration / 60;
})

///DOCUMENT MIDDLEWARE.
/// Executed before documents is saved in database

movieSchema.pre('save',function(next){
this.createdBy = 'Bertcode.py'/// to display the document created and save it.
next();
})
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
