
var express = require('express');
var router = express.Router();
var request = require("../../../utils/request");

/**
 * 删除任务
 */
router.all("/:id", function(req, res, next) {
    next();
}).get("/:id", function(req, res, next) {
	var delModel = require("./../models/del");
    var promise = new Promise( function(resolve, reject) {
      resolve(req);
    }).then(delModel.delTodo)
      .then(function(){
        // add todo success
    	// goto index page
        return res.redirect("/");
      }).catch(function(error) {
    	  console.log("=====error=====");
    	  return res.redirect("/");
      });
})

module.exports = router;
