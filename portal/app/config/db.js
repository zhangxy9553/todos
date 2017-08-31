var mysql = require('mysql'),
    config = require('../config/config');

var db = mysql.createConnection(config.mysql);
module.exports = db;
