var api ="https://api.mcyou.net/"//http://api.mcyou.net/";//http://192.168.1.65:8080/eshop/
var photo = "https://pic.mcyou.net/";//"http://127.0.0.1:8089/明昌科技/";//看图片的地址
var papi ="https://api.mcyou.net/";//外网 上传图片的地址

var promoter=api+"api/user/info/promoter/";//根据主键id查询用户信息
var userShare=api+"api/user/userShare";//推广注册
var register=api+'api/user/register';//注册
var login = api+"api/user/login";//登录
var userUpdate=api+"api/user/info/update";//修改会员信息
//var sendCode=api+'api/smscode/sendCode/';//发送短信
var forgetPassword=api+'api/user/forgetPassword';//忘记密码
var userPhoto=papi+"api/upload/userPhoto";//上传头像
var userinfo=api+"api/user/info";//查看会员信息
var updatePwd=api+"api/user/updatePassword";//更新密码
var listAreaByParentId=api+"api/area/listAreaByParentId/";//获取省-市-区列表 
var useraddressSave=api+'api/useraddress/save';//保存地址
var defaultAddress=api+'api/useraddress/defaultAddress';//获取订单默认地址
var useraddressList=api+"api/useraddress/list/"; //获取订单地址列表
var useraddressDelete=api+"api/useraddress/delete/";//删除地址
var useraddressInfo=api+"api/useraddress/info/";//根据主键获取地址详情
var useraddressUpdate=api+"api/useraddress/update/";//修改地址 
var goodsCartList=api+'api/goodscart/list';//获取购物车商品
var goodsinfo=api+"api/goods/info/";//商品详情
///var goodsinfo=api+"api/goods/info/";//商品详情
var goodsDetail=api+'api/goods/info/';////添加商品购物车
var goodsList=api+"api/goods/list";//商品列表
var saveGoodscart=api+"api/goodscart/save/";//添加购物车
var goodscartDelete=api+"api/goodscart/delete/";//批量删除购物车


var goodsDetail=api+'api/goods/info/';////添加商品购物车
var addGoodsToCart=api+'api/goodscart/save';////添加商品购物车
var updateGoodsToCart=api+'api/goodscart/update';////更新购物车商品数量
var goodsCartList=api+'api/goodscart/list';////获取购物车商品
var getGoodsCount=api+'api/goodscart/goodsCount';////获取购物车商品

var queryOrderPrice=api+'api/orderform/orderPrice';//下单价格查询
var orderPriceNew=api+"api/orderform/orderPriceNew";//统一下单价格查询


var saveOrder=api+'api/orderform/save';//下单
var queryUserOrderList=api+'api/orderform/applist';//用户订单列表

var cancelOrder=api+'api/orderform/cancel/user/';//取消用户订单
var payOrder=api+'api/orderform/payOrder';//支付订单
var orderDatailById=api+'api/orderform/info/'; //订单号查询订单详情

var carouselPic=api+"api/appadvertmanagement/carouselPic";//轮播图
var getAllFloor=api+"api/appfloormanagement/getAllFloor";//获取楼层
var goodsbrandList=api+"api/goodsbrand/list";//获取品牌序列


var regSmscode=api+"api/smscode/send/reg/";//注册短信验证码
var forgetSmscode=api+"api/smscode/send/forget/";//发送忘记密码短信
var wxShareSign=api+"api/user/wxShareSign"; //获取微信分享签名

var userWalletInfo=api+"api/userwallet/info";//用户钱包 查看钱包

//我的团队
var directUser=api+"api/user/listDirectUser";//我的一级推广
var indirectUser=api+"api/user/listIndirectUser";//我的二级推广

//套餐
var financepackageList=api+"api/orderformfinancepackage/list";//获取我的套餐
var financepackageactive=api+"api/orderformfinancepackage/active";//激活套餐
 
//统计
var statistics_info=api+"api/statistics/info";//数据统计
var statistics_rule=api+"api/statistics/rule";//数据权限 
var dayUserList=api+"api/statistics/dayUserList";//统计今日会员
var queryInfoTotal=api+"api/statistics/queryInfoTotal";//统计页第一页头部信息
var memberUserList=api+"api/statistics/memberUserList";//统计会员总数列表及搜索
var memberDetailList=api+"api/statistics/memberDetailList";//统计用户推广详情信息
var memberDetailHead=api+"api/statistics/memberDetailHead";//用户详情页面头部信息
 


var newListFloor=api+"api/appfloormanagement/listFloor";//获取楼层列表 临时
var info_openid=api+"api/user/info/openid/";//分享注册页获取推荐用户信息
var bindOpenId=api+"api/user/bindOpenId/";//分享绑定微信
var sellerstore=api+"api/sellerstore/info/";//根据店铺主键查询店铺信息
var webPayOrder=api+"api/orderform/webPayOrder";//微信支付
var sendCash=api+"api/smscode/send/cash/";//提现短信验证码
var wxDirectBuy=api+"api/orderformpromote/wxDirectBuy";//微信分享生成下单信息
var articleList =api+"api/article/list";//资讯
var userCouponList=api+"api/userCoupon/list";//用户优惠券列表
var orderforpay=api+"api/orderformoutlinepay/list";//活动支付列表
var orderforpayinfo=api+"api/orderformoutlinepay/info/";//微信支付-订单查询
var takeCoupon=api+"api/userCoupon/takeCoupon";//领取购物券

var goodsCollectList=api+"api/goods/goodsCollectList";//商品收藏列表
var storecollectlist=api+"api/sellerstore/storecollectlist";//店铺收藏列表
var goodscollect = api + "api/goods/goodscollect/";
var storecollect = api + "api/sellerstore/storecollect/";
var allowedCoupon = api+"api/orderform/allowedCoupon";

var turnplateinfo = api+"api/slyderadventures/turnplateinfo";//获取大转盘信息
var trunturnplate = api+"api/slyderadventures/runturnplate";//抽奖结果
var awardslist = api+"api/slyderadventures/awardslist";//获取中奖记录


var userawardslist = api+"api/slyderadventures/userawardslist";//获取个人中奖记录
var Awardaddress=api+"api/slyderadventures/saveaddress";//抽中商品保存地址提交
var usersignlist=api+"api/usersign/list";//用户已签到列表
var nowmonth=api+"api/usersign/nowmonth";//获取当月签到信息
var activitysignlist=api+"api/activitysign/list";//签到活动信息
var usersignup=api+"api/usersign/signup";//用户签到
var noaddressawardslist=api+"api/slyderadventures/noaddressawardslist";//抽奖未填写收货地址
var takesignaward =api+"api/usersign/takesignaward";//签到活动领取奖品


var formmatMobile = function(mobile){//把11位手机号的中间四位用*代替
	var formmat = mobile;
	
	if(mobile.length >= 11){
		formmat = formmat.substr(0, 3) + '****' + formmat.substr(7);
	}
	
	return formmat;
}
/**
 * 会员等级描述
 */
var userLevelDes = function(userLevel) {
	var des;

	switch (userLevel) {
	case 1:
		des = "普通会员";
		break;
	case 2:
		des = "创客会员";
		break; 
	default:
		break;
	}

	return des;
};
var slice = function(obj){//切割数组 
	obj.split(",").join(" "); 
	
	return obj;
}
 

var upload = api + "api/upload/user_upload/";
var userApi = api + "api/user/"; 
var goodsClassApi = api + "api/goodsclass/";
var goodsApi = api + "api/goods/";
var orderApi = api + "api/order/";
var agentApi = api + "api/agent/";
var verifyApi = api + "api/verify/";
var walletApi = api + "api/userwallet/";
var agentWalletApi = api + "api/agent_wallet/";
var cashApi = api + "api/cash/";

var TOKEN = "token";
var LOGIN_STATE = "login_state";
var USET_TYPE = "user_type";
var USER_NAME = "user_name";
var IS_VERIFY = "is_verify";
// 0-普通会员，1-正式会员，2-以租代购会员，3-VIP会员
var USER_LEVEL = "user_level";
// proxy_level
var PROXY_LEVEL = "proxy_level";
var REAL_NAME = "real_name";
var AVATAR = "user_avatar";
var USER_ID = "user_id";

var ORDER_WAIT_PAY = 10;
var ORDER_CANCEL = 0;
var ORDER_PAY = 20;

var saveUser = function(user){
	localStorage.setItem(LOGIN_STATE, true);
	localStorage.setItem(USER_NAME, user.userName);
	localStorage.setItem(USET_TYPE, user.userType);
	localStorage.setItem(USER_LEVEL, user.userLevel);
	localStorage.setItem(PROXY_LEVEL, user.proxyLevel);
	localStorage.setItem(AVATAR, user.imageId);
	localStorage.setItem(IS_VERIFY, user.isVerify);
	localStorage.setItem(REAL_NAME, user.realName);
	localStorage.setItem(USER_ID, user.id);
}

var exitLogin = function(){
	localStorage.clear();
	window.location.href = "login.html";
}

var getToken = function(){
	return localStorage.getItem(TOKEN);
}

var getLoginState = function(){
	var state = localStorage.getItem(LOGIN_STATE);
	state = state == null || state == '' || state =='null' ? false  : true;
	return state;
}

var getUserId = function(){
	return localStorage.getItem(USER_ID);
}

var getUserName = function(){
	var username = localStorage.getItem(USER_NAME);
	username = formmatMobile(username);
	return username;
}

var getNotFormmatUserName = function(){
	var username = localStorage.getItem(USER_NAME);
	return username;
}



var getRealName = function(){
	var real = localStorage.getItem(REAL_NAME);
	if(real == 'null'){
		real = "";
	}
	return real;
}

var formmatRealName = function(realName){
	var formmat = realName;
	
	if(realName == null || realName == '' || realName.length == 0){
		formmat = '***';
	}
	
	return formmat;
}

var getUserType = function(){
	return localStorage.getItem(USET_TYPE);
}

var getUserLevel = function(){
	return parseInt(localStorage.getItem(USER_LEVEL));
}

var getProxyLevel = function(){
	return parseInt(localStorage.getItem(PROXY_LEVEL));
}

var getIsVerify = function(){
	var ve = localStorage.getItem(IS_VERIFY);
	ve = ve == null || ve =='null' ? false : ve;
	return ve;
}

var getAvatar = function(){
	var userAvatar = localStorage.getItem(AVATAR);
	
	if(userAvatar == undefined || userAvatar == "null" || userAvatar == null || userAvatar == "") {
		userAvatar = "images/car1.jpg";
	}else{
		userAvatar = photo + userAvatar;
	}
	
	return userAvatar;
}



/**
 * 代理商等级描述
 */
var proxyDes = function(proxyLevel) {
	var des = "非代理商";

	switch (proxyLevel) {
	case 1:
		des = "特许经销商";
		break;
	case 2:
		des = "市代理商";
		break;
	case 3:
		des = "省代理商";
		break;
	default:
		break;
	}

	return des;
};

function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

function replaceAll(src, beforeStr, afterStr){
	return src.replace(new RegExp(beforeStr,"gm"),afterStr);
}

/***
* @param {string} cookieName Cookie名称
* @param {string} cookieValue Cookie值
* @param {number} nDays Cookie过期天数
*/
function SetCookie(cookieName,cookieValue,nDays) {
    /*当前日期*/
    var today = new Date();
    /*Cookie过期时间*/
    var expire = new Date();
    /*如果未设置nDays参数或者nDays为0，取默认值1*/
    if(nDays == null || nDays == 0) nDays = 1;
    /*计算Cookie过期时间*/
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    /*设置Cookie值*/
    document.cookie = cookieName + "=" + escape(cookieValue)
        + ";expires=" + expire.toGMTString();
}

/***
*读取指定的Cookie值
*@param {string} cookieName Cookie名称
*/
function ReadCookie(cookieName) {
    var theCookie = "" + document.cookie;
    var ind = theCookie.indexOf(cookieName);
    if(ind==-1 || cookieName=="") return "";
    var ind1 = theCookie.indexOf(';',ind);
    if(ind1==-1) ind1 = theCookie.length;
    /*读取Cookie值*/
    return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
}

function priceFormatte(price){
	var priceDes = price;
	
	if (price > 10000) {
		priceDes = price / 10000 + "万";
	}
	
	return priceDes;
}

Date.prototype.Format = function (fmt) {
	 var o = {
	     "M+": this.getMonth() + 1, // 月份
	     "d+": this.getDate(), // 日
	     "h+": this.getHours(), // 小时
	     "m+": this.getMinutes(), // 分
	     "s+": this.getSeconds(), // 秒
	     "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
	     "S": this.getMilliseconds() // 毫秒
	 };
	 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	 for (var k in o)
	 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	 return fmt;
}

var formatTime = function(time){
	if(time < 0 || time == null || time == 'null'){
		return '';
	}
	return new Date(time).Format("yyyy-MM-dd hh:mm:ss");
}

var getOrderDes = function(state) {
	var des = "";

	switch (state) {
	case ORDER_WAIT_PAY:
		des = "待支付"
		break;
	case ORDER_PAY:
		des = "已支付"
		break;
	case ORDER_CANCEL:
		des = "已取消"
		break;
	default:
		break;
	}

	return des;
}

 