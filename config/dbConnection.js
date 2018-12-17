const mongoose = require('mongoose');

const devDbUrl = 'mongodb://mongo:27017/myappdb';
const mongoURI = process.env.MONGOLAB_URI || devDbUrl;

mongoose.connect(devDbUrl, (err) => {
  if (err) {
    throw (err);
  } else {
    console.log('connected to DB!');
  }
});

module.exports = mongoose;
