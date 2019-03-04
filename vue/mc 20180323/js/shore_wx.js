function toshare21(){
var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){  
    	//$(".am-share").addClass("am-modal-active");	
		$(".sharebg").addClass("sharebg-active"); 
		$(".share_wxbg").fadeIn();
    } 
    else{   
    	showmessage("请在微信客户端中进行分享"); 
		return false;
    }    
}


$(function(){  
 $.ajax({
	   type: "POST",
	   url: wxShareSign,
	   contentType: "application/json",
	   data: JSON.stringify({"url":window.location.href}),
	   dataType : "json", 
	   success: function(data){
		   console.log("d");
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
	  
})  

wx.ready(function () {
	//wx.hideOptionMenu();//隐藏右上角的 微信原生 分享 
	var storeId = window.sessionStorage.getItem("storeId");
	if(!storeId){
		storeId =getQueryString('storeId');//获取url链接参数
		window.sessionStorage.setItem("storeId",storeId);
	}
    var onMenu={
		title: $(".kk_s_name").html(), // 分享标题
		desc: $(".kk_s_adress").html(), // 分享描述
		link: 'https://m.mcyou.net/store.html?storeId='+storeId, // 分享链接
		imgUrl:$(".kk_s_logo img").attr("src"), // 分享图标
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
})	 