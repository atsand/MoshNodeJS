const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
  log(message) {
    //send an http request
    console.log(message);

    this.emit('messageLogged', { id: 3, message: 'oops' });
  }
}

//add log function to exports object of local module
//this makes the function public
//use this to export multiple variables or functions

//module.exports.log = log;

//can also export just a single function
//no longer exports an object, just a function directly
module.exports = Logger;
