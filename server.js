var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { connectDB } = require('./config/connection');
// Import directly as a function
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

//CHATGPT GIVE INSTRUCTIONS
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const hbs = require('hbs');

// Registering the 'eq' helper
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});


const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Make flash messages available to all views
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// Connect to the database
(async () => {
  try {
      await connectDB(); // Corrected function call
      console.log("✅ Database Connected Successfully!");
  } catch (error) {
      console.error("❌ Database Connection Failed:", error);
  }
})();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;