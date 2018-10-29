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
    }

}

export default format
