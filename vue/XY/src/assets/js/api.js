// 域名
const urlHost = 'http://api.xy999888.cn/api/';//接口请求域名
const ajaxHost = 'https://mg.xjjxsd.cn/api/mp';
// 接口
const ajaxUrl = {
  urlPic: 'http://pic.xy999888.com/', //图片请求域名
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
  getOrderForm: urlHost + 'orderform/save',//统一下单
  orderPriceNew: urlHost + 'orderform/orderPriceNew',//统一下单价格查询
  cancelOrder: urlHost + 'orderform/cancel/user/',//{orderNumber}取消订单
  payOrder: urlHost + 'orderform/payOrder',//微信支付订单
  payOrderList: urlHost + 'orderform/applist',//查看订单列表
  orderformInfo: urlHost + 'orderform/info/',//{orderNumber} 订单号查询订单详情


  getShareQr: ajaxHost + '/wx/p/user/get_share_qrcode_by_user_id.json', // 根据用户id生成二维码
  getShareArgs: ajaxHost + '/wx/p/user/share_to_friend.json', // 获取微信分享所需的参数
  getToken: ajaxHost + '/wx/p/authentication/get_token_by_openid.json', // 根据用户openid获取token
  getUserInfo: ajaxHost + '/wx/p/user/get_user_info.json', // 获取用户信息
  getMobileCode: ajaxHost + '/wx/p/user/send_mobile_sms_code_reg.json', // 获取短信验证码
  bindNewUser: ajaxHost + '/wx/p/user/reg_user.json', // 新用户绑定注册
  getBanner: ajaxHost + '/wx/p/index/get_banner_list.json', // 获取banner图列表
  getDaily: ajaxHost + '/wx/p/news/get_news_express_list.json', // 获取每日快报列表  
  getDailyInfo: ajaxHost + '/wx/p/news/get_express_by_express_id.json', // 获取快报详情
  getBrand: ajaxHost + '/wx/p/index/get_product_brand_list.json', // 获取两大品牌
  getActivity: ajaxHost + '/wx/p/index/get_activity_banner_list.json', // 获取活动banner
  getMeals: ajaxHost + '/wx/p/index/get_product_list.json', // 获取首页热门套餐列表
  getNews: ajaxHost + '/wx/p/news/get_news_news_list.json', // 获取新闻资讯列表
  getNewsInfo: ajaxHost + '/wx/p/news/get_news_by_news_id.json', // 获取新闻资讯详情
  getNewsVideo: ajaxHost + '/wx/p/news/get_news_video_list.json', // 获取资讯页视频
  getVideos: ajaxHost + '/wx/p/media/get_media_culture_video_list.json', // 获取视频列表 
  getCollects: ajaxHost + '/wx/p/product/get_products_from_buy_collection.json', // 获取我的收藏
  addCollect: ajaxHost + '/wx/p/product/add_product_to_buy_collection.json', // 加入收藏
  removeCollect: ajaxHost + '/wx/p/product/del_product_from_buy_collection.json', // 取消收藏
  ifGoodsCollect: ajaxHost + '/wx/p/product/check_product_from_buy_collection.json', // 判断商品是否被收藏  
  getGoodsMain: ajaxHost + '/wx/p/product/get_product_by_product_id.json', // 获取商品详情主体
  getGoodsDetail: ajaxHost + '/wx/p/product/get_product_detail_by_product_id.json', // 获取商品图文详情
  getGoodsEva: ajaxHost + '/wx/p/product/get_product_evaluate.json', // 获取商品评价列表
  getNoEva: ajaxHost + '/wx/p/order/get_products_to_evaluate.json', // 评价中心（未评价过的商品列表）
  evaGoods: ajaxHost + '/wx/p/product/save_product_evaluate.json', // 进行商品评价
  evaService: ajaxHost + '/wx/p/product/save_store_evaluate.json', // 进行店铺服务评价
  uploadImages: ajaxHost + '/wx/p/product/upload_evaluate_image.json', // 商品评价图片上传
  getAddresses: ajaxHost + '/wx/p/order/get_user_order_address.json', // 获取所有收货地址
  getAddress: ajaxHost + '/wx/p/order/get_order_address.json', // 获取单条收货地址
  getAutoAddress: ajaxHost + '/wx/p/order/get_default_order_address.json', // 获取默认收货地址
  setAutoAddress: ajaxHost + '/wx/p/order/update_order_address_status.json', // 设置为默认地址
  addAddress: ajaxHost + '/wx/p/order/save_order_address_applet.json', // 新增一条收货地址
  editAddress: ajaxHost + '/wx/p/order/update_order_address.json', // 编辑一条收货地址
  delAddress: ajaxHost + '/wx/p/order/delete_order_address.json', // 删除一条收货地址
  getOrders: ajaxHost + '/wx/p/order/get_order_list.json', // 获取所有订单
  getOrderInfo: ajaxHost + '/wx/p/order/get_order_detail.json', // 获取订单详情
  getExpress: ajaxHost + '/wx/p/order/get_logistics_info.json', // 获取物流信息
  getFreight: ajaxHost + '/wx/p/order/get_logistics_info_fee.json', // 获取物流运费
  receiptGoods: ajaxHost + '/wx/p/order/confirm_receive_product.json', // 确认收货
  makeOrder: ajaxHost + '/wx/p/order/create_order.json', // 创建订单

  uploadFrontUID: ajaxHost + '/wx/p/user/upload_positive_card.json', // 上传身份证正面照
  uploadEndUID: ajaxHost + '/wx/p/user/upload_reverse_card.json', // 上传身份证反面照
  getWalletInfo: ajaxHost + '/wx/p/user/get_user_reward_detail.json', // 获取我的分红明细（钱包）
  bindBankCard: ajaxHost + '/wx/p/user/user_add_bank_card.json', // 绑定银行卡
  getBankCard: ajaxHost + '/wx/p/user/get_user_bank_cards.json', // 获取已绑定的银行卡
  delBankCard: ajaxHost + '/wx/p/user/del_user_bank_card.json', // 删除绑定的银行卡
  goldAmount: ajaxHost + '/wx/p/user/get_user_reward_amount.json', // 获取用户的分红积分
  applyGetGold: ajaxHost + '/wx/p/user/user_apply_take_cash.json', // 申请提现
  getGoldRecord: ajaxHost + '/wx/p/user/get_user_take_cash_record.json', // 提现记录
  getGoldDetail: ajaxHost + '/wx/p/user/get_user_apply_take_cash_status.json', // 提现明细
  getSeniorNosend: ajaxHost + '/wx/p/orderservice/get_serice_biz_unsend_order_list.json', // 获取服务商未分配的订单
  getSeniorHassend: ajaxHost + '/wx/p/orderservice/get_serice_biz_send_order_list.json', // 获取服务商已分配的订单
  getSeniorDetail: ajaxHost + '/wx/p/orderservice/get_serice_biz_order_detail.json', // 获取服务商的订单详情
  getJuniors: ajaxHost + '/wx/p/orderservice/get_serice_sites_by_service_biz.json', // 获取服务商下面的服务点  
  seniorToJunior: ajaxHost + '/wx/p/orderservice/service_biz_move_order_to_site.json', // 服务商分配订单给服务点
  seniorToPlat: ajaxHost + '/wx/p/orderservice/move_serice_biz_unsend_order_to_platform.json', // 服务商转单给平台
  getJuniorNosend: ajaxHost + '/wx/p/orderservice/get_serice_site_unsender_orders.json', // 获取服务点未发货订单
  getJuniorHassend: ajaxHost + '/wx/p/orderservice/get_serice_site_sender_orders.json', // 获取服务点已发货订单
  getJuniorDetail: ajaxHost + '/wx/p/orderservice/get_serice_site_order_detail.json', // 获取服务点的订单详情
  getJuniorExpress: ajaxHost + '/wx/p/orderservice/get_serice_site_logistics.json', // 获取服务点可选物流
  juniorSend: ajaxHost + '/wx/p/orderservice/service_site_send_order.json', // 服务点接单发货
  juniorToPlat: ajaxHost + '/wx/p/orderservice/move_serice_site_unsend_order_to_platform.json', // 服务点转单给平台
}
// 返回模块
export default ajaxUrl;
