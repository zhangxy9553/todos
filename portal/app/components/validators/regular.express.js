var isEmpty = require("./empty");
module.exports = function(regex, input, allowEmpty) {
  allowEmpty = allowEmpty || false;
  if (allowEmpty && isEmpty) {
    return true;
  }
  return regex.test(input);
};

