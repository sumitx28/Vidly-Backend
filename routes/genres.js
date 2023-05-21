const router = require("express").Router();
const { Genre, validate } = require("../db/models/genres");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find({}).sort("name");
    return res.send(genres);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  if (req.params.id.length != 24) return res.status(404).send("Invalid ID");
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre)
      return res.status(404).send("Genre with the given ID not found...");

    return res.send(genre);
  } catch (err) {
    return res.status(404).send(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  if (req.params.id.length != 24) return res.status(404).send("Invalid ID");

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!genre)
    return res.status(404).send("Genre with the given ID not found...");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });

  try {
    const result = await genre.save();
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.params.id.length != 24) return res.status(404).send("Invalid ID");

  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre)
    return res.status(404).send("Genre with the given ID does not exist...");

  res.send(genre);
});

module.exports = router;
