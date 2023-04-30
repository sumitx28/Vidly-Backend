const mongoose = require('mongoose');
require('dotenv').config();

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

function connect() {
  return mongoose.connect(CONNECTION_URL);
}

module.exports.mongoose = mongoose;
module.exports.connect = connect;
