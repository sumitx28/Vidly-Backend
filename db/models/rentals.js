const mongoose = require('../db').mongoose;
const { customerSchema } = require('./customers');
const { movieSchema } = require('./movies');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: movieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectid().required(),
    movieId: Joi.objectid().required(),
  });

  return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
