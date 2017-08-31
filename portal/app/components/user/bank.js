module.exports.getbank = function(id){

  var rp = require("request-promise")
    , app = require("../../app")
    , rpOptions = {
      method : "get" 
      , uri : app.locals.api + "user/bank/get/" + id
      , json :true 
    };

  rp(rpOptions).then(function(data) {

  }).catch(function(err) {

  });
};
