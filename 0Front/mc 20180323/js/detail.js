 $(function(){ 
		// 数量减
	$(document).on("click", ".minus",function() { 
		var t = $(this).next('.num');
		t.val(parseInt(t.val()) - 1);
		if (t.val() < 1) {
			showmessage("受不了了，商品不能再减少了哦");
			t.val(1);
		} 
	});
	// 数量加
	$(document).on("click", ".plus",function() {  
		var t = $(this).prev('.num');
		var stock =Number($("#stock").text());
		if(stock==0){
			showmessage("库存不足");
			return;
		}
		t.val(parseInt(t.val()) + 1);
		if (t.val() <= 1) {
			t.val(1);
		} 
	});
	 
	$(".mb_bg,.addressbtn").click(function(){
		$('.mb_bg').fadeOut(500);
		$(".region-picker-wrapper").css("transform","translate3d(0px,0px, 0px)");
	})
	
})

function detailMes(){
	var wx_code=getQueryString("code"); 
	if(wx_code){
		$(".shopCar").hide();
		$(".store,.kefu").css("width","25%");
		$(".datail_desire").css("width","50%");
		$(".datail_desire").attr("name","midBuy");
	}
    
	var userId=window.localStorage.getItem("userId");
	if(userId==null||userId=="null"||userId==""){
		$.ajax({ 
			url:userinfo,
			type: "get", 
		    dataType:"json",
			contentType: "application/json",
		    beforeSend: function(request) {
               request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
              },
			success: function(data) {  
				if(data.code==1){  
					window.localStorage.setItem("userId",data.content.id); 
				}else{
					console.log(data.msg);
				} 
			}  
	});
	} 	
}

jQuery(function(){
  
	jQuery(".myaddress2").click(function(){
		$(".myaddress2 .name").removeClass("ct_active")
		$(".myaddress2").removeClass("chadd");
		$(this).addClass("chadd");
		$("#addressId").val($(this).attr("id"));	 
		$(this).find(".name").addClass("ct_active");
	});
	
	
	$(".mb_bg,.mb_nobtnde").click(function(){ 
		$('.mb_bg').fadeOut(500);
		$('.mb_dioalogde').fadeOut(500); 
    });	
	
	  
	
});


//浮点型运算
function FloatAdd(arg1,arg2){
	var r1,r2,m;
	try{
		r1 = arg1.toString().split(".")[1].length
	}catch(e){
		r1 = 0;
	}
	try{
		r2 = arg2.toString().split(".")[1].length
	}catch(e){
		r2 = 0;
	}
	m = Math.pow(10,Math.max(r1,r2));
	var rs = (arg1*m + arg2*m)/m;
	rs = rs * 100;
	rs = rs + "";
	var newFee = rs.substring(0, rs.length -2) + "." + rs.substring(rs.length-2, rs -1);
	return newFee;
}

function btnCartInfo(){
	
	var goodsIds = "";
	var msgs = "";
	var invoices = "";
	
	if($("#addressId").val() == ""){
		showmessage("请点击选择一个收货地址");
		return false;
	}
	jQuery("input[name=goodsId]").each(function () {
		for (var i = 0; i < $(this).length; i++) {
			goodsIds = goodsIds + $(this).val() + "|";
		}
	});
	
	var goodsCount = "";
	jQuery("td[name='goodscount']").each(function(){
		goodsCount += parseInt($(this).html()) + "|";
	});
	
	
	if(goodsIds == ""){
		showmessage("没有商品");
	}
	//是否提交表单
	var subflag = true;
	//组装购买商品的ID和选择的配送方式(后台要计算运费)
	var goodsIdAndTransType = "";
	//计算运费
	var typeselect = jQuery("select[id^='goodsTransType_']");
	jQuery.each(typeselect,function(i,v){
		var selval = $(v).find("option:selected").val()
		if(selval == ""){
			showmessage("您还没有选择配送方式");
			subflag = false;
			goodsIdAndTransType = "";
			return false;
		}else{
			var goodsId = $(v).parent().prev().val().split("`")[0];
			var transType = selval.split("`")[0];
			//console.info("goodsId -> "+goodsId);
			//console.info("transType -> "+transType);
			var temp = goodsId+"`"+transType+"|";
			goodsIdAndTransType = goodsIdAndTransType + temp;
		}
	});
	
	
	jQuery("#goodscounts").val(goodsCount);
	jQuery("#goodsId").val(goodsIds);
	jQuery("#msg").val(msgs);
	jQuery("#invoice").val(invoices);
	jQuery("#appGoodsIdAndTransType").val(goodsIdAndTransType);
	
	if(subflag){
		$("#cartForm").submit();	
	}
	
}

//编辑或添加地址
/*
	$(document).ready(function() {
		 $("#city").citySelect({
				prov: "广东",
				city: "深圳",
				dist: "福田区",
				nodata: "none"
			});
		
	});
*/

//支付方式 


$(document).ready(function(){
  $("#app_online").hover(function(){
	  $(".banklist").css("display","block");
	  $(".bg000").css("display","block");
  });  
  $("#closeDIV").hover(function(){
	  $(".banklist").css("display","none");
	  $(".bg000").css("display","none");
  }); 
  var webbankpay = "";
	$("input[name='webbankpay']").click(function() {
	 
		 $("input[name='webbankpay']").each(function() { //寻找下一个这样的属性 
		  $(this).removeClass("checked");
	     });

		 $(this).attr("checked", true);
		$(this).addClass("checked"); 
		webbankpay = $(this).val();  
	}); 
	
});



$(function(){
	
$('#pay').click(function(){
	var oderIds = window.localStorage.getItem("oderIds");
	var webbankpay = $("input[name='webbankpay']:checked").val();  
	if(webbankpay=="" || webbankpay==null || webbankpay== undefined){ 
			showmessageTop("您还没有选择支付方式");
			return false;
	} 
	console.log(webbankpay);
	if($("#AGPay").hasClass("checked")){
		if($('#payPassword').val()==""){
			$('.mb_bg').fadeIn(500);
			$('.py_dioalog03').fadeIn(500);
		}else{
		$('.mb_bg').fadeIn(500);
		$('.mb_dioalog02').fadeIn(500);
		}
	}else{ 
	  var wxCode = getQueryString('code'); 
	  commonUtil.request({	 
	   type: "POST",
	   url: webPayOrder,
	   data: {"channel" : 2, "payType" : webbankpay, "webOrderNumbers" : oderIds, "wxCode" : wxCode},
	   dataType : "json",
	   success: function(data){ 
		   if(data.code==1){
						function onBridgeReady(){
						   WeixinJSBridge.invoke(
							   'getBrandWCPayRequest', JSON.parse(data.content),
							   function(res){   
								  // alert(JSON.stringify(res));
								   if(res.err_msg == "get_brand_wcpay_request:ok" ) { 
									   window.location.href="shopcar_pay_ok.html";
									   return false; 
								   }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
								   else if (res.err_msg == 'get_brand_wcpay_request:cancel') { 
                                      showmessage('取消支付');
									  setTimeout(function(){
										  window.localStorage.setItem("userOrderStatus", 10);
			                              window.location.href = "buyer_order.html";
									  },1500)
                                   }
								   else if (res.err_msg == 'get_brand_wcpay_request:fail') { 
                                      showmessage('支付失败');
									  setTimeout(function(){
										  window.localStorage.setItem("userOrderStatus", 10);
			                              window.location.href = "buyer_order.html";
									  },1500)
                                   }
								else {
                                     showmessage('支付失效');
									  setTimeout(function(){ 
			                              window.location.href = "index.html";
									  },1500)
                                 }
							   }
						   ); 
						}
						if (typeof WeixinJSBridge == "undefined"){
						   if( document.addEventListener ){
							   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
						   }else if (document.attachEvent){
							   document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
							   document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
						   }
						}else{
						   onBridgeReady();
						}
			
		   }else{
				showmessage(data.msg);
		   }
	   }
	});
		
		
	}	
}); 
  	 
$(".mb_okbtn03").click(function(){
	var payVal=$("input[name='set_pwd']").val();
	var pycomval=$("input[name='set_compwd']").val();
	var pylen=payVal.length;
	if(payVal==""){
		showmessage("请设置支付密码");
		return false;
	}else if(pylen<6){
		showmessage('密码长度不够');
		return false;
	}else if(pycomval==""){
		showmessage('确认密码不能为空');
		return false;
	}else if(pycomval!=payVal){
		showmessage('两次输入的密码不一致');
		return false;
	}else{
		//加密
		var shaObj = new amallEncryption($('.payment_pwds').val());
		var str = shaObj.getHash();
		$(".payment_pwds").val(str);
		$("#set_paypsw").submit();
	}
});
$(".mb_nobtn03").click(function(){
	$('.mb_bg').fadeOut(500);
	$('.py_dioalog03').fadeOut(500);
});

$(".mb_okbtn02").click(function(){
	 var values=$('.payment_pwd').val();
	 var alen=values.length;
	 console.log(alen);
	 if(values==""){
		 showmessage('请输入支付密码');
		 return false;
	 }else if(alen<6){
		 showmessage('请输入正确的支付密码');
	 }else{
		 //$("#payment_pwd").val(values);
		//加密
		 var shaObj = new amallEncryption(values);
		 var str = shaObj.getHash();
		 $("#payment_pwd").val(str);
		 $("#theForm").submit(); 
	 }
}); 

$(".mb_nobtn02").click(function(){
	$('.mb_bg').fadeOut(500);
	$('.mb_dioalog02').fadeOut(500);
	return false;
})  
$(".mb_nobtnde").click(function(){
	$('.mb_bg').fadeOut(500);
	$('.mb_dioalogde').fadeOut(500);
	return false;
}) 

 var isclick = true;	
 $("#midGetCode").on("click", function() {
    var midName = $("#midName").val().trim(); 
    if (!/^1[34587]\d{9}$/.test(midName)) {
		showmessage("手机号码格式不对");
		return false;
	} 
	var wx_code=getQueryString("code");
	var shareUserId = window.sessionStorage.getItem("shareUserId");
	if(wx_code){ 
			$.ajax({
			url: bindOpenId+shareUserId+"/"+wx_code,
			type: "get",
			contentType: "application/json", 
			success: function(data) { 
				var data = JSON.parse(data);   
				console.log(data);
				if(data.code == 1) {    
					openId=data.content;
					window.localStorage.setItem("openId",openId);
				} 
			}
		});
	}else{
		showmessage("openId获取失败");
		return false;
	} 
	
	if (!isclick) return false; 
	$.ajax({
 		url: sendCash+midName,
 		type: "get",
 		contentType: "application/json", 
 		success: function(data) {
 			console.log(data);
 			var data = JSON.parse(data);
 			if(data.code == 1) {
 				showmessage(data.msg);
 			}else{
				return false;
			}  
 		}
 	});
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
	 
	 
});

$(".de_submit").on("click", function() { 
 		var midName = $("#midName").val().trim();
		var midCode = $("#midCode").val().trim();
		var goodsCart21 = window.localStorage.getItem("goodsCart21");
	        goodsCart21=JSON.parse(goodsCart21);
	        console.log(goodsCart21);
		if (!/^1[34587]\d{9}$/.test(midName)) {
				showmessage("手机号码格式不对");
				return false;
			} 
     	if(midCode.length != 4) {
			showmessage("请输入4位验证码");
			return false;
		}  
								
 	$.ajax({
 		url: wxDirectBuy,
 		type: "post",
		data:JSON.stringify({
			goodsCart:{
			  goodsCount:goodsCart21.goodsCount,
			  goodsId:goodsCart21.goodsId,
			  storeId:goodsCart21.storeId,
			  directBuy:1
		    }, 
		openId:window.localStorage.getItem("openId"),
		smsCode:midCode,
		userName:midName
		}),
 		contentType: "application/json", 
 		success: function(data) { 
 			var data = JSON.parse(data);  
			window.localStorage.setItem("token", data.content.token);
 			console.log(data);
 			if(data.code == 1) { 
				var storeList = []; //店铺数组
				var carIdList = []; //购物车ID
				var oderInfo = {};//定义一个空对象，把下面的值赋进来 
				var newstore = {};
				carIdList.push({
					"id": data.content.goodsCarts[0].id
				}); 
				/*commonUtil.request({
						url: sellerstore + data.content.goodsCarts[0].storeId, //店铺id,
						type: "get",
						contentType: "application/json",
						success: function(data) {
							console.log(data);
							if(data.code == 1) { 
								if(!data.content.name){
									data.content.name="明昌生态商家店";
								} 
								newstore.storeName = data.content.name; 
							}
						}
				});*/
				newstore.storeName = "明昌生态自营店"; 
				newstore.goodsCarts = [];
				var goods = {};
				goods.goodsId = data.content.goodsCarts[0].goodsId;
				goods.goodsName = $(".goodsname").html(); 
				goods.price = $(".normalDetail .dt_active b").html();
				goods.num = data.content.goodsCarts[0].goodsCount;
		        goods.goodsPhoto=$(".swiper-slide-active img").attr("src").split("net/")[1]; 
				
				newstore.goodsCarts.push(goods); 
				newstore.storeId = data.content.goodsCarts[0].storeId;
 				storeList.push(newstore);
				oderInfo.storeList = storeList;
				oderInfo.carIdList = carIdList;
				window.localStorage.setItem("oderInfo", JSON.stringify(oderInfo));
				window.localStorage.setItem("orderformUuid", commonUtil.getUuid());
				window.location.href = "shopcar_acounts.html";
 			}else{
				showmessage(data.msg);
			}  
 		}
 	});
 	return false;
 });
 
 
//收货地址

$(document).ready(function(){
	
	$(".add_del").click(function(){
		$(".bg_black").show();
		$(".cancel_list").show();
	  });
	$(".bg_black").click(function(){
		$(".bg_black").hide();
		$(".cancel_list").hide();
	  });
	$(".cancel_nobtn").click(function(){
		$(".bg_black").hide();
		$(".cancel_list").hide();
	  });
});
 

function addressAdd(){
	var len=$(".address_list li").length;
	var addr_id=getQueryString("id");
	if(len<20) {
		if(addr_id==1163){ 
		   window.location.href= "address_add.html?id=1163";
		}
		else if(addr_id==21){ 
		   window.location.href= "address_add.html?id=21";
		}
		else{
		   window.location.href= "address_add.html";
		}  
	}else {
		showmessage("地址不能超过20个");
	}
}
 
function sc_addr(){
	var addr_id=getQueryString("id");
	if(addr_id==1163){ 
		$(".icon_bk").attr("href","shopcar_acounts.html");  
	}
	if(addr_id==21){ 
		$(".icon_bk").attr("href","awardAcounts.html");  
	}
}
//商品规格
function selectSpec(e){
	var specOl = jQuery(e).siblings(".standards a");
	//console.info(specOl);
	specOl.removeClass("curred");//先删除所有class样式
	$(e).addClass("curred");
	
	var checkAttrDom= $('.curred input[name="checkAttr"]');
	var skuInfo=[];
	$.each(checkAttrDom,function(){
		skuInfo.push($(this).val());
	})
	vm.skuInfoStr=skuInfo.join(",");
	$.each(vm.goods.goodsSku,function(){
		if(this.skuInfo==vm.skuInfoStr){
			vm.skuPrice=this.skuPrice;
			vm.skuStock=this.skuStock;
		}
	}) 
	
}

