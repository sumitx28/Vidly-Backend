const router = require('express').Router();
const Joi = require('joi');
const Genre = require('../db/models/genres');

router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find({}).sort('name');
    res.send(genres);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    return res.send(genre);
  } catch (err) {
    return res.status(404).send(err);
  }
});

router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!genre) return res.status(404).send('Genre not found');

  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
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

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) return res.status(404).send('Genre not found');

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
