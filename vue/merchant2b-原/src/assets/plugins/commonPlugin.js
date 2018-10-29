/**
 * 公共方法及组件
 */
import CheckSquarebox from '../../components/base/checkSquarebox'
import BaseHeader from '../../components/base/BaseHeader'
import picker from 'vue-3d-picker';
import SmoothPicker from 'vue-smooth-picker'
// import SmoothPicker from '../../assets/plugins/smooth-picker'
export default {
  install (Vue, options) {
    // 正方形checkbox组件
    Vue.component('check-squarebox', CheckSquarebox)
    // 公共头组件
    Vue.component('base-header', BaseHeader)

    Vue.component('wrapper-component', {
      name: 'wrapper-component',
      render(createElement) {
        return createElement(
          this.tag,   // tag name
          this.$slots.default // array of children
        );
      },
      props: {
        tag: {
          type: String,
          required: true,
        },
      },
    });
    // 因为picker多个页面需要用，所以全局注册  // 参考文档https://github.com/zhoulujun/vue-picker
    Vue.component(picker.name, picker);
    //实名认证会跳地址
    Vue.prototype.$authBackUrl = "/mine";
    Vue.prototype.$setAuthBackUrl = function (url) {
      Vue.prototype.$authBackUrl = url;
    };
    Vue.use(SmoothPicker)
    // 判断是否是微信客户端

    Vue.prototype.$UA = function () {
      let ua = navigator.userAgent.toLowerCase();
      return {
        weChat: /MicroMessenger/i.test(ua),
        ios: /iPhone/i.test(ua),
        android: /android/i.test(ua),
        iphoneX: /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
      }
    };
    Vue.prototype.$authDate = {};

    Vue.prototype.$setAuthDate = function (data) {
      Vue.prototype.$authDate = data;
    };
    /**
     * 抖动函数
     * @param idle {number}
     * @param action {function}
     */
    Vue.prototype.$debounce = function (idle, action) {
      let last;
      return function () {
        let ctx = this, args = arguments;
        clearTimeout(last);
        last = setTimeout(function () {
          action.apply(ctx, args)
        }, idle)
      }
    };

    // let initWeChatFlag = false;
    Vue.prototype.initWeChat = function (url, type) {
      console.log('WX100001 : window.location.href');
      console.log(window.location.href);
      // if (!initWeChatFlag) {
      this.$post('WX100001', {url: window.location.href.split("#")[0], memberType: type}, data => {
        console.log("initWeChatFlag WX100001");
        console.log(data.respData.url);
        data = data.respData;
        let config = {
          debug: false,
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ['checkJsApi', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        };
        console.log(config);
        wx.config(config);
        // initWeChatFlag = true;
      }, resp => {
        console.log("initWeChatFlag WX100001");
        console.log(resp);
      });
      // }
    };
    //银行卡尾号
    Vue.prototype.$formatbankNo = function (bankAcctNo) {
      let bankNo = String(bankAcctNo);

      return bankNo.substr(bankNo.length - 4)
    };

    // 手机号码格式化
    Vue.prototype.$formatPhone = function (phoneVal) {
      let phone = String(phoneVal)
      if (phone && phone.length === 11) {
        phone = phone.substr(0, 3) + '****' + phone.substr(7)
      }
      return phone
    }
    // 存储个人信息
    Vue.prototype.$userInfo = '';
    Vue.prototype.$getUserInfo = function () {
      return Vue.prototype.$userInfo
    };
    Vue.prototype.$setUserInfo = function (info) { // info 可以传对象
      Vue.prototype.$userInfo = info
      // secretKey	String	用于后续接口请求加密
      // isRealName	String	登录时是否实名：Y:已实名 N:未实名
      // loginName	String	登录名
      // memberNo	String	会员号 会员类型(企业会员：COMP，个人会员：PERSON)
      // memberName	String	会员名
      // memberType	String	会员类型
      // OperatorId	String	操作员ID
      // OperatorType	String	操作员类型
    };
    // 是否绑定微信
    Vue.prototype.$bindWxInfo = 'N';
    Vue.prototype.$getBindWxInfo = function () {
      return Vue.prototype.$bindWxInfo
    };
    Vue.prototype.$setBindWxInfo = function (info) { // info 可以传对象
      Vue.prototype.$bindWxInfo = info
    };
  }
}
