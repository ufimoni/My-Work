const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The Name field is required'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration field is required']
    },
    ratings: {
        type: Number,
        required: [true, 'Ratings field is required'],
        default: 1.0
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
