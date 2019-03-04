import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 页面路由 ---------------------------------------
// 首页 --------------------------------
const index = () =>
  import ('@/views/index'); // 首页
  // 首页 --------------------------------
const vGoods = () =>
  import ('@/views/vGoods/index'); // 小V
// 分享引导页 --------------------------
const share = () =>
  import ('@/views/share'); // 分享点进来的页面
// 商品 --------------------------------  
const goods = () =>
  import ('@/views/goods/goods'); // 商品主体
const goodsinfo = () =>
  import ('@/views/goods/goodsinfo'); // 商品图文详情
const goodseva = () =>
  import ('@/views/goods/goodseva'); // 商品评价列表
const goodsCart = () =>
  import ('@/views/goods/goodsCart'); // 购物车
const cart = () =>
  import ('@/views/goods/cart'); // 结算购物车商品
const pay = () =>
  import ('@/views/goods/pay'); // 支付
const orders = () =>
  import ('@/views/goods/orders'); // 商品订单列表
const orderDetail = () =>
  import ('@/views/goods/orderDetail'); // 商品订单详情 
const ordercenter = () =>
  import ('@/views/goods/ordercenter'); // 商品订单中心
const evagoods = () =>
  import ('@/views/goods/evagoods'); // 评价商品
const evaserve = () =>
  import ('@/views/goods/evaserve'); // 评价服务
const express = () =>
  import ('@/views/goods/express'); // 查看物流
const connectMe = () =>
  import ('@/views/goods/connectMe'); // 客服

// 我的 -------------------------------
const mine = () =>
  import ('@/views/mine/mine'); // 个人中心
const updateInfo = () =>
import ('@/views/mine/updateInfo'); // 修改信息
const updatePhone = () =>
import ('@/views/mine/updatePhone'); // 修改手机号
const updatePwd = () =>
import ('@/views/mine/updatePwd'); // 修改密码
const set = () =>
import ('@/views/mine/set'); // 设置
const wallet = () =>
  import ('@/views/mine/wallet'); // 我的钱包
const mycard = () =>
  import ('@/views/mine/mycard'); // 我的银行卡
const bindcard = () =>
  import ('@/views/mine/bindcard'); // 绑定银行卡
const getgold = () =>
  import ('@/views/mine/getgold'); // 申请提现
const goldrecord = () =>
  import ('@/views/mine/goldrecord'); // 提现记录
const golddetail = () =>
  import ('@/views/mine/golddetail'); // 提现明细
const about = () =>
  import ('@/views/mine/about'); // 关于我们（简介）
const bind = () =>
  import ('@/views/mine/bind'); // 绑定注册
const addresses = () =>
  import ('@/views/mine/addresses'); // 地址管理
const address = () =>
  import ('@/views/mine/address'); // 新增或者编辑一个地址
const collects = () =>
  import ('@/views/mine/collects'); // 我的收藏
const serveorders = () =>
  import ('@/views/mine/serveorders'); // 服务订单列表
const servedetail = () =>
  import ('@/views/mine/servedetail'); // 服务订单详情
const seniorgrant = () =>
  import ('@/views/mine/seniorgrant'); // 服务商分配
const juniorgrant = () =>
  import ('@/views/mine/juniorgrant'); // 服务点接单
const login = () =>
  import ('@/views/mine/login'); // 登录
const register = () =>
  import ('@/views/mine/register'); // 注册
const findPwd = () =>
  import ('@/views/mine/findPwd'); // 找回密码

// 店铺 -------------------------------
const store = () =>
  import ('@/views/store/index'); // 店铺首页
const storeGoods = () =>
  import ('@/views/store/goods'); // 附近店铺商品列表里的详情 
const otoGoodsCart = () =>
  import ('@/views/store/cart'); // oto购物车列表   
const fillOrder = () =>
  import ('@/views/store/fillOrder'); // oto购物车列表 
const otoPay = () =>
  import ('@/views/store/pay'); // oto购物车列表   
const otoOrders = () =>
  import ('@/views/store/orders'); // oto买家订单   
const otoOrderDetail = () =>
  import ('@/views/store/orderDetail'); // oto买家订单   
const evaStore = () =>
  import ('@/views/store/evaStore'); // 评价订单 

// 附近 -------------------------------
const nearby = () =>
  import ('@/views/nearby/index'); // 附近
const nearIndex = () =>
  import ('@/views/nearby/tabIndex'); // 附近店铺首页    
const map = () =>
  import ('@/views/nearby/map'); // 附近店铺首页  

// 路由加载 --------------------------------------
const router = new Router({
  // mode: "history",
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    // 主页路由
    // {
    //   path: '/index',
    //   component: index
    // },
    {
      path: '/index', //主页路由指向附近
      component: nearby
    },
    // 小V
    {
      path: '/vGoods',
      component: vGoods
    },
    // 附近商店
    {
      path: '/nearby',
      component: nearby
    },
    // 附近商店 分类
    {
      path: '/nearby/index',
      component: nearIndex
    },
    // 地图
    {
      path: '/map',
      component: map
    },
    // 店铺首页路由
    {
      path: '/store',
      component: store
    },
    // 店铺商品详情路由
    {
      path: '/store/goods',
      component: storeGoods
    },
    // oto购物车列表
    {
      path: '/store/cart',
      component: otoGoodsCart
    },
    // oto支付
    {
      path: '/store/otoPay',
      component: otoPay
    },
    // 获取oto买家订单
    {
      path: '/store/orders',
      component: otoOrders
    },
    // 获取oto买家订单
    {
      path: '/store/orderDetail',
      component: otoOrderDetail
    },
    // 填写订单
    {
      path: '/store/fillOrder',
      component: fillOrder
    },
    // 评价订单
    {
      path: '/store/evaStore',
      component: evaStore
    },
    // 分享引导页
    {
      path: '/share',
      component: share
    },
    // 商品路由
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/goods/goodsinfo',
      component: goodsinfo
    },
    {
      path: '/goods/goodseva',
      component: goodseva
    },
    {
      path: '/goodsCart',
      component: goodsCart
    },
    {
      path: '/cart',
      name:'cart',
      component: cart
    },
    {
      path: '/goods/connectMe',
      component: connectMe
    },
    {
      path: '/goods/pay',
      component: pay
    },
    {
      path: '/goods/orders',
      component: orders
    },
    {
      path: '/goods/orderDetail',
      component: orderDetail
    },
    {
      path: '/goods/ordercenter',
      component: ordercenter
    },
    {
      path: '/goods/evagoods',
      component: evagoods
    },
    {
      path: '/goods/evaserve',
      component: evaserve
    },
    {
      path: '/goods/express',
      component: express
    },
    // 个人中心路由
    {
      path: '/mine',
      component: mine
    },
    {
      path: '/mine/set',
      component: set
    },
    {
      path: '/mine/updateInfo',
      component: updateInfo
    },
    {
      path: '/mine/updatePhone',
      component: updatePhone
    },
    {
      path: '/mine/updatePwd',
      component: updatePwd
    },
    {
      path: '/mine/wallet',
      component: wallet
    },
    {
      path: '/mine/mycard',
      component: mycard
    },
    {
      path: '/mine/bindcard',
      component: bindcard
    },
    {
      path: '/mine/getgold',
      component: getgold
    },
    {
      path: '/mine/goldrecord',
      component: goldrecord
    },
    {
      path: '/mine/golddetail',
      component: golddetail
    },
    {
      path: '/mine/about',
      component: about
    },
    {
      path: '/mine/bind',
      component: bind
    },
    {
      path: '/mine/addresses',
      component: addresses
    },
    {
      path: '/mine/address',
      component: address
    },
    {
      path: '/mine/collects',
      component: collects
    },
    {
      path: '/mine/serveorders',
      component: serveorders
    },
    {
      path: '/mine/servedetail',
      component: servedetail
    },
    {
      path: '/mine/seniorgrant',
      component: seniorgrant
    },
    {
      path: '/mine/juniorgrant',
      component: juniorgrant
    },
    {
      path: '/mine/login',
      name:'login',
      component: login
    },
    {
      path: '/mine/register',
      component: register
    },
    {
      path: '/mine/findPwd',
      component: findPwd
    }
  ]
});

// 输出router
export default router;
