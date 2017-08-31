/*
 * spa.model.js
 * Model module for SPA
 */
/*
 *jslint        browser:true,   continue:true
 devel:true, indent:2,    maxerr:50,
 newcap:true,    nomen:true, plusplus:true,
 regexp:true,    sloppy:true,    vars:false,
 white:true
 */

/*global $, spa, TAFFY */

app.login = (function(){
  "use strict";

  var 
    configMap = {}
    , stateMap = {}
    , form;

    form = (function(){
      var username
      , password
      , captcha
      , validate
      , send_form ;

    username = $("username").val();
    password = $("password").val();
    captcha = $("captcha").val();

    validate = function (){
      var mobileRegex = /^1[3-9][\d]{9}$/  
      var passwordRegex = /^\w{6-32}$/
      var captchaRegex = /^\[A-z0-9]{4}$/
      return mobileRegex.test(username) && passwordRegex.test(password) && captchaRegex.test(captcha);
    };

    send_form = function (){
       
    };

    }());

    return {
      form : form 
    };

}());
