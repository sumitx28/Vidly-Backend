const router = require('express').Router();
const { Movie, validateMovie } = require('../db/models/movies');
const { Genre } = require('../db/models/genres');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genre);
  if (!genre) return res.status(400).send('Invalid Genre');

  let movie = new Movie({
    ...req.body,
    genre: { _id: genre._id, name: genre.name },
  });

  movie = await movie.save();

  res.send(movie);
});

router.put('/:id', async (req, res) => {
  if (req.params.id.length != 24) return res.status(400).send('Invalid Id');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  if (req.params.id.length != 24) return res.status(400).send('Invalid Id');

  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  if (req.params.id.length != 24) return res.status(400).send('Invalid Id');

  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;