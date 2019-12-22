require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json');

var cors = require('cors');
var blacklist = require('./middleware/token-blacklist');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./middleware/passport-setup');

// Clears the token blacklist of inactive tokens everyday at 10:00 PM
blacklist.clearBlackList();


const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');
const folderRoutes = require('./routes/folders');

mongoose.connect(
    'mongodb+srv://AndrewAmgad:' + process.env.DB_PASS +  '@inscribed-main-gshtn.mongodb.net/inscribed?retryWrites=true&w=majority',
    {useNewUrlParser: true, useFindAndModify: false, autoIndex: false, useUnifiedTopology: true}
)

mongoose.Promise = global.Promise;

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(
    cors({
    origin: true,
      credentials: true
    })
  ); 


// app.options("*", cors());
app.use(cookieParser());
app.use('/user',  userRoutes);
app.use('/notes', noteRoutes);
app.use('/folders', folderRoutes)

var swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

module.exports = app;
