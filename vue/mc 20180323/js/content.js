function fixPagesHeight() {
	$('.swiper-slide').css({
		height: $(window).height()-250
	})
	$('.swiper-slide .main-img').css({
		height: $(window).height()-260
	})
}
$(window).on('resize', function() {
	fixPagesHeight();
})
fixPagesHeight();



 function load (){  
   
    document.addEventListener('touchstart',touch, false);  
    document.addEventListener('touchmove',touch, false);  
    document.addEventListener('touchend',touch, false);   
	 
    function touch (event){  
        var event = event || window.event;  
           
        var oInp = document.getElementById("pagination");  
		
		//console.log(event.type);
        
        switch(event.type){  
            case "touchstart":   
				$(".swiper-pagination-bullet img").attr("src","images/sj.png");
				$(".swiper-pagination-bullet-active img").attr("src","images/sj1.png");
               // oInp.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";  
                break;  
            case "touchend":  
				$(".swiper-pagination-bullet img").attr("src","images/sj.png");
				$(".swiper-pagination-bullet-active img").attr("src","images/sj1.png");
                //oInp.innerHTML = "<br>Touch end (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";  
                break;  
            case "touchmove":  
				$(".swiper-pagination-bullet img").attr("src","images/sj.png");
				$(".swiper-pagination-bullet-active img").attr("src","images/sj1.png");
                //event.preventDefault();   
                //oInp.innerHTML = "<br>Touch moved (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";  
                break; 
			 
        }  
           
    }  
}  
window.addEventListener('load',load, false);  

$(".swiper-pagination-bullet").click(function(){ 
	$(".swiper-pagination-bullet img").attr("src","images/sj.png");
	$(this).find("img").attr("src","images/sj1.png");
	
})