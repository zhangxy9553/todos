var user  = {

  anonymous : true,
  username : "Guest",
  nickname : "Guest",
  name   : "Guest",
  isLogin : ! this.anonymous,
  profile : {},
  account : {}
}
function User (id, data) {
  this.id = id;
  this.name = data.truename || "Guest" ; 
  this.data = data
  return this;
}
User.prototype.isGuest = function() {
  return ! this.id ? true : false;
};
User.prototype.hasRealname = function() {
  if (this.isGuest()) {
    return false;
  } 

  return this.data.profile.truename ? true : false;
}
User.prototype.hasBandcard = function(req) {
  var model = require("../api/api");
  var user = this;
  return new Promise(function(resolve, reject) {
    if (req.session.user.bank !== undefined && req.session.user.bank != "") {
      return resolve(req); 
    }
    model.rp.get(req, "user/bank/" + user.id)
      .then(function(res) {
        req.session.user.bank = res[0];
        resolve(req);
      }).catch(function(err) {
        reject(err);
      });
  });

}
//刷新用户信息
User.prototype.reflesh = function(req) {
  var model = require("../api/api");
  return model.rp.get(req, "user/" + this.id )
    .then(function(res) {
      console.log(req.session.user);
      req.session.user.profile = res.data[0];
      console.log(req.session.user);
      this.data = res.data[0];
    }).catch(function(err) {
      reject(err); 
    });
};
module.exports =  User;
