const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const notesRouter = require('./routes/notes');
const boardsRouter = require('./routes/boards');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyparser.json());

app.use('/api/notes', notesRouter);
app.use('/api/boards', boardsRouter);

app.use((err, req, res, next) => {
  if (err) res.set(500).send('Some error occured, Please try again later!');
  next();
});
app.use((req, res) => {
  res.set(404).send('REQUEST NOT FOUND');
});

app.listen(port, () => {});
