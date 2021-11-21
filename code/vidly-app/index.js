const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let genres = [
  { id: 1, name: 'action' },
  { id: 2, name: 'horror' },
  { id: 3, name: 'mystery' },
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found with requested ID');

  res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);

  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('Genre not found with requested ID');

  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  genre.name = req.body.name;

  res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
