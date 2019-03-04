var protocolStr = document.location.protocol; 
if(protocolStr == "http:"){   
  window.location.href="https://m.mcyou.net/login.html";  
}   
// 判断是否已经保存密码
$(document).ready(function(e) { 
     
	$("input[name=loginName],input[name=loginPwd]").on("input",function(evt){  
		 //trim()功能除去字符串开头和末尾的空格或其他字符
	  if($("#loginName").val().trim().length>0 && $("#loginPwd").val().trim().length>0){  
		    $(".login_btn").addClass("click");
			$(".login_btn").attr("type","submit");
	  }else{
		    $(".login_btn").removeClass("click");
			$(".login_btn").attr("type","button");
	  }
	  $("#loginName").mCenterDiv("loginName");
	  $("#loginPwd").mCenterDiv("loginPwd"); 
    });
	
	$(".verification button").click(function(){ 
		$(".login_btn").removeClass("click");
		$(".login_btn").attr("type","button");
		$(this).prev("input").val("").focus();
		$(this).hide();
     });
	
/*	$("#loginForm").submit(function(){
		var loginName = $("#loginName").val().trim();
	    var loginPwd =  $("#loginPwd").val().trim(); 
		
       if(loginName.length!=11){
		  showmessageTop("请输入11位手机号码"); 
		  return false;
	   }else if(loginPwd.length<6){
		   showmessageTop("密码过短"); 
		   return false;
	   }else{
		   return true;
	   }
		
    });	*/
 
  $("#login_btn").on("click", function() {
 	var loginName = $("#loginName").val().trim();
	  var loginPwd =  $("#loginPwd").val().trim(); 
 
 	if(loginName.length != 11) {
 		showmessageTop("请输入11位手机号码");
 		return false;
 	} 
 	if(loginPwd.length < 6) {
 		showmessageTop("密码过短");
 		return false;
 	}
	 if(loginPwd.length > 24) {
 		showmessageTop("密码过长");
 		return false;
 	}
 	if (!/^1[34587]\d{9}$/.test(loginName)) {
		showmessageTop("手机号码格式不对");
		return false;
	}
 	$.ajax({
 		url: login,
 		type: "POST",
 		contentType: "application/json",
 		data: JSON.stringify({
 			userName: loginName,
 			password: loginPwd
 		}),
 		success: function(data) {
 			console.log(data);
 			var data = JSON.parse(data);
 			if(data.code == 0) {
 				showmessageTop(data.msg);
 			} else {
 				window.localStorage.setItem("token", data.content);
				commonUtil.request({//获取购物车数量
					url: getGoodsCount,
					type: "get",
					success: function(data1) { 
                         window.sessionStorage.setItem("carGoodsNumber", data1.content);
						 console.log(data1.content);
						if(window.sessionStorage.getItem("detailGoodsId")){
							window.location.href = "detail.html";
						}else if(window.sessionStorage.getItem("storeId")){
							window.location.href = "store.html";
						}else{  
						    window.location.href = "index.html";
						}
					},
					error: function() {

					}
				});
 			}
 		}
 	});
 	return false;
 });
   

	
	//密码眼开关
	$(".pwd_eyes").click(function(){
		if($(this).hasClass("close")){
		  $(this).removeClass("close");
		  $(this).siblings("p").find("input[type=password]").attr("type","text");
		}else{
		  $(this).addClass("close");
		  $(this).siblings("p").find("input[type=text]").attr("type","password");
		}
	});
	
	
});
	
//封装	
jQuery.fn.mCenterDiv = function (obj) {
	$("#"+obj).focus(function(){  
		 $(".verification button").hide();
		 if($("#"+obj).val().trim().length!="" && $(this).attr("name")==obj){  
			  $(this).next("button").show(); 
		  }else{
			  $(this).next("button").hide(); 
		  }
	})

}; 
	

//注册register
 
$(document).ready(function(e) {  
	
	$("input[name=regName],input[name=regPwd],input[name=regCode]").on("input",function(evt){  
		var regName = $("#regName").val().trim();
	    var regPwd =  $("#regPwd").val().trim();
		var regCode =  $("#regCode").val().trim();
	 	 //trim()功能除去字符串开头和末尾的空格或其他字符
	  if(regName.length>0 && regPwd.length>0 && regCode.length>0){  
		    $(".register_btn").addClass("click");
			$(".register_btn").attr("type","submit");
	  }else{
		    $(".register_btn").removeClass("click");
			$(".register_btn").attr("type","button");
	  }
	  $("#regName").mCenterDiv("regName");
	  $("#regPwd").mCenterDiv("regPwd"); 
	  $("#regCode").mCenterDiv("regCode"); 
    });
	
	$(".verification button").click(function(){ 
		$(".register_btn").removeClass("click");
		$(".register_btn").attr("type","button");
		$(this).prev("input").val("").focus();
		$(this).hide();
     });
 
    $(".register_btn").on("click", function() {
	 
 		var regName = $("#regName").val().trim();
	    var regPwd  = $("#regPwd").val().trim();
		var regCode = $("#regCode").val().trim();
		var nickName= $("#nickName").val().trim();
		var recName = $("#recName").val().trim();
		if(recName.length>0){
			$.ajax({
				url: userinfo+"/"+recName,
				type: "get",
				contentType: "application/json", 
				success: function(data) {
					var data = JSON.parse(data); 
					if(data.content.id) {
						$("#promoterUserId").val(data.content.id);
					} else {
						 showmessageTop("此推荐人不存在");
						 $("#recName").focus();
						 return false;
					}
				}
 	       });
		} 
											   
		if (!/^1[34587]\d{9}$/.test(regName)) {
				showmessageTop("手机号码格式不对");
				return false;
			}
       if(regName.length!=11){
		  showmessageTop("请输入11位手机号码"); 
		  return false;
	   }
       if(regPwd.length<6){
		   showmessageTop("密码过短"); 
		   return false;
	   }
		if(nickName.length>10){ 
		   showmessageTop("昵称过长");
			$("#nickName").focus();
		   return false;
		}
       if(regPwd.length>24){
		   showmessageTop("密码过长"); 
		   return false;
	   }
     	if(regCode.length != 4) {
			showmessageTop("请输入4位验证码");
			return false;
		}
	 
 	$.ajax({
 		url: register,
 		type: "POST",
 		contentType: "application/json",
 		data: JSON.stringify({
 			userName: regName,
 			password: regPwd,
 			smsCode:regCode,
			promoterUserId:$("#promoterUserId").val(),
			nickName:nickName
 		}),
 		success: function(data) {
 			console.log(data);
 			var data = JSON.parse(data);
 			if(data.code == 0) {
 				showmessageTop(data.msg);
 			} else {
 				window.localStorage.setItem("token", data.content);
 				window.location.href = "index.html";
 			}
 		}
 	});
 	return false;
 });
    
    
    
    
	
});
 
 //手机验证码倒计时
$(document).ready(function(e) {
	var isclick = true;
	//注册，绑定
	$("#passwordGetCode").on("click", function () { 
		if (!isclick) return false;
		//手机号码验证
		var re = /^1[34578]\d{9}$/;
		if($.trim($("#regName").val()) == "" || !re.test($("#regName").val())) {
			showmessageTop("请输入正确的手机号码");
			return false;
		}
		sendphonecode($("#regName").val(), "reg"); //测试时，可以把这行代码注释
		var that = $(this),
			timeId;
		var num = 60;
		var thiscon = $(this).attr("data-waiting");
		that.text(num + thiscon);
		that.removeClass("isClick");
		isclick = false;
		timeId = setInterval(function () {
			num--;
			that.text(num + thiscon);
			if (num == 0) {
				clearInterval(timeId);
				that.text("重新获取");
				that.addClass("isClick");
				isclick = true;
			}
		}, 1000);

	});	
	   //找回密码
		$("#findGetCode").on("click", function () { 
		if (!isclick) return false;
		//手机号码验证
		var re = /^1[34578]\d{9}$/;
		if($.trim($("#findName").val()) == "" || !re.test($("#findName").val())) {
			showmessageTop("请输入正确的手机号码");
			return false;
		}
		sendphonecode($("#findName").val(), "forget"); //测试时，可以把这行代码注释
		var that = $(this),
			timeId;
		var num = 60;
		var thiscon = $(this).attr("data-waiting");
		that.text(num + thiscon);
		that.removeClass("isClick");
		isclick = false;
		timeId = setInterval(function () {
			num--;
			that.text(num + thiscon)
			if (num == 0) {
				clearInterval(timeId);
				that.text("重新获取");
				that.addClass("isClick");
				isclick = true;
			}
		}, 1000);

	});	
	
});

function sendphonecode(phone, type) {
	if(phone == "" || phone == null) {
		return;
	}
	var bind_type = $("#login_bind_tel_page").val(); //值为注册页面的隐藏input <input type="hidden" id="login_bind_tel_page" value="LOGIN">
	 
	var url = "";
	if(type == "forget") { //忘记密码发验证吗
		url = forgetSmscode + phone;

	} else if(type == "reg") { //注册发验证吗
		url = regSmscode + phone;
	}

	$.ajax({
		url: url,
		type: "get",
		dataType: "json",
		contentType: "application/json",
		success: function(data) {
			if(data.code == 1) {
				showmessageTop("已发送验证码，请注意查收");
			} else {
				showmessageTop("您操作太频繁，请稍后再试");
				return;
			}
		}

	});

}

//找回密码
$(document).ready(function(e) {  
	$("input[name=findName],input[name=findPwd],input[name=findCode]").on("input",function(evt){ 
		var findName = $("#findName").val().trim();
	    var findPwd =  $("#findPwd").val().trim();
		var findCode =  $("#findCode").val().trim();
	 	 //trim()功能除去字符串开头和末尾的空格或其他字符
	  if(findName.length>0 && findPwd.length>0 && findCode.length>0){  
		    $(".find_btn").addClass("click");
			$(".find_btn").attr("type","submit");
	  }else{
		    $(".find_btn").removeClass("click");
			$(".find_btn").attr("type","button");
	  }
	  $("#findName").mCenterDiv("findName");
	  $("#findPwd").mCenterDiv("findPwd"); 
	  $("#findCode").mCenterDiv("findCode"); 
    });
	
	$(".verification button").click(function(){ 
		$(".find_btn").removeClass("click");
		$(".find_btn").attr("type","button");
		$(this).prev("input").val("").focus();
		$(this).hide();
     });
 
   
    $(".find_btn").on("click", function() {
    	
    	var findName = $("#findName").val().trim();
	    var findPwd =  $("#findPwd").val().trim();
		var findCode =  $("#findCode").val().trim();
		
		if (!/^1[34587]\d{9}$/.test(findName)) {
				showmessageTop("手机号码格式不对");
				return false;
			}
       if(findName.length!=11){
		  showmessageTop("请输入11位手机号码"); 
		  return false;
	   }
       if(findPwd.length<6){
		   showmessageTop("密码过短"); 
		   return false;
	   }
       if(findPwd.length>24){
		   showmessageTop("密码过长"); 
		   return false;
	   }
		if(findCode.length != 4) {
			showmessageTop("请输入4位验证码");
			return false;
		}
	   
	   	$.ajax({
 		url: forgetPassword,
 		type: "POST",
 		contentType: "application/json",
 		data: JSON.stringify({
 			userName: findName,
 			password: findPwd,
 			smsCode:findCode
 		}),
 		success: function(data) {
 			console.log(data);
 			var data = JSON.parse(data);
 			if(data.code == 0) {
 				showmessageTop(data.msg);
 			} else {
 				window.localStorage.setItem("token", data.content);
 				window.location.href = "index.html";
 			}
 		}
 	});
	  
 	
 	return false;
 });
	
});
 
function mid_reg(){
	var wx_code=getQueryString("code");
	if(!wx_code){ 
		wx_code=window.localStorage.getItem("wx_code");
	}
	//alert(code);
	if(wx_code){
			$.ajax({
			url: info_openid+wx_code,
			type: "get",
			contentType: "application/json", 
			success: function(data) { 
				var data = JSON.parse(data); 
				//console.log(data);
				if(data.code == 1) { 
					//alert(data.content.id);
					if(data.content.userName && data.content.userName!=""){ 
						$("#promoterUserId").val(data.content.id);
						$(".verification_box21").show();
						$("#promoterName").html(data.content.userName); 
					}
					else { 
						$(".recommender").show(); 
					}
				} 
			}
		});
	}else{
		$(".recommender").show(); 
	}
} 