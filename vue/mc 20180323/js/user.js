 function buyerMes(){//获取个人中心的信息
		$.ajax({ 
			url:userinfo,
			type: "get", 
		    dataType:"json",
			contentType: "application/json",
		    beforeSend: function(request) {
               request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
              },
			success: function(data) {
				//var data = JSON.parse(data);
				console.log(data);
				if(data.code==1){ 
					$(".toshare_id").val(data.content.id);
					window.localStorage.setItem("userId",data.content.id);
					if(!data.content.nickName){
						if(data.content.realName){
							data.content.nickName=data.content.realName; 
						}else{ 
						  data.content.nickName="无名";
						} 
					} 
					$(".tc_top").html(data.content.nickName); 
					console.log(data.content.headPhoto);
					if(!data.content.headPhoto||data.content.headPhoto==""||data.content.headPhoto==undefined){
						 $(".avatar img,.th_top img").attr("src","images/logo_f.png");
					}else{
						 $(".avatar img,.th_top img").attr("src",photo+data.content.headPhoto);
					}
					
					$(".level i,.tc_bottom").html(userLevelDes(data.content.level));
					window.localStorage.setItem("th_topimg", $(".avatar img,.th_top img").attr("src"));
				}
				else if(data.code==403){ 
				    $(".tc_top").html("亲，你还没登录哦，点击<a href='login.html'>登录</a>"); 
				}
			},
		  error : function (jqXHR, textStatus) {
		
	       }
			
	});
	
	  $.ajax({ 
			url:statistics_rule,
			type: "get", 
		    dataType:"json",
			contentType: "application/json",
		    beforeSend: function(request) {
               request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
              },
			success: function(data) { 
				if(data.code==1){  
	                $(".statistic").show(); 
				}
			},
		  error : function (jqXHR, textStatus) {
		
	       }
		   
		});  
	
}
function buyerSet(){//获取个人设置的信息
		commonUtil.request({ 
			url:userinfo,
			type: "get", 
		    dataType:"json",
			contentType: "application/json",
		    beforeSend: function(request) {
               request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
              },
			success: function(data) {
				//var data = JSON.parse(data);
				console.log(data);
				if(data.code==1){ 
					$(".toshare_id").val(data.content.id);
					var userName=formmatMobile(data.content.userName);
					$(".uesrname i").html(userName); 
					console.log(data.content.headPhoto);
					if(!data.content.headPhoto||data.content.headPhoto==""||data.content.headPhoto==undefined){
						 $(".avatar img,.th_top img").attr("src","images/logo_f.png");
					}else{
						 $(".avatar img,.th_top img").attr("src",photo+data.content.headPhoto);
					}
					
					$(".level i,.tc_bottom").html(userLevelDes(data.content.level));
					if(data.content.nickName){$(".nickname i").html(data.content.nickName.substring(0,15));} 
					window.localStorage.setItem("th_topimg", $(".avatar img,.th_top img").attr("src"));
				}
			},
		  error : function (jqXHR, textStatus) {
		
	       }
			
	});
	
}
function updatePwd21(){  
	 var password=$("#userPass").val().trim();
	var newPassword=$("#newPass").val().trim();
	var renewPassword=$("#renewPass").val().trim(); 
	if(newPassword==""||password==""||renewPassword=="") {
		showmessageTop("密码不能为空");
 		return false;
	}
	 if(newPassword.length < 6) {
 		showmessageTop("密码过短");
 		return false;
 	} 
	if(newPassword.length > 24) {
 		showmessageTop("密码过长");
 		return false;
 	}
	if(newPassword != renewPassword) {
 		showmessageTop("两次密码不一致");
 		return false;
 	}
	if(password == newPassword) {
 		showmessageTop("新旧密码一致");
 		return false;
 	}
	
	commonUtil.request({
			url:updatePwd,
			type: "post", 
		    dataType:"json",
			contentType: "application/json",
		    data:{"password":password,"newPassword":newPassword},
		    beforeSend: function(request) { 
                request.setRequestHeader("tokenAuth", window.localStorage.getItem("tokenAuth"));
               	request.setRequestHeader("Authorization", window.localStorage.getItem("token")); 
              },
			success: function(data) {
				showmessageTop(data.msg);
				if(data.code==1){ 
					 setTimeout(function(){
						 window.location.href="login.html";
						 return false;
					 }, 2000);
				}
			},
		  error : function (jqXHR, textStatus) {
		
	       }
			
	});
	 
}
function updateNickName(){  
	 var nickName=$("#nickName").val().trim(); 
	if(nickName=="") {
		showmessageTop("昵称不能为空");
 		return false;
	} 
	if(nickName.length >15) {
 		showmessageTop("昵称过长");
 		return false;
 	}  
	commonUtil.request({
			url:userUpdate,
			type: "post", 
		    dataType:"json",
			contentType: "application/json",
		    data:{"nickName":nickName}, 
			success: function(data) {
				showmessageTop(data.msg);
				console.log(data);
				if(data.code==1){ 
					 setTimeout(function(){
						 window.location.href="buyer_setting.html";
						 return false;
					 }, 2000);
				}
			},
		  error : function (jqXHR, textStatus) {
		
	       }
			
	});
	 
}
$(document).ready(function(){ 
//console.log(localStorage.getItem('token'));
//判断是否有token值	
 if(!localStorage.getItem('token')){
	 $(".tc_top").html("亲，你还没登录哦，点击<a href='login.html'>登录</a>"); 
 }
//退出登录 
$(".loginout").click(function(){ 
	//console.log(localStorage.getItem('token'));
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('carGoodsNumber');
	window.localStorage.removeItem('userId');
	window.location.href="login.html";
})	
	
})

 


function myShareCode(){ 
	$.ajax({ 
			url:userShare,
			type: "get", 
		    dataType:"json",
			contentType: "application/json",
		    beforeSend: function(request) {
               request.setRequestHeader("Authorization", window.localStorage.getItem("token"));
              },
			success: function(data) {
				//var data = JSON.parse(data);
				 console.log(data);
				if(data.code==1){ 
					//$('#img-buffer').attr("src",window.localStorage.getItem("th_topimg")); 
					
					/*
					var options={};
					options.url="https://m.mcyou.net/share.html?promoter="+data.content.id; //二维码的链接
					options.dom="#code";//二维码生成的位置 
					//options.image=$('#img-buffer')[0];//图片id
					options.render="canvas";//设置生成的二维码是canvas格式，也有image、div格式
					xyqrcode(options);  
					*/
					
					$('#code').qrcode({
						render : "canvas",    //设置渲染方式，有table和canvas，使用canvas方式渲染性能相对来说比较好
						text:data.content.url, //二维码的链接
						height: 500,
						width: 500,
						src: window.localStorage.getItem("th_topimg")
		             })
					
					
					
					$("#code canvas").attr("id","w21"); 
					
					canvas = document.getElementById('w21');  
					var type = "png",w = 500,h = 500;
					var mysrc = Canvas2Image.convertToImage(canvas, w, h, type).src;
					
					
					$("#myImg").attr("src",mysrc);  
					
					
					//合并多张图片 
					var data21={"image":["images/buyer/mycode.png",mysrc,window.localStorage.getItem("th_topimg")]},imgPath;  
	                function draw(){
						var mycanvas=document.createElement('canvas');
						document.body.appendChild(mycanvas);
						var len=data21.image.length;
						mycanvas.width=600;//画布宽度
						mycanvas.height=600;//画布高度 
						if(mycanvas.getContext){
							var context=mycanvas.getContext('2d');
							 mycanvas.style.display="none";//这里让canvas隐藏了
							 mycanvas.id="mypic";
							 context.fillStyle='#fff';
							 context.fillRect(0,0,600,600);
							// 宣传图片
							//var h=0;
							function drawing(num){
								if(num<len){
									var img=new Image;
									img.crossOrigin="anonymous"; //关键 解决Canvas图片toDataURL的报错
									img.src=data21.image[num];
									if(num==0){
										/*img.onerror=function(){
											context.fillStyle='#fff';
											context.stokeStyle='#dfdfdf';
											context.fillRect(0,0,1080,1080);//坐标
											context.strokeRect(0,0,1920,1920);//坐标
											context.font='24px 微软雅黑';
											context.textAlign='center';
											context.textBaseline='middle';
											context.fillStyle='#333'; 
											drawing(num+1);
										}
										img.onload=function(){
											context.drawImage(img,0,0,1080,1920);//横坐标，纵坐标，宽度，高度
											drawing(num+1);
										}*/
										drawing(num+1);
									}
									else if(num==1){
										img.onload=function(){
											context.drawImage(img,50,50,500,500); 
											/*var draw = function(x, y, width, height, radius, color, type){
												context.beginPath();
												context.moveTo(x, y+radius);
												context.lineTo(x, y+height-radius);
												context.quadraticCurveTo(x, y+height, x+radius, y+height);
												context.lineTo(x+width-radius, y+height);
												context.quadraticCurveTo(x+width, y+height, x+width, y+height-radius);
												context.lineTo(x+width, y+radius);
												context.quadraticCurveTo(x+width, y, x+width-radius, y);
												context.lineTo(x+radius, y);
												context.quadraticCurveTo(x, y, x, y+radius);
												context[type + 'Style'] = color || params.color;
												context.closePath();
												context[type]();
											}
											draw(453,530,170,170,30,"#FFF","fill");
											*/
											
											// 底部内容 
											drawing(num+1);
										}
									}
									else if(num==2){
										img.onload=function(){ 
											context.drawImage(img,226,224,145,145);
											
											
											var draw = function(x, y, width, height, radius, color, type){
												context.beginPath();
												context.moveTo(x, y+radius);
												context.lineTo(x, y+height-radius);
												context.quadraticCurveTo(x, y+height, x+radius, y+height);
												context.lineTo(x+width-radius, y+height);
												context.quadraticCurveTo(x+width, y+height, x+width, y+height-radius);
												context.lineTo(x+width, y+radius);
												context.quadraticCurveTo(x+width, y, x+width-radius, y);
												context.lineTo(x+radius, y);
												context.quadraticCurveTo(x, y, x, y+radius);
												context[type + 'Style'] = color || params.color;
												//context.strokeStyle=gradient;
                                                context.lineWidth=10;
												context.closePath();
												context[type]();
											}
											draw(221,220,155,150,30,"#FFF","stroke");
											
											
											// 底部内容 
											drawing(num+1);
										}
									}
								}else{
									    
									imgPath=mycanvas.toDataURL("image/jpeg");
									//document.getElementsByTagName('img')[3].src=imgPath;
									$("#img-buffer21").attr("src",imgPath); 
									
								}  
								
							}
							drawing(0);
							      
						}
						}
					CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
					var min_size = Math.min(w, h);
					if (r > min_size / 2) r = min_size / 2;
					// 开始绘制
					this.beginPath();
					this.moveTo(x + r, y);
					this.arcTo(x + w, y, x + w, y + h, r);
					this.arcTo(x + w, y + h, x, y + h, r);
					this.arcTo(x, y + h, x, y, r);
					this.arcTo(x, y, x + w, y, r);
					this.closePath();
					return this;
					}
					draw(); 
                               
					
					
				}
			},
		  error : function (jqXHR, textStatus) {
		
	       }
			
	});
	  
	
}
 



