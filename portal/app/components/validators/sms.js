var errorDefault = require("../error/error.config").defaultValue;
var that = require("./sms");
module.exports.validatePhonecode = function(req){
  return new Promise(function(resolve, reject) {
    var 
    phonecode = req.body.phonecode
      , mobile = req.body.username
      , seqCode = req.body.seqCode ;

    // ============== start 
    if ( that.isEmpty(phonecode) ) { 
      req.session.error.register.phonecode = "手机验证码不能为空";
      reject(req);
    }
    if ( req.session.error.register.username !== errorDefault ) {
      // resolve(req);
    }
    // ============== continue
    // 
    var app = require("../../app");
    var url = app.locals.api  + "user/sms/validate" ;
    var rp = require("request-promise");
    var reqData = {
      mobile: mobile,
      seqCode: seqCode,
      captcha: phonecode
    };

    var rpOptions = {
      method : "post",
      uri : url,
      json: true,
      body : reqData
    };
    rp(rpOptions).then(function(parsedBody) {
      console.log(parsedBody);
      req.session.error.register.phonecode = errorDefault;
      resolve(req);
    }).catch(function(error) {
      console.log(error);
      req.session.error.register.phonecode = "验证码错误";
      reject(req);
    });
  });
};

module.exports.isEmpty = function(str) {
  console.log("isEmpt str :" + str);
  return ( str === "" || str === undefined );
};
