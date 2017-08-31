module.exports.node = function(req, uri, method) {
  return new Promise(function(resolve, reject) {
    var rp = require("request-promise")
    form = require("./form")
      , rpOptions = {
        method: method
        , uri : uri
        , form : form(req.body)
        , json : true
      };

    console.log(rpOptions);
    rp(rpOptions)
      .then(function(res) {
        console.log("res=====");
        console.log(res);
        if (res.status !== 0 ){
          reject({status:400, message:res.msg||"系统异常"}); 
        }else {
          resolve(res);
        }
      }).catch(function(err) {
        console.log("err=========");
        console.log(err);
        reject({status:err.statusCode, message:err.error.message});
      });
  });
};

module.exports.get = function(req, apiName) {
  var uri = this.getUri(apiName);
  return this.node(req, uri, "get");
}
module.exports.post = function(req, apiName) {
  var uri = this.getUri(apiName);
  return this.node(req, uri, "post");
}
module.exports.getUri = function(apiName) {
  var app = require("../../app");
  return app.locals.apiJava + apiName;
}
