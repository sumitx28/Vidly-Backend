const express = require("express");
const bodyParser = require("body-parser");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const db = require("./db/db");
const app = express();

const PORT = process.env.PORT || 3000;

db.connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => `Failed to connect to MongoDB. Error: ${err}"`);

app.use(bodyParser.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log(`App listening on : http://localhost:${PORT}`);
});
