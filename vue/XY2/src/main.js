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
Vue.prototype.api = ajaxApi;// 在其他页面直接用 this.api就能请求到了
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
  window.location.href = 'tel:0755–28885609';
};

Vue.config.productionTip = false;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
 // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;    // 这个就是
 // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 // console.log(config);
　　// 在发送请求之前做些什么
　　return config
}, function (error) {
　　// 对请求错误做些什么
return Promise.reject(error)
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
　　// 对响应数据做点什么
   // console.log(response);
    if(response.data.code == 403){
      //Toast('登录超时，请重新登录');
      //window.location.hash= '/mine/login?url='+window.location.href;
    }
　　return response
}, function (error) {
　　// 对响应错误做点什么
　　return Promise.reject(error)
});

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
