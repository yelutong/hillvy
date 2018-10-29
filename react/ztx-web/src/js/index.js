'use strict';
/*
*@ hepeichan
*/

/*
*一屏屏滑动
*/
/*$(() => {
  addEventListener("DOMContentLoaded",function(){
    var body=document.body,html=document.documentElement;
    var itv,height=document.body.offsetHeight;
    //var page=scrollTop()/height|0;
    var page = 0
    //窗口大小改变事件
    addEventListener("resize",onresize),onresize();
    //滚轮事件
    document.body.addEventListener(
      "onwheel" in document?"wheel":"mousewheel",
      function(e){
        clearTimeout(itv);
        itv=setTimeout(function(){
          var delta=e.wheelDelta/120||-e.deltaY/3;
          page-=delta;
          var max=(document.body.scrollHeight/height|0)-1;
          if(page<0)return page=0;
          if(page>max)return page=max;
          move();
        },100);
        e.preventDefault();
      }
    );
    //平滑滚动
    function move(){
      var value=height*page;
      var diff=scrollTop()-value;
      (function callee(){
        diff=diff/1.2|0;
        scrollTop(value+diff);
        if(diff)itv=setTimeout(callee,16);
      })();
    };
    //resize事件
    function onresize(){
      height=body.offsetHeight;
      move();
    };
    //获取或设置scrollTop
    function scrollTop(v){
      if(v==null)return Math.max(body.scrollTop,html.scrollTop);
      else body.scrollTop=html.scrollTop=v;
    };
  });
})*/

