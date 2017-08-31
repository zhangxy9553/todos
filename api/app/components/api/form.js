module.exports = function(form){
  // for (var i in form) {
    // form[i] = form[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // }
  // form = form.
  return "reqData=" + encodeURI(encodeURI(JSON.stringify(form))); 
};
