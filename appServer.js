const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const session = require('express-session');
// const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

require('./config/dbConnection');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const passport = require('./authenticate');
const notesRouter = require('./routes/notes');
const boardsRouter = require('./routes/boards');
const workspacesRouter = require('./routes/workspaces');
const channelsRouter = require('./routes/channels');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');

const port = process.env.PORT || 3000;

// const jsonRoutes = jsonServer.router(path.resolve(__dirname, 'db.json'));
// const jsonMiddlewares = jsonServer.defaults();

// app.use('/api/', jsonMiddlewares);
// app.use('/api/', jsonRoutes);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
  extended: true,
}));
app.use(bodyparser.json());
app.use(session({
  secret: 'shilpa',
}));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
// require('./authenticate')(passport);

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', homeRouter);
app.use('/auth', userRouter);
app.use('/api/notes', notesRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/workspaces', passport.authenticate('jwt', { session: false }), workspacesRouter);
app.use('/api/channels', channelsRouter);

app.use((err, req, res, next) => {
  if (err) res.set(500).send('Some error occured, Please try again later!');
  next();
});
app.use((req, res) => {
  res.set(404).send('REQUEST NOT FOUND');
});

server.listen(port);
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat', (data) => {
    console.log(`message: ${data.msg}`);
    io.emit('chat', data);
  });
});

module.exports = app;
