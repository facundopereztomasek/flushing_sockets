var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mydb');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {

//   var Schema = mongoose.Schema;

//   var lightGroupSchema = new Schema({
//     floor: Number,
//     state: false,
//     lights: Array
//   });

//   mongoose.model('LightGroup' , lightGroupSchema);

//   var LightGroup = mongoose.model('LightGroup');

//   var query = LightGroup.findOne({floor:0});
//   query.select('floor');
//   query.exec(function(err,light){
//     if (err) return handleError(err);
//     light.floor = 1;
//     light.save();
//   });


// });


// view engine setup
var expressHbs = require('express-handlebars');

app.engine('hbs', expressHbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public' , express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
  

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
