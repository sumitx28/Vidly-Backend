const express = require('express');
const bodyParser = require('body-parser');
const genres = require('./api/genre');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', genres);

app.listen(PORT, () => {
  console.log(`App listening on : http://localhost:${PORT}`);
});
