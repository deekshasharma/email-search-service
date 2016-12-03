var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/**
 * Email separator
 */
var emails = [];
function emailSeparator(){
    fs.readFile('AllMail.mbox', function(error, data){
        if(error) throw error;
        emails = data.toString().split(/F[a-z]{3}\s[\w \.]+\@xxx/);
        console.log(emails[3]);
    })
}

emailSeparator();

/**
 * Parse a given email.
 */
var MailParser = require("mailparser").MailParser;
var mailparser = new MailParser();

mailparser.on("end", function(mail_object){
    console.log('Whole MailObject: ', mail_object);
    console.log('From: ',mail_object.from);
    console.log('To: ', mail_object.to);
    console.log('Subject:', mail_object.subject);
    console.log('Body:', mail_object.text);
    console.log('Date:', mail_object.date);

});

mailparser.on('headers', function (headers) {
});
fs.createReadStream('email.mbox').pipe(mailparser);



module.exports = app;
