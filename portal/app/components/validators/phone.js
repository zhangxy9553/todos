var regex = /^1[3-9][0-9]{9}$/;
module.exports.test = function(mobile) {
  return regex.test(mobile);
}
module.exports.message = "手机号码不合法";
