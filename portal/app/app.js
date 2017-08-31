/*
* system components
*/
var express = require('express');
var mysql = require('mysql');
var config = require('./config/config');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var moment = require("moment");

/*
 * app module
 */
var site = require('./modules/site/module');


/**
 * app setting
 */
var app = express();
app.domain = "http://todo.dev/";
app.locals.api  = config.apiLocals.api;
app.locals.user = require("./components/user/user");

var app_path = path.join(__dirname + './../');

// swig template
var swig = require('swig');
swig.setDefaults({
  allowErrors: false
  , autoescape: true
  , cache: false
  , encoding: 'utf8'
  , filters: require("./components/swig/filters")
  , root: '/'
  , tags: {}
  , extensions: {}
  , tzOffset: 0
});

app.use(function(req, res, next){
  swig.setFilter('navactive', function(input) {    
    var url = req.originalUrl;
    var module = url;
    if(url != "/"){
      var urlArr = url.split("/");
      module = urlArr[1];
      console.log(module);
    }
    if(input == module) {        
      return 'class=active';    
    }else{        
      return '';    
    }
  });

  swig.setFilter('membernavactive', function(input) {
    var url = req.originalUrl;
    var module = url;
    if(url != "/"){
      var urlArr = url.split("/");
      module = urlArr[2];
      console.log(module);
    }
    if(input == module) {
      return 'class=active';
    }else{
      return '';
    }
  });

  var filters = require("./components/swig/filters");
  swig.setFilter('tofixed', filters.tofixed);
  swig.setFilter('containerSpan', filters.containerSpan);
  next();

});

// app.use(require("./components/middleware/req.xss"))

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

app.use(session({
  resave: false
  , saveUninitialized: true


  //, store: new RedisStore(config.redisStoreOptions)
  , secret: 'portal  -  recommand 128 bytes random string' // 建议使用 128 个字符的随机字符串
  , cookie: { path: "/", maxAge: 10 * 3600 * 1000 }
}));

//设置 session
app.use(function(req, res, next){
  if (req.session.error === undefined ) {
    req.session.error = require("./components/error/error");
    // errorTemplate = { "status" : "404" , "message" : "你请求的资源不存在或已经被移除."};
  }
  if ( req.session.user === undefined ) {
    // req.session.user = require("./components/user/user");
    req.session.user =  {

      anonymous : true,
      username : "Guest",
      nickname : "Guest",
      name   : "Guest",
      isLogin : ! this.anonymous,
      profile : {},
      account : {}
    }

  }

  var random = Math.random();
  var randomMax = 10000;
  var randomMin = 100;
  var randomMix = randomMax - randomMin;
  var randomInt = (random * randomMix) + randomMin;
  if (  1 < 2 * random) { 
    res.setHeader("Set-Cookie", [ "xss-min-0" + "=" + parseInt (randomInt * randomInt, 10) + parseInt(randomInt * randomInt , 18), "xss-min-1" + "=" + parseInt (randomInt, 20) + parseInt(randomInt , 36)]);
  } else {
    res.setHeader("Set-Cookie", [ "xss-max-0" + "=" + parseInt (randomInt * randomMin, 10) + parseInt(randomInt * randomMin , 36), "xss-max-1" + "=" + parseInt (randomInt, 20) + parseInt(randomInt , 36)]);
  }
  next();
});

// site.setView(app);
// member.setView(app);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    if (err) {
      console.log("status:" + err.status || 500 );
      console.log("message:" + err.message );
      console.log("error :" + err );
      res.status(err.status || 500);
      return res.render('error', {
        message: err.message,
             error: err
      });
    } else {
      next();
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  if (err) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
           error: {}
    });
  } else {
    next();
  }
});

app.use('/', site);

app.set('port', process.env.PORT || 3000); // 设定监听端口
module.exports = app;
