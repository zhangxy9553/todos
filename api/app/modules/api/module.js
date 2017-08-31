var
express = require("express")
  , appApi = express("api")
  , router = express.Router();

appApi.on("mount", function(parent){
  appApi.domain = parent.domain;
  appApi.locals = parent.locals;
});

var index = require("./controllers/index");
var add = require("./controllers/add");
var del = require("./controllers/del");

appApi.set("db", require("../../config/db"));
appApi.use("/index",index);
appApi.use("/add",add);
appApi.use("/del",del);

module.exports = appApi;
