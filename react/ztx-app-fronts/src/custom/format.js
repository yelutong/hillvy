'use strict';

const format = {
	/*
  * 数字格式转换  3121----3,121 
  */
  replaceNum: (number) => {
    number = number+"";
    var str = "",n = 0;
    if(number.length>3){
      if(number.length%3==0){
        n = 3;
      }else if(number.length%3==1){
        n = 1;
      }else if(number.length%3==2){
        n = 2;
      }
      str += number.substring(0,n)+".";
      while(n<number.length){
        str += number.substring(n,n+3)+".";
        n = n+3;
      }
      return str.substring(0, str.length-1);
    }
    return number;
  },

  /*
  *@description 时间戳转化 日月年：02-09-2018
  */
  timestampToTime: (timestamp) => {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    //var h = date.getHours() + ':';
    //var m = date.getMinutes() + ':';
    //var s = date.getSeconds();
    //return Y+M+D+h+m+s;
    return D+'-'+M+'-'+Y;
  }

}

export default format
