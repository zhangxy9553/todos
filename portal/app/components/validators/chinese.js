var regularExpress = require("./regular.express");
module.exports = function(input) {
  var regex = /^[\u4e00-\u9fa5]+$/
  return regularExpress(regex, input); 
}
