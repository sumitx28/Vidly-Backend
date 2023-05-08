const mongoose = require('../db').mongoose;
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(genre);
}

module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
