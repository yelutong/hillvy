$(function(){//判断版本 控制app的显示与隐藏
var useragent=navigator.userAgent;
//console.log(useragent);
//console.log(navigator.userAgent.indexOf('mcyou'));
if(navigator.userAgent.indexOf('mcyou')>=0){$(".header-box").hide();$(".content21").css("margin",0);$(".content").css("margin",0);}
}) 