var api ="https://api.mcyou.net/";//"http://192.168.1.65:8080/eshop/";//;//;
var photo = "https://pic.mcyou.net/";
var papi = "https://api.mcyou.net/";
var promoter = api + "api/user/info/promoter/";
var userShare = api + "api/user/userShare";
var register = api + 'api/user/register';
var login = api + "api/user/login";
var userUpdate = api + "api/user/info/update";
var forgetPassword = api + 'api/user/forgetPassword';
var userPhoto = papi + "api/upload/userPhoto";
var userinfo = api + "api/user/info";
var updatePwd = api + "api/user/updatePassword";
var listAreaByParentId = api + "api/area/listAreaByParentId/";
var useraddressSave = api + 'api/useraddress/save';
var defaultAddress = api + 'api/useraddress/defaultAddress';
var useraddressList = api + "api/useraddress/list/";
var useraddressDelete = api + "api/useraddress/delete/";
var useraddressInfo = api + "api/useraddress/info/";
var useraddressUpdate = api + "api/useraddress/update/"; 
var goodsinfo = api + "api/goods/info/";
var goodsDetail = api + 'api/goods/info/';
var goodsList = api + "api/goods/list";
var saveGoodscart = api + "api/goodscart/save/";
var goodscartDelete = api + "api/goodscart/delete/";
var goodsDetail = api + 'api/goods/info/';
var addGoodsToCart = api + 'api/goodscart/save';
var updateGoodsToCart = api + 'api/goodscart/update';
var goodsCartList = api + 'api/goodscart/list';
var getGoodsCount = api + 'api/goodscart/goodsCount';
var queryOrderPrice = api + 'api/orderform/orderPrice';
var orderPriceNew=api+"api/orderform/orderPriceNew";
var saveOrder = api + 'api/orderform/save';
var queryUserOrderList = api + 'api/orderform/applist';
var cancelOrder = api + 'api/orderform/cancel/user/';
var payOrder = api + 'api/orderform/payOrder';
var orderDatailById = api + 'api/orderform/info/';
var carouselPic = api + "api/appadvertmanagement/carouselPic";
var getAllFloor = api + "api/appfloormanagement/getAllFloor";
var goodsbrandList = api + "api/goodsbrand/list";
var regSmscode = api + "api/smscode/send/reg/";
var forgetSmscode = api + "api/smscode/send/forget/";
var wxShareSign = api + "api/user/wxShareSign";
var userWalletInfo = api + "api/userwallet/info";
var directUser = api + "api/user/listDirectUser";
var indirectUser = api + "api/user/listIndirectUser";
var financepackageList = api + "api/orderformfinancepackage/list";
var financepackageactive = api + "api/orderformfinancepackage/active";
var statistics_info = api + "api/statistics/info";
var statistics_rule = api + "api/statistics/rule";
var dayUserList = api + "api/statistics/dayUserList";
var queryInfoTotal = api + "api/statistics/queryInfoTotal";
var memberUserList = api + "api/statistics/memberUserList";
var memberDetailList = api + "api/statistics/memberDetailList";
var memberDetailHead = api + "api/statistics/memberDetailHead";
var newListFloor = api + "api/appfloormanagement/listFloor";
var info_openid = api + "api/user/info/openid/";
var bindOpenId = api + "api/user/bindOpenId/";
var sellerstore = api + "api/sellerstore/info/";
var webPayOrder = api + "api/orderform/webPayOrder";
var sendCash = api + "api/smscode/send/cash/";
var wxDirectBuy = api + "api/orderformpromote/wxDirectBuy";
var articleList = api + "api/article/list";
var userCouponList = api + "api/userCoupon/list";
var orderforpay = api + "api/orderformoutlinepay/list";
var orderforpayinfo = api + "api/orderformoutlinepay/info/";
var takeCoupon = api + "api/userCoupon/takeCoupon";
var goodsCollectList = api + "api/goods/goodsCollectList";
var storecollectlist = api + "api/sellerstore/storecollectlist";
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
var integralGoodsList =api+"api/goods/integralGoodsList";//兑换区列表


var formmatMobile = function(mobile) {
		var formmat = mobile;
		if (mobile.length >= 11) {
			formmat = formmat.substr(0, 3) + '****' + formmat.substr(7)
		}
		return formmat
	}
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
			break
		}
		return des
	};
var slice = function(obj) {
		obj.split(",").join(" ");
		return obj
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
var USER_LEVEL = "user_level";
var PROXY_LEVEL = "proxy_level";
var REAL_NAME = "real_name";
var AVATAR = "user_avatar";
var USER_ID = "user_id";
var ORDER_WAIT_PAY = 10;
var ORDER_CANCEL = 0;
var ORDER_PAY = 20;
var saveUser = function(user) {
		localStorage.setItem(LOGIN_STATE, true);
		localStorage.setItem(USER_NAME, user.userName);
		localStorage.setItem(USET_TYPE, user.userType);
		localStorage.setItem(USER_LEVEL, user.userLevel);
		localStorage.setItem(PROXY_LEVEL, user.proxyLevel);
		localStorage.setItem(AVATAR, user.imageId);
		localStorage.setItem(IS_VERIFY, user.isVerify);
		localStorage.setItem(REAL_NAME, user.realName);
		localStorage.setItem(USER_ID, user.id)
	}
var exitLogin = function() {
		localStorage.clear();
		window.location.href = "login.html"
	}
var getToken = function() {
		return localStorage.getItem(TOKEN)
	}
var getLoginState = function() {
		var state = localStorage.getItem(LOGIN_STATE);
		state = state == null || state == '' || state == 'null' ? false : true;
		return state
	}
var getUserId = function() {
		return localStorage.getItem(USER_ID)
	}
var getUserName = function() {
		var username = localStorage.getItem(USER_NAME);
		username = formmatMobile(username);
		return username
	}
var getNotFormmatUserName = function() {
		var username = localStorage.getItem(USER_NAME);
		return username
	}
var getRealName = function() {
		var real = localStorage.getItem(REAL_NAME);
		if (real == 'null') {
			real = ""
		}
		return real
	}
var formmatRealName = function(realName) {
		var formmat = realName;
		if (realName == null || realName == '' || realName.length == 0) {
			formmat = '***'
		}
		return formmat
	}
var getUserType = function() {
		return localStorage.getItem(USET_TYPE)
	}
var getUserLevel = function() {
		return parseInt(localStorage.getItem(USER_LEVEL))
	}
var getProxyLevel = function() {
		return parseInt(localStorage.getItem(PROXY_LEVEL))
	}
var getIsVerify = function() {
		var ve = localStorage.getItem(IS_VERIFY);
		ve = ve == null || ve == 'null' ? false : ve;
		return ve
	}
var getAvatar = function() {
		var userAvatar = localStorage.getItem(AVATAR);
		if (userAvatar == undefined || userAvatar == "null" || userAvatar == null || userAvatar == "") {
			userAvatar = "images/car1.jpg"
		} else {
			userAvatar = photo + userAvatar
		}
		return userAvatar
	}
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
			break
		}
		return des
	};

function getParams(key) {
	var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2])
	}
	return null
};

function replaceAll(src, beforeStr, afterStr) {
	return src.replace(new RegExp(beforeStr, "gm"), afterStr)
}
function SetCookie(cookieName, cookieValue, nDays) {
	var today = new Date();
	var expire = new Date();
	if (nDays == null || nDays == 0) nDays = 1;
	expire.setTime(today.getTime() + 3600000 * 24 * nDays);
	document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString()
}
function ReadCookie(cookieName) {
	var theCookie = "" + document.cookie;
	var ind = theCookie.indexOf(cookieName);
	if (ind == -1 || cookieName == "") return "";
	var ind1 = theCookie.indexOf(';', ind);
	if (ind1 == -1) ind1 = theCookie.length;
	return unescape(theCookie.substring(ind + cookieName.length + 1, ind1))
}
function priceFormatte(price) {
	var priceDes = price;
	if (price > 10000) {
		priceDes = price / 10000 + "万"
	}
	return priceDes
}
Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt
}
var formatTime = function(time) {
		if (time < 0 || time == null || time == 'null') {
			return ''
		}
		return new Date(time).Format("yyyy-MM-dd hh:mm:ss")
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
			break
		}
		return des
	}