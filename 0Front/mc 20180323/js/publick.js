//返回顶部
$(document).ready(function(){  
	//$("img.lazy").lazyload({effect : "fadeIn"});
	$(window).scroll(function(){
	    t = $(document).scrollTop(); 
	    if(t>200){  
			$('#gotop').fadeIn('slow');
	    }else{
	        $('#gotop').fadeOut('slow');
	    }  
	})   
	    
	$('#gotop').click(function(){  
		$('body,html').animate({
			scrollTop: 0
		},
		800);//点击回到顶部按钮，缓懂回到顶部,数字越小越快
		return false;  
	}) 
    
	$(".right-icon em").html(sessionStorage.getItem("carGoodsNumber"));//购物车数量
	  
}) 

//判断版本 控制app的显示与隐藏
var useragent=navigator.userAgent;
//console.log(useragent);
//console.log(navigator.userAgent.indexOf('mcyou'));
if(navigator.userAgent.indexOf('mcyou')>=0){ 
	$(".header-box,footer,.od_bottom").hide();
	$(".content").css("margin",0);
	$(".od_detail,.ct_other").removeClass("content");  
	$("#wx_code_21").hide();
}  
//压缩图片
function imagetoCanvas(image,type,width,quality){
	var img = new Image(),src=image.src;//创建新的图片对象
	img.crossOrigin="anonymous"; //解决图片跨域
	img.src = src;  
	if(src && src.indexOf('data:image')>-1){ 
		return false;
	}else{   
		  img.onload = function(){//图片加载完，再draw 和 toDataURL 
			  var cvs = document.createElement("canvas");
			  var ctx = cvs.getContext('2d'); 
			  var scale = image.width / image.height;
			  cvs.width = width;
			  cvs.height = parseInt(cvs.width / scale);  
			  ctx.drawImage(img, 0, 0, cvs.width, cvs.height); 
			  if(quality && quality <= 1 && quality > 0){
			     quality = quality;
			  }else{
				 quality =0.5;
		      } 
			  var cropStr = cvs.toDataURL(type,quality);  
			  image.setAttribute("src",cropStr); 
          } 
		  
		   
	}
} 

 //调用提示信息 正常上下居中
function showmessage(msg) { 
        $("#Msg").show();
        $("#Msg").html( '<div style="position: fixed;z-index:99999991;padding:10px;width: 150px;min-height:40px;background: #222;color: #fff;left: 50%;border-radius: 0.6em;z-index: 9999999999;' +
        'line-height: 80px;margin-left: -75px;word-break: break-all;text-align: center;top: 40%;opacity: .7;text-shadow: 0 1px 0 #111;height: auto;">' +
         '<p id="alert_message" style="line-height:20px;margin:10px 0 10px 0;color:#FFF">' + msg + '</p>' +
        '</div>');
	    setTimeout(closemessage, 2000);//两秒种关闭提示框
}	
 //调用提示信息  上部居中
function showmessageTop(msg) { 
        $("#Msg").show();
        $("#Msg").html( '<div style="position: fixed;z-index:99999991;padding:10px;width: 150px;min-height:40px;background: #222;color: #fff;left: 50%;border-radius: 0.6em;' +
        'line-height: 80px;margin-left: -75px;word-break: break-all;text-align: center;top:80px;opacity: .7;text-shadow: 0 1px 0 #111;height: auto;">' +
         '<p id="alert_message" style="line-height:20px;margin:10px 0 10px 0;color:#FFF">' + msg + '</p>' +
        '</div>');
	    setTimeout(closemessage, 2000);//两秒种关闭提示框
}

//关闭提示信息
function closemessage() {
     $("#Msg").hide();
}	 

//封装 宽度等于高度
jQuery.fn.widH= function () {  
		 var width=$(this).width();
		 $(this).css("height",width);

} 

$(document).ready(function(){
		var $divWidth = $('.od_detail div img.video').width();
		//$('.news_ul li img.video').css({'height':$divWidth});  
		$('.od_detail div video').css({'height':$divWidth,'width':$divWidth}); 

		$(".od_detail div img.video").click(function(){ 
			$(this).hide();
			$(".videoInfo").each(function(i,v){
				$(".videoInfo")[i].pause();
			 }); 
			var $vd=$(this).next("video");
			$vd.show(); 
			var md=$vd[0];//jq转为js 
			md.play();//必须把jq转为js 
			//launchFullscreen(md); 
			//runPrefixMethod(md, "FullScreen");
			//runPrefixMethod(md, "IsFullScreen");
		}) 
	$(".right-icon em").html(sessionStorage.getItem("carGoodsNumber"));
})

//进入全屏
function launchFullscreen(element){
	//此方法不可以在异步任务中执行，否则火狐无法全屏
	if(element.requestFullscreen) {
	element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
	element.mozRequestFullScreen();
	} else if(element.msRequestFullscreen){ 
	element.msRequestFullscreen(); 
	} else if(element.oRequestFullscreen){
	element.oRequestFullscreen();
	}
	else if(element.webkitRequestFullscreen)
	{
	element.webkitRequestFullScreen();
	}else{

	var docHtml = document.documentElement;
	var docBody = document.body;
	var videobox = document.getElementById('videobox');
	var cssText = 'width:100%;height:100%;overflow:hidden;';
	docHtml.style.cssText = cssText;
	docBody.style.cssText = cssText;
	videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
	document.IsFullScreen = true;

	}
}
	
//写一个公共的视频video方法，直接调用	
function vide(obj){
	var md=document.getElementById(obj);  
    md.addEventListener("ended",function(){
         $(this).hide();
		 $(this).prev("img").show(); 
    })  
	md.addEventListener("isFullscreenchange", function(e) {  
	    if (!document.isFullScreen) {
       //退出全屏关闭视频
		
        $(this).hide();
		$(this)[0].pause();//这样就转为js了，就直接调用暂停
		$(this).prev("img").show();  
    } 
		
   })
		md.addEventListener("msfullscreenchange", function(e) {  
	    if (!document.msfullScreen) {
       //退出全屏关闭视频
		//alert("haha"); 
        $(this).hide();
		$(this)[0].pause();//这样就转为js了，就直接调用暂停
		$(this).prev("img").show();  
    } 
		
   })
	md.addEventListener("ofullscreenchange", function(e) {  
	    if (!document.ofullScreen) {
       //退出全屏关闭视频
		//alert("haha"); 
        $(this).hide();
		$(this)[0].pause();//这样就转为js了，就直接调用暂停
		$(this).prev("img").show();  
    } 
		
   })
	md.addEventListener("webkitfullscreenchange", function(e) { 
    if (!document.webkitIsFullScreen) {
       //退出全屏关闭视频
		//alert("haha"); 
        $(this).hide();
		$(this)[0].pause();//这样就转为js了，就直接调用暂停
		$(this).prev("img").show();  
    } 
	})
		
	md.addEventListener("mozfullscreenchange", function(e) {
    if (!document.mozFullScreen) {
       //退出全屏关闭视频
		
        $(this).hide();
		$(this)[0].pause();//这样就转为js了，就直接调用暂停
		$(this).prev("img").show(); 
    } 
   })
	  
	md.addEventListener("pause", function(e) {  
	   //alert("d"); 
		$(this).hide();
		$(this)[0].pause();//这样就转为js了，就直接调用暂停
		$(this).prev("img").show(); 
   })
	 
	md.addEventListener("webkitfullscreenchange", function() {
            if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
                //runPrefixMethod(document, "CancelFullScreen");
                //alert("我们");
            } else if (runPrefixMethod(this, "RequestFullScreen")) {
               // alert("点击", "点击退出");
            }
        });
   
	md.addEventListener("msfullscreenchange", function() {
            if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
                //runPrefixMethod(document, "CancelFullScreen");
               // alert("我们");
            } else if (runPrefixMethod(this, "RequestFullScreen")) {
               // alert("点击", "点击退出");
            }
        });
	md.addEventListener("ofullscreenchange", function() {
            if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
                //runPrefixMethod(document, "CancelFullScreen");
               // alert("我们");
            } else if (runPrefixMethod(this, "RequestFullScreen")) {
               // alert("点击", "点击退出");
            }
        });
	
}	 

 var runPrefixMethod = function(element, method) {
        var usablePrefixMethod;
        ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
            if (usablePrefixMethod) return;
            if (prefix === "") {
                // 无前缀，方法首字母小写
                method = method.slice(0,1).toLowerCase() + method.slice(1);
                
            }
            
            var typePrefixMethod = typeof element[prefix + method];
            
            if (typePrefixMethod + "" !== "undefined") {
                if (typePrefixMethod === "function") {
                    usablePrefixMethod = element[prefix + method]();
                } else {
                    usablePrefixMethod = element[prefix + method];
                }
            }
        });
        
        return usablePrefixMethod;
 };	 

//资讯和定制页面 安卓，ios,h5跳转到商品详情
function toOdDetail(obj){  
var useragent=navigator.userAgent; 
if(navigator.userAgent.indexOf('ouyanghehe')>=0){  
	 window.webkit.messageHandlers.changeWebViewTitle.postMessage({"title":obj});//ios
	 return false;
}
else if(navigator.userAgent.indexOf('mcyou')>=0){  
	window.jsBridge.onSwitchGoodsDetail(obj);   
}else{
	toDetail(obj);
}    
}
//双十二湖活动
function toHDetail(couponId,couponType){  
var useragent=navigator.userAgent; 
if(navigator.userAgent.indexOf('ouyanghehe')>=0){  
	 window.webkit.messageHandlers.takeCoupon.postMessage({"couponId":couponId,"couponType":couponType});//ios
	 return false;
}
else if(navigator.userAgent.indexOf('mcyou')>=0){ 
	window.jsBridge.getCoupon('{"couponId":'+couponId+',"couponType":'+couponType+'}');
}else{
	toH5Detail(couponId,couponType);
}    
}


function toDetail(goodsId) {
	window.sessionStorage.removeItem("detailExchange");
	window.sessionStorage.setItem("detailGoodsId", goodsId);
	window.location.href = "detail.html";
} 

function getQueryString(name) { //根据链接获取值 如 id=1
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
}

function toshare(){//商品详情页和个人中心的分享

if(!localStorage.getItem('token')){
	 window.location.href="login.html"
 }else{
	var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){  
    	$(".am-share").addClass("am-modal-active");	
		$(".sharebg").addClass("sharebg-active");  
    } 
    else{   
    	showmessage("请在微信客户端中进行分享"); 
		return false;
    }  
	 
		
	
commonUtil.request({
	   type: "POST",
	   url: wxShareSign,
	   data: {"url":window.location.href},
	   dataType : "json",
	   success: function(data){
		   console.log(data);
		   if(data.code==1){
			   //showmessage(data.msg);

			   wx.config({
				debug: false,//这里是开启测试，如果设置为true，则打开每个步骤，都会有提示，是否成功或者失败
				appId: data.content.appId,
				timestamp: data.content.timestamp,//这个一定要与上面的php代码里的一样。
				nonceStr: data.content.nonceStr,//这个一定要与上面的php代码里的一样。
				signature: data.content.signature,//签名
				jsApiList: [
				  // 所有要调用的 API 都要加到这个列表中
						'checkJsApi',  
						'onMenuShareTimeline', //分享到朋友圈 
						'onMenuShareAppMessage', //分享到微信朋友 
						'onMenuShareQQ',  //分享到qq 
					    'onMenuShareQZone'//qq空间
				]
				});  

		   }else{
			  //showmessage(data.msg);
		   }
	   }
	});
	
	
wx.ready(function () {
	
	//wx.hideOptionMenu();//隐藏右上角的 微信原生 分享
	
	 commonUtil.request({
				url: userShare,
				type: "get", 
				contentType: "application/json",
				success: function(data) { 
					if(data.code == 1) {   
						//window.localStorage.setItem("share_title",data.content.title);
						//window.localStorage.setItem("share_content",data.content.content); 
					//alert(window.localStorage.getItem("share_title"));

					  var onMenu={
							title: data.content.title, // 分享标题
							desc: data.content.content, // 分享描述
							link: data.content.url, // 分享链接 'https://m.mcyou.net/mid_code.html?promoterId='+$(".toshare_id").val()
							imgUrl: photo+data.content.logPhoto//'https://m.mcyou.net/images/buyer/logo288.png', // 分享图标
						} 

						wx.checkJsApi({
								jsApiList: [
									'getLocation',
									'onMenuShareTimeline',
									'onMenuShareAppMessage'
								],
								success: function (res) {
									//alert(JSON.stringify(res));
								}
							});

						wx.onMenuShareQQ({//分享到QQ
							title: onMenu.title, // 分享标题
							desc: onMenu.desc, // 分享描述
							link: onMenu.link, // 分享链接
							imgUrl:onMenu.imgUrl, // 分享图标
							success: function () {
							// 用户确认分享后执行的回调函数
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数
							}
						});
						//alert(onMenu.title);
						wx.onMenuShareAppMessage({//分享到微信朋友
							title: onMenu.title, // 分享标题
							desc: onMenu.desc, // 分享描述
							link: onMenu.link, // 分享链接
							imgUrl:onMenu.imgUrl, // 分享图标
							type: '', // 分享类型,music、video或link，不填默认为link
							dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							}
						});

						wx.onMenuShareTimeline({//分享到朋友圈
							title: onMenu.title, // 分享标题 
							link: onMenu.link, // 分享链接
							imgUrl:onMenu.imgUrl, // 分享图标
							trigger: function (res) {
								// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
								//alert('用户点击分享到朋友圈');
							  },
							success: function () {
							// 用户确认分享后执行的回调函数
								//alert('已分享');
							},
							cancel: function () {
							// 用户取消分享后执行的回调函数'
								//alert('已取消');
							}
					   });

						wx.onMenuShareQZone({
						   title: onMenu.title, // 分享标题
							desc: onMenu.desc, // 分享描述
							link: onMenu.link, // 分享链接
							imgUrl:onMenu.imgUrl, // 分享图标
							success: function () { 
							   // 用户确认分享后执行的回调函数
							},
							cancel: function () { 
								// 用户取消分享后执行的回调函数
							}
						});
						
						
						

					}else{
						showmessage("分享出错");
						return false;
					}
				}
			}); 
	
	
	
});	
	
$("#weixin_friend,#weixin,#qq").click(function(){
	$(".share_wxbg").fadeIn();
	
})	 

wx.error(function(res){  
	// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。  
	//alert("errorMSG:"+res);  
}); 
	  
	 
 } 	
	
} 

$(function(){//商品详情页和个人中心的分享 需要
$(".sharebg,.share_btn").click(function(){ 
	$(".am-share").removeClass("am-modal-active");	
	$(".sharebg").removeClass("sharebg-active"); 
	if($(".share_wxbg").css("display")=="block"){
		$(".share_wxbg").fadeOut();
	}
}) 
	
}) 