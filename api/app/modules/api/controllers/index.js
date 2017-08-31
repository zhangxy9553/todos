var
express = require("express")
  , router = express.Router();
var db = require("./../../../config/db");

var model = require("../models/index");

router.get("/todayTodos", function (req, res, next) {
	var data = {};
	new Promise(function(resolve, reject)
	  {
	    resolve({});
	  }).then(model.getTodayTodos)
	  .then(function(data){
	    console.log("************************************");
	    console.log(data);
	    console.log("************************************");
	    res.status(200).json(data);
	  }).catch(function(error){
	    res.status(error.status).json({error : error.message});
	  });
}); 

router.get("/tomorrowTodos", function (req, res, next) {
	var data = {};
	new Promise(function(resolve, reject)
	  {
	    resolve({});
	  }).then(model.getTomorrowTodos)
	  .then(function(data){
	    console.log("************************************");
	    console.log(data);
	    console.log("************************************");
	    res.status(200).json(data);
	  }).catch(function(error){
	    res.status(error.status).json({error : error.message});
	  });
}); 

router.get("/tempTodos", function (req, res, next) {
	var data = {};
	new Promise(function(resolve, reject)
	  {
	    resolve({});
	  }).then(model.getTempTodos)
	  .then(function(data){
	    console.log("************************************");
	    console.log(data);
	    console.log("************************************");
	    res.status(200).json(data);
	  }).catch(function(error){
	    res.status(error.status).json({error : error.message});
	  });
}); 

router.get("/futrueTodos", function (req, res, next) {
	var data = {};
	new Promise(function(resolve, reject)
	  {
	    resolve({});
	  }).then(model.getFutrueTodos)
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
