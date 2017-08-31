var regex = /^\d{15,19}$/;
module.exports.test = function(mobile) {
  return regex.test(mobile);
}
module.exports.message = "银行卡号码不合法";
