import Vue from 'vue'
import App from './App'
import router from './router/routers'
import RespondPlugin from './assets/plugins/RespondPlugin'
import InitVuxPlugin from './assets/plugins/InitVuxPlugin'
import HttpPlugin from './assets/plugins/HttpPlugin'
import CommonPlugin from './assets/plugins/CommonPlugin'
import store from './store/'
// import Vconsole from 'vconsole';
import {WechatPlugin} from 'vux'
import VueScroller from 'vue-scroller';
// import VueClipboard from 'vue-clipboard2'

// VueClipboard.config.autoSetContainer = true // add this line
// Vue.use(VueClipboard)
Vue.use(VueScroller);//上拉加载
Vue.use(WechatPlugin) // 微信
window.wx = Vue.wechat

// let vconsole = new Vconsole();
// vconsole.test = 1;

// 去除移动端点击事件的延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

// 设置响应式布局，计算html的font-size
Vue.use(RespondPlugin)

// 初始化 HTTP 请求
Vue.use(HttpPlugin)

// 初始化 VUX 全局组件
Vue.use(InitVuxPlugin)

// 初始化 公共方法及组件
Vue.use(CommonPlugin)
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  console.log('to,from')
  console.log(to, from)
  switch (to.name) {
    case 'identity':
      if (from.name === 'audit') {
        router.replace("/mine")
      }
      next();
      return;
    case "bankInfo":
      if (from.name === "bankResult") {
        router.replace("/bankList");
      }
      if (from.name === "transferResult" || from.name === "withdrawDeposit" || from.name === "checkoutTransPwd") {
        store.commit('updateAni', {name: 'transitionName', value: 'vux-pop-in'});
      }
      next();
      return;
    case "transferResult":
      if (from.name === "bankInfo") {
        store.commit('updateAni', {name: 'transitionName', value: 'vux-pop-out'});
      }
      next();
      return;
    case "checkoutTransPwd":
      if (from.name === "bankInfo") {
        store.commit('updateAni', {name: 'transitionName', value: 'vux-pop-out'});
      }
      next();
      return;
    case "withdrawDeposit":
      if (from.name === "bankInfo") {
        store.commit('updateAni', {name: 'transitionName', value: 'vux-pop-out'});
      }
      next();


  }

  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length


  if ((to.path === '/' || to.path === '/service' || to.path === '/mine') && (from.path === '/' || from.path === '/service' || from.path === '/mine')) {
    store.commit('updateAni', {name: 'transitionName', value: ''});
    store.commit('updateAni', {name: 'cvShow', value: true});
  } else {
    if (to.path === '/' || to.path === '/service' || to.path === '/mine') {
      store.commit('updateAni', {name: 'transitionName', value: 'vux-pop-out'});
      setTimeout(function () {
        store.commit('updateAni', {name: 'cvShow', value: true});
      }, 500)
    } else {
      store.commit('updateAni', {name: 'transitionName', value: toDepth < fromDepth ? 'vux-pop-out' : 'vux-pop-in'});
      store.commit('updateAni', {name: 'cvShow', value: false});
    }
  }

  next()
});
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});
