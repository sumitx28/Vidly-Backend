const router = require('express').Router();
const Joi = require('joi');

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];

router.get('/genres', (req, res) => {
  res.send(genres);
});

router.get('/genres/:id', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = genres.find((g) => g.id == req.params.id);
  if (!genre) return res.status(404).send('Genre not found');

  res.send(genre);
});

router.put('/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id == req.params.id);
  if (!genre) return res.status(404).send('Genre not found');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

router.post('/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);

  res.send(genre);
});

router.delete('/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id == req.params.id);

  if (!genre) return res.status(404).send('Genre not found');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

module.exports = router;