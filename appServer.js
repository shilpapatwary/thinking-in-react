const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const session = require('express-session');

require('./config/dbConnection');

const notesRouter = require('./routes/notes');
const boardsRouter = require('./routes/boards');
const workspacesRouter = require('./routes/workspaces');
const userRouter = require('./routes/user');
const passport = require('./authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'shilpa',
}));
app.use(passport.initialize());
app.use(passport.session());



function isLoggedin(req, res, next) {
  console.log(req.isAuthenticated(), 'It should come true, after logging in ..!!!')
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ message: 'UnAuthorised' });
  }
}

app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/workspaces', workspacesRouter);

app.use((err, req, res, next) => {
  if (err) res.set(500).send('Some error occured, Please try again later!');
  next();
});
app.use((req, res) => {
  res.set(404).send('REQUEST NOT FOUND');
});

app.listen(port, () => {});
