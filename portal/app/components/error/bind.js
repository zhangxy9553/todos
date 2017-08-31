/*
* error.bind
*
*/
var errorConfig = require("./error.config");
var error = {
  bankCode : errorConfig.defaultValue
  , cardno : errorConfig.defaultValue
  , phone : errorConfig.defaultValue
  , phonecode : errorConfig.defaultValue
  , transPwd : errorConfig.defaultValue
  , transPwdRpt : errorConfig.defaultValue
};
module.exports = error;
