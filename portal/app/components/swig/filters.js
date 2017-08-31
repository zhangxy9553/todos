module.exports.tofixed = function(number) {
  var number = parseFloat(number);
  if (isNaN(number)){
    return false; 
  }
  if(number <= 0){
    return 0.00;
  }
  return number.toFixed(2);
};
module.exports.abc = function(name) {
  return name;
}
module.exports.containerSpan = function(input) {
  return input.toString().split(":").join("    ");
}
module.exports.navactive = function(input) {    
  var url = req.originalUrl;
  var module = url;
  if(url != "/"){
    var urlArr = url.split("/");
    module = urlArr[1];
    console.log(module);
  }
  if(input == module) {        
    return 'class=active';    
  }else{        
    return '';    
  }
};
