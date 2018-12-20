/* eslint-disable no-unused-expressions */
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);

require('./config/dbConnection');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const jwtAuth = require('./authenticate');
const sessionAuth = require('./sessionAuthentication');
const notesRouter = require('./routes/notes');
const boardsRouter = require('./routes/boards');
const workspacesRouter = require('./routes/workspaces');
const channelsRouter = require('./routes/channels');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const trelloRouter = require('./routes/trello');
const trelloHomeRouter = require('./routes/trelloHome');

const port = process.env.PORT || 3000;
const redisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({
  extended: true,
}));
app.use(bodyparser.json());
app.use(cookieSession({
  store: new RedisStore(redisOptions),
  secret: 'shilpa',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(cookieParser());
app.use(jwtAuth.initialize());
app.use(sessionAuth.session());

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', homeRouter);
app.use('/auth', userRouter);
app.use('/api/notes', notesRouter);
app.use('/trelloHome', trelloHomeRouter);
app.use('/trello', (req, res, next) => { req.user ? next() : res.status(403).send('unAuthorized!'); }, trelloRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/workspaces', jwtAuth.authenticate('jwt', { session: false }), workspacesRouter);
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
