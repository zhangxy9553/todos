/**
 * 获取今日任务
 */
module.exports.getTodayTodos = function(req){
  
  var module = require("../module");

  var uri  = module.locals.api + "index/todayTodos/";
  var rp = require("request-promise");
  var rpGetTodayTodos = {
    method : "get"
      , uri : uri
      , json : true
      , body : {
      }
  };
  return new Promise(function(resolve, reject) {
    return rp(rpGetTodayTodos).then(function(res) {
      console.log("*******today api*******");

      req.todayTodos = res;
      // console.log(req);
      resolve(req);
    }).catch(function(error) {
      req.todayTodos = null;
      resolve(req);
      //reject({status:error.statusCode, message:error.error});
    });;
  });
}


/**
 * 获取明日任务
 */
module.exports.getTomorrowTodos = function(req){
  
  var module = require("../module");

  var uri  = module.locals.api + "index/tomorrowTodos/";
  var rp = require("request-promise");
  var rpGetTomorrowTodos = {
    method : "get"
      , uri : uri
      , json : true
      , body : {
      }
  };
  return new Promise(function(resolve, reject) {
    return rp(rpGetTomorrowTodos).then(function(res) {
      console.log("*******tomorrowTodos api*******");

      req.tomorrowTodos = res;
      // console.log(req);
      resolve(req);
    }).catch(function(error) {
      req.tomorrowTodos = null;
      resolve(req);
    });;
  });
}


/**
 * 获取临时任务
 */
module.exports.getTempTodos = function(req){
  
  var module = require("../module");

  var uri  = module.locals.api + "index/tempTodos/";
  var rp = require("request-promise");
  var rpGetTemp = {
    method : "get"
      , uri : uri
      , json : true
      , body : {
      }
  };
  return new Promise(function(resolve, reject) {
    return rp(rpGetTemp).then(function(res) {
      console.log("*******tempTodos api*******");

      req.tempTodos = res;
      // console.log(req);
      resolve(req);
    }).catch(function(error) {
      req.tempTodos = null;
      resolve(req);
    });;
  });
}

/**
 * 获取明天之后的所有任务
 */
module.exports.getFutrueTodos = function(req){
  
  var module = require("../module");

  var uri  = module.locals.api + "index/futrueTodos/";
  var rp = require("request-promise");
  var rpGetFutrueTodos = {
    method : "get"
      , uri : uri
      , json : true
      , body : {
      }
  };
  return new Promise(function(resolve, reject) {
    return rp(rpGetFutrueTodos).then(function(res) {
      console.log("*******tempTodos api*******");

      req.futrueTodos = res;
      // console.log(req);
      resolve(req);
    }).catch(function(error) {
      req.futrueTodos = null;
      resolve(req);
    });;
  });
}
