module.exports.delTodo = function(req){

  var module = require("../module");
  var id = req.params.id;
//  var id = req.id;
  console.log("-------------------------------------------------");
	console.log(id);

  var uri  = module.locals.api + "del/"+id;
  var rp = require("request-promise");
  var rpDelTodos = {
    method : "get"
      , uri : uri
      , json : true
      , body : {
      }
  };
  return new Promise(function(resolve, reject) {
    return rp(rpDelTodos).then(function(res) {
      console.log("*******del api*******");
      resolve(req);
    }).catch(function(error) {
      reject(req);
    });;
  });
}



