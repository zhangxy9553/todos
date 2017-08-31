module.exports.test = function(password) {
  return /^\w{6,16}$/.test(password);
  return /^\(?=[A-z]+)(?=[0-9]+)([A-z0-9]){6,16}$/.test(password);
}
module.exports.message = "密码格式错误";
module.exports.repeatPwdMessage = "密码不一致";
