const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (message) => {
  console.log(`id = ${message.id} and message = ${message.message}`);
});

logger.on('logging', (arg) => {
  console.log(arg.data);
});

logger.log('testing');

// const fs = require("fs");
// const files = fs.readdirSync("./");

// // console.log(files);

// const directory = fs.readdir("adsf", function (err, files) {
//   if (err) console.log("error", err);
//   else console.log(files);
// });
