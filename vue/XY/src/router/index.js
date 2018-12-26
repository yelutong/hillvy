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


// 路由加载 --------------------------------------
const router = new Router({
  // mode: "history",
  routes: [{
      path: '*',
      redirect: '/index'
    },
    // 主页路由
    {
      path: '/index',
      component: index
    },
    // 小V
    {
      path: '/vGoods',
      component: vGoods
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
