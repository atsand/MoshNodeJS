const config = require('config');
const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticator');
const genres = require('./routes/genres');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

//two ways to check current environment
// console.log(`NODE_ENV is: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

//configuration
// console.log(`Application Name: ${config.get('name')}`);
// console.log(`Mail Server Name: ${config.get('mail.host')}`);
// console.log(`Mail Server Password: ${config.get('mail.password')}`);

//built in middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //allows for form value submission in key/val pairs
app.use(express.static('public')); //serve static files from the public folder

//routing
app.use('/api/genres', genres);
app.use('/api/courses', courses);
app.use('/', home);

//third party middleware
app.use(helmet());

//enable only in development
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

//custom middleware functions
app.use(logger);
app.use(authenticator);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
