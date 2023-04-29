const mongoose = require('mongoose');
const CONNECTION_URL = 'mongodb://localhost:27017/vidly';
function connect() {
  return mongoose.connect(CONNECTION_URL);
}

module.exports.mongoose = mongoose;
module.exports.connect = connect;
