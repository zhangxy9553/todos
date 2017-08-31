module.exports = (function() {
  var 
  configMap = {
    factor : [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    , varify : ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  }
    , stateMap = {

    }
    , str15to18
    , validate
    , baseCode
  , validate
  , validateCode

    , getBaseCode
    , getVarifyCodeByBaseCode;


  str15to18 = function(str) {
    return str;
  }

  getBaseCode = function(str){
    return str.substr(0,17);
  };
  getVarifyCode = function(str){
    return str.substr(17,1);
  };
  getVarifyCodeByBaseCode = function(str) {
    var sum = 0;
    for(var i = 0, j = 17; i < j; i++ ) {
      sum += parseInt(str.substr(i, 1)) * parseInt(configMap.factor[i]) 
    }
    var y = sum % 11;
    return configMap.varify[y];
  };

  validate = function(str) {
    var length = str.length;
    if (length === 15) {
      idcard = str15to18(str);   
      return validateCode(idcard);
    } else if (length === 18 ) {
      return validateCode(str);
    } else {
      return false; 
    }
  };

  validateCode = function (str) {
    var basecode = getBaseCode(str);
    var varifycode = getVarifyCode(str);
    var code = getVarifyCodeByBaseCode(basecode);
    console.log(code);
    console.log(varifycode);
    console.log(code == varifycode);
    console.log(code=== varifycode);
    return getVarifyCodeByBaseCode(basecode) === varifycode;
  }

  return {
    validate : validate
  }
}());

