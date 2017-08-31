var db = require("./../../../config/db");
var moment = require("moment");

module.exports.getTodayTodos = function( req ) {
  return new Promise(function(resolve, reject) {
    var limit = req.limit;
    var startTime = moment().format('YYYY-MM-DD')+" 00:00:00";
    var endTime = moment().format('YYYY-MM-DD')+" 23:59:59";

    db.query('select * '
      + ' from todo '
      + ' where todoTime > "' + startTime + '"'
      + ' and todoTime < "' + endTime + '"' 
      + ' and type = 0'
      , function(err, data) {
        if (err) {
          console.log(err);
          reject({status:500, message:"sql error"});
        } else if (data.length > 0) {
          resolve(data);
        } else {
          reject({status:404, message: "Not Found"});
        }
      });
  });
};

module.exports.getTomorrowTodos = function( req ) {
  return new Promise(function(resolve, reject) {
    var limit = req.limit;
    var startTime = moment().add(1, 'days').format('YYYY-MM-DD') + " 00:00:00";
    var endTime = moment().add(1, 'days').format('YYYY-MM-DD') + " 23:59:59";

    db.query('select * '
      + ' from todo '
      + ' where todoTime > "' + startTime + '"'
      + ' and todoTime < "' + endTime + '"' 
      + ' and type = 0'
      , function(err, data) {
        if (err) {
          console.log(err);
          reject({status:500, message:"sql error"});
        } else if (data.length > 0) {
          resolve(data);
        } else {
          reject({status:404, message: "Not Found"});
        }
      });
  });
};

module.exports.getTempTodos = function( req ) {
  return new Promise(function(resolve, reject) {

    db.query('select * '
      + ' from todo '
      + ' where type = 1'
      , function(err, data) {
        if (err) {
          console.log(err);
          reject({status:500, message:"sql error"});
        } else if (data.length > 0) {
          resolve(data);
        } else {
          reject({status:404, message: "Not Found"});
        }
      });
  });
};

module.exports.getFutrueTodos = function( req ) {
  return new Promise(function(resolve, reject) {
    var limit = req.limit;
    var startTime = moment().add(1, 'days').format('YYYY-MM-DD') + " 23:59:59";

    db.query('select * '
      + ' from todo '
      + ' where todoTime > "' + startTime + '"'
      + ' and type = 0'
      , function(err, data) {
        if (err) {
          console.log(err);
          reject({status:500, message:"sql error"});
        } else if (data.length > 0) {
          resolve(data);
        } else {
          reject({status:404, message: "Not Found"});
        }
      });
  });
};
