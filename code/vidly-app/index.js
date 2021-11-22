const config = require('config');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const authenticator = require('./authenticator');
const express = require('express');
const app = express();

//two ways to check current environment
// console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//built in middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //allows for form value submission in key/val pairs
app.use(express.static('public'));

//configuration
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server Name: ${config.get('mail.host')}`);
console.log(`Mail Server Password: ${config.get('mail.password')}`);

//third party middleware
app.use(helmet());

//enable only in development
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

//custom middleware functions
app.use(logger);
app.use(authenticator);

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
