var
express = require("express")
  , router = express.Router();
var db = require("./../../../config/db");

var model = require("../models/add");

router.get("/todos", function (req, res, next) {
	var data = {};
	var title = req.body.title;
	var todoTime = req.body.todoTime;
	var content = req.body.content;
	new Promise(function(resolve, reject)
	  {
	    resolve({"title":title, "todoTime":todoTime, "content":content});
	  }).then(model.addTodos)
	  .then(function(data){
	    console.log("************************************");
	    console.log(data);
	    console.log("************************************");
	    res.status(200).json(data);
	  }).catch(function(error){
	    res.status(error.status).json({error : error.message});
	  });
}); 

module.exports = router;
