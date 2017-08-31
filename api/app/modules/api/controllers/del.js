var
express = require("express")
  , router = express.Router();
var db = require("./../../../config/db");

var model = require("../models/del");

router.get("/:id", function (req, res, next) {
	var data = {};
	var id = req.params.id;
	new Promise(function(resolve, reject)
	  {
	    resolve({"id":id});
	  }).then(model.delTodos)
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
