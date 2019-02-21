// 域名
const urlHost = 'http://api.xy999888.cn/api/';//接口请求域名
const uploadPic = 'http://api.xy999888.com/api/'; //上传图片请求域名
// 接口
const ajaxUrl = {
  urlPic: 'http://pic.xy999888.com/', //图片请求域名
  uploadGoodsPic: uploadPic + 'upload/goods',//上传商品图片
  uploadPhoto: uploadPic + 'upload/userPhoto',//上传用户头像
  getBanners: urlHost + 'appadvertmanagement/carouselPic', //获取首页banner
  getFloorList: urlHost + 'appfloormanagement/listFloor', // 获取两大品牌
  getGoodsList: urlHost + 'goods/querygoodslist', // 获取商品列表
  getGoodsData: urlHost + 'goods/info/', // {id}获取商品详情
  getClassTree: urlHost + 'goodsclass/getAllclassTree',// 获取所有分类
  getClassBylevel: urlHost + 'goodsclass/getGoodsClassBylevel/',//{level}获取所有分类
  getChildsList: urlHost + 'goodsclass/getChilds/',//{id}根据当前分类主键获取下级分类集合
  getClassList: urlHost + 'goods/list',//{id}根据当前分类主键获取下级分类集合
  login: urlHost + 'user/login',//登录
  getRegCode: urlHost + 'smscode/send/reg/',//{userName}获取注册验证码
  getVerifyCode: urlHost + 'smscode/send/cash/',//{userName}获取身份验证码
  getFindPwdCode: urlHost + 'smscode/send/forget/',//{userName}获取注册验证码
  register: urlHost + 'user/register',//登录
  findPwd: urlHost + 'user/forgetPassword',//找回密码
  getUserData: urlHost + 'user/info',//获取个人中心信息
  getaddressList: urlHost + 'useraddress/list',//获取个人中心信息
  addAddr: urlHost + 'useraddress/save',//增加地址
  deleteAddr: urlHost + 'useraddress/delete/',//{ids}删除地址
  getAddrData: urlHost + 'useraddress/info/',//{id}根据id获取地址信息
  updateAddrData: urlHost + 'useraddress/update',//编辑更新收货地址
  getDefAddrData: urlHost + 'useraddress/defaultAddress',//获取默认收货地址
  AddGoodsCart: urlHost + 'goodscart/save',//加入购物车
  goodsCartUpdate: urlHost + 'goodscart/update',//修改购物车数量
  getCartList: urlHost + 'goodscart/list',//获取购物车列表
  getCartNum: urlHost + 'goodscart/goodsCount',//获取购物车数量
  getOrderForm: urlHost + 'orderform/save',//统一下单
  orderPriceNew: urlHost + 'orderform/orderPriceNew',//统一下单价格查询
  cancelOrder: urlHost + 'orderform/cancel/user/',//{orderNumber}取消订单
  payOrder: urlHost + 'orderform/payOrder',//微信支付订单
  payOrderList: urlHost + 'orderform/applist',//查看订单列表
  orderformInfo: urlHost + 'orderform/info/',//{orderNumber} 订单号查询订单详情
  loginOut: urlHost + 'user/logout',//退出登录
  deleteGoods: urlHost + 'goodscart/delete/',//{ids} 批量删除购物车
  uploadPhoto: uploadPic + 'upload/userPhoto',//上传用户头像
  infoUpdate: urlHost + 'user/info/update',//更新用户信息
  pwdUpdate: urlHost + 'user/updatePassword',//修改密码
  phoneUpdate: urlHost + 'user/updateUsername',//修改用户名
  orderCount: urlHost + 'orderform/orderCount',//获取个人订单歌状态数量
  userWallet: urlHost + 'userwallet/info',//查看钱包
  getOpenid: urlHost + 'user/wxOpenid/', //获取openid
  wxBind: urlHost + 'user/wxBind/', //{code}微信绑定
  receptGoods: urlHost + 'orderform/receipt/user/', //{orderNumber}用户确认收货
  saveGoodsComment: urlHost + 'orderformcomment/saveGoodsComment',//保存商品评论
  goodsCommentList: urlHost + 'orderformcomment/goodsCommentList',//商品评论列表
  wxShareSign: urlHost + "user/signWxUrl", //获取微信分享签名
}
// 返回模块
export default ajaxUrl;
