var db = require("./../../../config/db");
var moment = require("moment");

module.exports.addTodos = function( req ) {
  return new Promise(function(resolve, reject) {
    var title = req.title;
    var todoTime = req.todoTime;
    var content = req.content;
    var type = 0;
    if(todoTime == "" || todoTime == null || todoTime == undefined){
    	type = 1;
    }
    db.query('INSERT INTO todo (title,content,todoTime,status,type) VALUES ("'+title+'","'+content+'","'+todoTime+'",0,'+type+');' 
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
