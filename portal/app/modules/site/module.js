var 
  express = require("express")
, site = express();


  var path = require('path');
  //var index = require("./controllers/index");
  var index = require("./controllers/index");
  var add = require("./controllers/add");
  var del = require("./controllers/del");
  /**
   * index
   */
  site.on("mount", function(parent){
    site.domain = parent.domain;
    site.locals = parent.locals;
  });
//site.use(function(req, res, next){
//  if (req.session.error === undefined ){
//    req.session.error = {};
//    // errorTemplate = { "status" : "404" , "message" : "你请求的资源不存在或已经被移除."};
//  }
//  next();
//});
site.use('/',index);
site.use('/add',add);
site.use('/del',del);

site.set('views', path.join(__dirname, 'views/'));

module.exports = site;
