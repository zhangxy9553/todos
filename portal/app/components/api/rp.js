module.exports.node = function(req, uri, method) {
  return new Promise(function(resolve, reject) {
    console.log(req.body);
    console.log(uri);
    console.log(method);

    var rp = require("request-promise")
      , rpOptions = {
        method: method
        , uri : uri
        , body : req.body
        , json : true
      };

    console.log(rpOptions);
    rp(rpOptions)
      .then(function(res) {
        console.log("res=====");
        console.log(res);
        resolve(res);
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
  return app.locals.api + apiName;
}
