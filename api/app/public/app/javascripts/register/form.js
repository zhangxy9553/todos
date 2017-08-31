//<![CDATA[
$(function(){
  /*
   *思路大概是先为每一个required添加必填的标记，用each()方法来实现。
   *在each()方法中先是创建一个元素。然后通过append()方法将创建的元素加入到父元素后面。
   *这里面的this用的很精髓，每一次的this都对应着相应的input元素，然后获取相应的父元素。
   *然后为input元素添加失去焦点事件。然后进行用户名、邮件的验证。
   *这里用了一个判断is()，如果是用户名，做相应的处理，如果是邮件做相应的验证。
   *在jQuery框架中，也可以适当的穿插一写原汁原味的javascript代码。比如验证用户名中就有this.value，和this.value.length。对内容进行判断。
   *然后进行的是邮件的验证，貌似用到了正则表达式。
   *然后为input元素添加keyup事件与focus事件。就是在keyup时也要做一下验证，调用blur事件就行了。用triggerHandler()触发器，触发相应的事件。
   *最后提交表单时做统一验证
   *做好整体与细节的处理
   */
  //如果是必填的，则加红星标识.
  //文本框失去焦点后
  var hasError = 3;
  $('form :input').blur(function(){
    var $error = $(this).parent().parent().find(".colorRed");
    //验证用户名
    if( $(this).is('#username') ){
      if( this.value=="" || ! /^1[3-9][0-9]{9}$/.test(this.value) ){
        var errorMsg = '请输入正确的手机号码.';
        $error.html(errorMsg).show();
      }else{
        $error.hide();
        hasError--;
      }
    }
    //password
    if( $(this).is('#password') ){
      if( this.value=="" || this.value.length<6 || this.value.length > 20 ){
        var errorMsg = '请输入6至20位的密码.';
        $error.html(errorMsg).show();
      }else{
        $error.hide();
        hasError--;
      }
    }
    if( $(this).is('#repeat_password') ){
      if( this.value=="" || this.value.length<6 || this.value.length > 20 ){
        var errorMsg = '请输入6至20位的密码.';
        $error.html(errorMsg).show();
      }else{
        $error.hide();
        hasError--;
      }
    }

    //验证验证码
    if( $(this).is('#captcha') ){
      if( this.value=="" ){
        var errorMsg = '请输入验证码.';
        $error.html(errorMsg).show();
      }else{
        $error.hide();
        hasError--;
      }
    }
    if( $(this).is('#phone_code') ){
      if( this.value=="" ){
        var errorMsg = '请输入验证码.';
        $error.html(errorMsg).show();
      }else{
        $error.hide();
        hasError--;
      }
    }

  }).keyup(function(){
    $(this).triggerHandler("blur");
  }).focus(function(){
    $(this).triggerHandler("blur");
  });//end blur


  //提交，最终验证。
  $('.submit').click(function(){
    hasError = 3;
    $("form :input").trigger('blur');
    console.log(hasError);
    if( hasError){
      return false;
    }else{
      $('form').submit(); 
    }
  });

  //重置
  $('#res').click(function(){
    $(".formtips").remove(); 
  });
});
//]]>
