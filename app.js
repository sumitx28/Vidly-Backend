const express = require('express');
const bodyParser = require('body-parser');
const genres = require('./routes/genres');
const db = require('./db/db');
const app = express();

const PORT = process.env.PORT || 3000;

db.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => `Failed to connect to MongoDB. Error: ${err}"`);

app.use(bodyParser.json());
app.use('/api/genres', genres);

app.listen(PORT, () => {
  console.log(`App listening on : http://localhost:${PORT}`);
});
