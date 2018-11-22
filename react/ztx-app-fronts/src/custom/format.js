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
  timestampToTime: (timestamp,type) => {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    //获取英文月份
    //一月Jan，二月Feb，三月Mar，四月Apr，五月May，六月June，七月July，八月Aug，九月Sept，十月Oct，十一月Nov，十二月Dec
    M = M == '01'?'JAN':M == '02'?'FEB':M == '03'?'MAR':M == '04'?'APR':M == '05'?'MAY':M == '06'?'JUNE':M == '07'?'JULY':M == '08'?'AUG':M == '09'?'SEPT':M == '10'?'OCT':M == '11'?'NOV':M == '12'?'DEC':'JAN'
    if(!type){
      return D+'-'+M+'-'+Y;
    }else if(type == 'year'){
      return Y;
    }else if(type == 'month'){
      return M;
    }else if(type == 'day'){
      return D;
    }else{
      return D+'-'+M+'-'+Y;
    }
  }

}

export default format
