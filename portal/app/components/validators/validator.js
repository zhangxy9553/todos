var validate  = {
  mobile : require("./phone")
  , phone : require("./phone")
  , bankcard : require("./bankcard")
  , password : require("./password")
  , identity : require("./identity.card")
  , isEmpty : require("./empty")
  , chinese : require("./chinese")
  , match : require("./regular.express")
};


module.exports = validate;
