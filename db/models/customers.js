const mongoose = require('../db').mongoose;
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 12,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required(),
    isGold: Joi.boolean().required(),
    phone: Joi.string().min(10).max(12),
  });

  return schema.validate(customer);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
