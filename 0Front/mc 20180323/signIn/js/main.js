$(function() { 
	
		var _handle = true,$dateBox = $("#js-qiandao-list"),$qiandaoBnt = $("#js-just-qiandao"),myDate = new Date();
		$dateBox.on("click", "li", function() {
			if ($(this).hasClass('able-qiandao') && _handle) {
				$(this).addClass('qiandao');
				//qiandaoFun();
			}
		}) //签到

		$qiandaoBnt.on("click", function() {
			if (_handle) { 
				commonUtil.request({
					url: usersignup,
					type: "get",  
					contentType: "application/json",
					success: function(data) {
						console.log(data);
						if(data.code == 1) {
							 qiandaoFun();
						}else{
							showmessage(data.msg);
						}
					}
				}) 
				  
				
			}else{
				showmessage("今日已签到<br>明日再来吧！")
			}
		}); //签到 
	
        function qiandaoFun() {
            $qiandaoBnt.addClass('actived'); 
            openLayer("qiandao-active", qianDao); 
            _handle = false;
			$("#js-just-qiandao").html("已签到"); 
        }

        function qianDao() {
            $(".date" + myDate.getDate()).addClass('qiandao');
        }
  

    function openLayer(a, Fun) {
        $('.' + a).fadeIn(Fun)
    } //打开弹窗

    var closeLayer = function() {
            $("body").on("click", ".close-qiandao-layer", function() {
                $(this).parents(".qiandao-layer").fadeOut()
            })
        }() //关闭弹窗

    $("#js-qiandao-history").on("click", function() {
        openLayer("qiandao-history-layer", myFun);

        function myFun() {
            console.log(1)
        } //打开弹窗返回函数
    })
 
	$(".qiandao-share").on("click",function(){
		window.location.reload();
		$(".qiandao-active").hide()
	}) 
	
})
