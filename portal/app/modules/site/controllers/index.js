
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.error);
  var indexModel = require("./../models/index");
  return new Promise(function(resolve, reject){
    resolve({todayTodos:null});
  }).then(indexModel.getTodayTodos)
    .then(indexModel.getTomorrowTodos)
    .then(indexModel.getTempTodos)
    .then(indexModel.getFutrueTodos)
    .then(function(data){
      console.log("----test api res-------");
      console.log(data);
      res.render('index/index', { title: '我的任务' , todos : data});
    }).catch(function(error){
      res.render('index/index', { title: '我的任务' , todos : null});
    });
});
router.get("/index(/index)?", function(req, res, next){
  res.redirect("/");
});

module.exports = router;
