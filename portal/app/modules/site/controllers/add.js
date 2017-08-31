
var express = require('express');
var router = express.Router();
var request = require("../../../utils/request");

/**
 * 添加任务
 */

router.route("/", function(req, res, next) {
  next();
}).all(function(req, res, next) {

  request.init(req); 

  var addValidate = require('./../models/add-validate');

  if (request.isPost()) {
	var addModel = require("./../models/add");
    var promise = new Promise( function(resolve, reject) {
    	req.session.error.addTodo = {
	      title : null 
	    , todoTime : null 
	    , addError : null
	    };
      resolve(req );
    }).then(addValidate.validate)
      .then(addModel.addTodo)
      .then(function(){
        // add todo success
    	// goto index page
        return res.redirect("/");
      }).catch(function(error) {
    	  console.log("=====error=====");
        res.render('add/index', {title: "添加任务", error:req.session.error.addTodo, form: req.body});
      });
  } else {
	  req.session.error.addTodo = {
		      title : null 
		    , todoTime : null 
		    , addError : null
		    };
    res.render('add/index', { title: '添加任务', error:req.session.error.addTodo, form: req.body });  
  }
});

module.exports = router;
