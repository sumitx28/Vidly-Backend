const mongoose = require('../db').mongoose;
const { genreSchema } = require('./genres');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 50,
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });

  return schema.validate(movie);
}

module.exports.validateMovie = validateMovie;
module.exports.Movie = Movie;
