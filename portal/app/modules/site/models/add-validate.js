
var errorDefault = require("../../../components/error/error.config").defaultValue;
var session ;
var that = require("./add-validate");

module.exports.error =  {
	title : errorDefault,
	todoTime : errorDefault,
	content :errorDefault
};

module.exports.validate = function(req){

  var that = require("./add-validate");
  return new Promise(function(resolve, reject) {
	req.session.error.addTodo = {
      title : null 
    , todoTime : null 
    };
    resolve(req);
  }).then(that.validateTitle)
    .then(that.validateTime)
    .then(function(request){
      return new Promise(function (resolve, reject) {
        var error = request.session.error.addTodo;
        console.log(errorDefault === error.title);
        console.log(errorDefault === error.todoTime);
        if (  error.title === errorDefault 
          && error.todoTime === errorDefault
        ) {
          return resolve(request);
        } else {
          return reject(request);
        } 
      }); 
    });

};

// ====================================================
// ============= begin validate ======================
// ====================================================
/**
 * 判断字符串是否为空
 */
module.exports.isEmpty = function(str) {
  console.log("isEmpt str :" + str);
  if( str === "" || str === undefined ){
	  return true;
  }else {
	  return false;
  }
};

/**
 * 判断时间格式是否为YYYY-MM-DD HH:II:SS
 */
module.exports.isTime = function(str) {
	console.log("isTime str :" + str);
	var reg = /^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])( ([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)$/;   
	var res = reg.test(str);   
	console.log(res); 
	return res;
};


/**
 * 验证标题
 */
module.exports.validateTitle = function(request){
  return new Promise(function(resolve, reject) {

    var title = request.body.title;
    if ( that.isEmpty(title) ) { 
    	console.log("+++++++is not null+++++++++++");
      request.session.error.addTodo.title = "主题不能为空";
    }
    return resolve(request);// 继续验证
    // return reject(request);//打断验证
  });
};

/**
 * 验证时间格式是否为YYYY-MM-DD HH:ii:ss 可以为空
 */
module.exports.validateTime = function(request){
  return new Promise(function(resolve, reject) {

    var todoTime = request.body.todoTime;
    if ( that.isEmpty(todoTime) ) { 
    	return resolve(request);// 继续验证
    }else {
    	if ( !that.isTime(todoTime) ) { 
	      request.session.error.addTodo.todoTime = "时间格式错误";
	    }
    }
    return resolve(request);// 继续验证
  });
};

// ============================================
// ============== end validate ==============
// ============================================
