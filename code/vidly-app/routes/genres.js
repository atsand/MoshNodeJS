const express = require('express');
const router = express.Router();

let genres = [
  { id: 1, name: 'action' },
  { id: 2, name: 'horror' },
  { id: 3, name: 'mystery' },
];

router.get('/', (req, res) => {
  res.send(genres);
});

router.get('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found with requested ID');

  res.send(genre);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);

  res.send(genre);
});

router.put('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found with requested ID');

  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

router.delete('/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found with requested ID');

  const index = genres.findIndex((g) => g.id === parseInt(req.params.id));
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
