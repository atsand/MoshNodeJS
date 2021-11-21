const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'course1',
  },
  {
    id: 2,
    name: 'course2',
  },
];

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

//post request
app.post('/api/courses', (req, res) => {
  //create Joi schema to validate request body object
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  //bad request if no name
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//send a parameter
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send('The course with the given ID was not found');
  res.send(course);
});

//send multiple parameters
app.get('/api/posts/:year/:month', (req, res) => {
  //access param properties
  // res.send(req.params);

  //access query params
  //req url /api/posts/2018/3?sortBy=myparam
  res.send(req.query.sortBy);
});

//PORT - environment variable
//look for environment variable first, then assign if not there
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
