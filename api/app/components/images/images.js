module.exports.getUri = function (path) {
  var config = require("../../config/config").images;
  return path !== null  && path.indexOf(config.path) !== -1 ? path.replace(config.path, config.domain) : path;
}
