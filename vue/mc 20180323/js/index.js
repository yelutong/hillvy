//倒计时
function getDateDemo(){
	var myDate = new Date();  
	var hours = myDate.getHours();
	var minutes = myDate.getMinutes();
	var seconds = myDate.getSeconds();
	var mscondes =Math.round((myDate.getMilliseconds()*19)/191); //截取前两位
	 
	//月份的显示为两位数字如09月
	if(hours < 10 ){hours = "0" + hours}
	if(minutes < 10 ){minutes = "0" + minutes}
	if(seconds < 10 ){seconds = "0" + seconds}
	if(mscondes < 10 ){mscondes = "0" + mscondes}
	//拼接时间字符串
	var dateTime =hours + ":" + minutes + ":" + seconds + ":"+mscondes;  
     $("#time").html(dateTime); 
} 
  var int=window.setInterval("getDateDemo()",193);//每隔0.193秒，调用一次getDateDemo() 

	//window.clearInterval(int);


$(function(){  
	var loading = getCookie("loading");
	var $loading = $("#loading");  
	if(!loading){
		$loading.show();
		setTimeout(function(){
			$loading.fadeOut();	//3秒后淡出消失
			$("#music").click();//3秒后自动触发点击事件	 
			window.clearInterval(int);
		},2000); 
		addCookie("loading","loading",24);
		
	}else{ 
		setTimeout(function(){ 
			window.clearInterval(int);
			$("#music").click();//3秒后自动触发点击事件	
		},300); 
	} 
})
//添加cookie
function addCookie(objName,objValue,objHours){
	var date = new Date();
	date.setTime(date.getTime()+objHours*60*60*1000); //设置date为当前时间+objHours*小时
	var str = objName + "=" + escape(objValue) + ";expires=" + date.toGMTString(); 
	if(objHours > 0){
	document.cookie = str;
	console.log(str);
	//alert("添加cookie成功,保留24小时（因为上面addCookie后面的值是24）");
	}
}

//获取指定Cookie元素
function getCookie(name) {
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return decodeURI(arr[2]);
	else return null;
}


//初始化分段首页图层
/*
function fixPagesHeight() {
	$('.swiper-slide,.swiper-container').css({
		height: $(window).height(),
	})
}
$(window).on('resize', function() {
	fixPagesHeight();
})
fixPagesHeight();
*/



	