var express = require('express');
var mysql = require('mysql');
var config = require('./config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var moment = require("moment");

var api = require('./modules/api/module');

var app = express();
app.domain = "http://todo.dev/";
app.locals.api  = "http://todo.dev/api/";

var app_path = path.join(__dirname + './../');

// swig template
var swig = require('swig');
swig.setDefaults({
  allowErrors: false,   
  autoescape: true,
  cache: false,
  encoding: 'utf8',
  filters: {},
  root: '/',
  tags: {},
  extensions: {},
  tzOffset: 0
});
app.engine('phtml',swig.renderFile);
app.set('view engine', 'phtml');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, './modules/site/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.locals.appPath = app_path;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(app_path, 'public')));
var session = require('express-session');
app.use(session({ 
  resave: false,  
  saveUninitialized: true,
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  // cookie 持续时间  毫秒单位 设置时间过长,重启浏览器后依然登录,过短会自动登出. 使用默认值.当退出浏览器时登出 
  cookie: { maxAge: 10 * 3600 * 1000 }
}));
app.use(function(req, res, next){
  if (req.session.error === undefined ) {
    req.session.error = require("./components/error/error");
    // errorTemplate = { "status" : "404" , "message" : "你请求的资源不存在或已经被移除."};
  }
  if ( req.session.user === undefined ) {
    req.session.user = require("./components/user/user");
  }
  if (req.session.member === undefined ) {
    req.session.member = function(){return 1;};
  }
  console.log("app.request.method:" + req.method);

  console.log("app midlleware");

  next();
});
app.use(function(req, res, next) {
  var tmp;
  for (tmp in req.body) {
    if (/<|>|script/.test(req.body[tmp])) {
      return  res.status(400).json({message:"faital error: invalid params"});
    }
  }
  return next();
});

app.use('/', api);

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
    console.log("status:" + err.status || 500 );
    console.log("message:" + err.message );
    console.log("error :" + err );
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
console.log(process.env.PORT = '3001');
module.exports = app;
