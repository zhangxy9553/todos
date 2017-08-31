var db = require("./../../../config/db");
var moment = require("moment");

module.exports.delTodos = function( req ) {
  return new Promise(function(resolve, reject) {
    var id = req.id;

    db.query('delete from todo where id="'+id+'"' 
      , function(err, data) {
        if (err) {
          console.log(err);
          reject({status:500, message:"sql error"});
        } else {
        	console.log(data);
          resolve({status:200, message: "success"});
        }
      });
  });
};
