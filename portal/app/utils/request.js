var request = {
  req : {}
        , method : {
          get:"GET",
            post:"post",
            delete:"DELETE"
        }
        , init : function (req){
          this.req = req;
          return this;
        } 
        , isPost: function (){
          return this.req.method.toLowerCase() === this.method.post;
        }
        , isAjax : function () {
          return this.req.xhr;
        }

};
module.exports = request;
