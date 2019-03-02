$(".footer").load("footer.html");
$("img.video").click(function(){ 
	var $divWidth = $('img.video').width(),$divHeight = $('img.video').height();  
	$('video').css({'height':$divHeight,'width':$divWidth}); 
	$(this).hide();
	$(".videoInfo").each(function(i,v){
		$(".videoInfo")[i].pause();
	 }); 
	var $vd=$(this).next("video");
	$vd.show(); 
	var md=$vd[0];//jq转为js 
	md.play();//必须把jq转为js   
}) 
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
	  try{
			if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
				md.addEventListener("pause", function(e) {  
					   //alert("d"); 
						$(this).hide();
						$(this)[0].pause();//这样就转为js了，就直接调用暂停
						$(this).prev("img").show(); 
				})
			}else{
				md.addEventListener("pause", function(e) {  
					   //alert("d"); 
						//$(this).hide();
						$(this)[0].pause();//这样就转为js了，就直接调用暂停
						//$(this).prev("img").show(); 
				})
			}
		}catch(e){} 
	md.addEventListener("webkitfullscreenchange", function() {
            if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
                //runPrefixMethod(document, "CancelFullScreen");
               //alert("我们");
            } else if (runPrefixMethod(this, "RequestFullScreen")) {
                alert("点击", "点击退出");
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



















