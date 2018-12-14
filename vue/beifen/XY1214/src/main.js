import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import ajaxApi from './assets/js/api';
import axios from 'axios';
import tool from './assets/js/tool';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import {
  Toast
} from 'mint-ui';
import weChatShare from './components/v-wechatshare';

Vue.use(MintUI);
Vue.use(tool);
Vue.component('v-wechatshare', weChatShare);

Vue.prototype.$axios = axios;
Vue.prototype.api = ajaxApi;
Vue.prototype.showTip = function (msg, time, type) {
  const obj = {
    message: msg,
    duration: time || 2000
  }
  if (type) {
    obj.iconClass = type;
  }
  Toast(obj);
}
Vue.prototype.callService = (msg) => {
  window.location.href = 'tel:400-811-0851';
};

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
