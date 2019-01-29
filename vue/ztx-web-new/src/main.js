import Vue from 'vue';
import App from './App';
import router from './router';
import tool from './assets/js/tool'; 
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';//多语言引入
import LangEng from '../static/lang/eng';//英文
import LangEnd from '../static/lang/end';//印尼文
import 'element-ui/lib/theme-chalk/index.css';
import { Toast } from 'mint-ui';
Vue.use(ElementUI);
Vue.use(MintUI);
Vue.use(tool); 
Vue.use(VueI18n);

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
    }
　　return response
}, function (error) {
　　// 对响应错误做点什么
　　return Promise.reject(error)
});

const i18n = new VueI18n({
  //定义默认语言
  locale: 'end', //end 印尼语, eng 英文
  messages:{
    'eng': LangEng,
    'end': LangEnd
  }
})

new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
