const DateApi = {
    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },
    /**
     * 把时间戳毫秒 格式化 如 2018-08-09 12:00:09
     */
    format(date) {//这里的date必须是数字类型，不要使用字符串类型
       date = new Date(date);
        var y=date.getFullYear();
        var m=date.getMonth()+1;
        var d=date.getDate();
        var h=date.getHours();
        var m1=date.getMinutes();
        var s=date.getSeconds();
        m = m<10?("0"+m):m;
        d = d<10?("0"+d):d;
        h = h<10?("0"+h):h;
        m1 = m1<10?("0"+m1):m1;
        s = s<10?("0"+s):s;
        return y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
    },
    /**
     * 把时间戳毫秒 格式化 如 25-May-2018
     */
    format2(date) {
        date = new Date(date);
        var monthsInEng=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var y=date.getFullYear();
        var m=monthsInEng[date.getMonth()];
        var d=date.getDate();
        d = d<10?("0"+d):d;
        return d+"-"+m+"-"+y;
    },
    /**
     * 把时间戳毫秒 格式化 如 12:00 25-May-2018
     */
    format3(date) {
        date = new Date(date);
        var monthsInEng=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        var y=date.getFullYear();
        var m=monthsInEng[date.getMonth()];
        var d=date.getDate();
        var h=date.getHours();
        var m1=date.getMinutes();
        d = d<10?("0"+d):d;
        h = h<10?("0"+h):h;
        m1 = m1<10?("0"+m1):m1;
        return d+"-"+m+"-"+y+" "+h+":"+m1;
    },
    /**
     * 剩余天数 如 剩余3天
     */
    DateDiff(date) {
        var aDate,iDays;
        aDate = new Date(date);
        iDays = new Date();
        iDays = parseInt(Math.abs(aDate - iDays) / 1000 / 60 / 60 / 24)+1; //把相差的毫秒数转换为天数
        return iDays;  //返回相差天数
    },
    /**
     * 每三位数加逗/点号 如 10000  转换后为 10,000
     */
    addCommas(str){
        var newStr = "";
        var count = 0;
        // 当数字是整数 
        str=""+str;
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;//这里用 点号连接
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; //自动补小数点后两位 '.00'
            return str;
        }
        // 当数字带有小数  
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "." + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str;
        } 
    },
    /**
     * 每三位数加逗/点号 如 10000  转换后为 10.000
     */
    addDot(str){
        var newStr = "";
        var count = 0;
        // 当数字是整数 
        str=""+str;
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "." + newStr;//这里用 点号连接
                } else {
                    newStr = str.charAt(i) + newStr;//charAt位置,由高到低即从最右边的个位开始遍历
                }
                count++;
            }
            str = newStr + ""; //去掉自动补小数点后两位 '.00'
        }
        // 当数字带有小数  不处理
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "." + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 0);
        } 
      return str;
    },
    /**
     * 审批状态
     */
   getResult(val){
   var result;
   switch (val) {
    case 'APPROVE':
        result = "Dalam persetujuan";//审批中
        break;
    case 'LOAN':
        result = "Dalam pinjaman.";//放款中
        break;
    case 'REPAY':
        result = "Berhasil pinjaman";//放款成功
        break;
    case 'REJECTED':
        result = "Persetujuan menolak";//审批拒绝
        break;   
    default:
        result = "Pinjaman gagal";//放款失败                
   }
   return result;
  }
    
}
export default DateApi;
