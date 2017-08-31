module.exports.addTodo = function(req){

  var module = require("../module");

  var uri  = module.locals.api + "add/todos/";
  var rp = require("request-promise");
  var rpAddTodos = {
    method : "get"
      , uri : uri
      , json : true
      , body : {
    	  title : req.body.title
          , todoTime : req.body.todoTime
          , content : req.body.content
      }
  };
  return new Promise(function(resolve, reject) {
    return rp(rpAddTodos).then(function(res) {
      console.log("*******add api*******");

//      req.todayTodos = res;
      // console.log(req);
      resolve(req);
    }).catch(function(error) {
//      req.todayTodos = null;
    	req.session.error.addTodo.addError = "添加失败";
      reject(req);
    });;
  });
}



