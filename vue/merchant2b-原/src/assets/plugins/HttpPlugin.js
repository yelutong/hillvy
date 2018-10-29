import CryptoJS from 'crypto-js'
import padStart from 'lodash/padStart'
import axios from 'axios'
// import  {ToastPlugin} from 'vux';

const HTTP_CONFIG = {
  // URL: 'https://sfpay-sit.sf-pay.com',
  URL: '',//nginx 转发，不要直接写死
  CONTEXT: '/syf-finance/api',
  FRONT_CODE: {
    CORRECT_CODE: '00',
    SESSION_TIMEOUT: '02',
    UNLOGIN: '06',
    NEED_LOGIN: '106'
  },
  CORRECT_CODE: '0000',
  CORRECT_CODE_REG: /^[I]/, // 其它状态正确码 以I字母开头的状态信息
  ERROR_CODE: /^(9901|9902|9903|9999)$/, // 错误码 9901,9902,9903,9999 系统错误
  SESSION_TIMEOUT_CODE: '9801', // session超时状态码
  HAS_LOGIN_CODE: '9804', // 单点登录报错
  NO_LOGIN_CODE: '40000', // 未登录
  CONST_REQUEST_TIMEOUT: '32000' // 接口超时时间
}
// 加密开关
const CRYPTO_KEY_OPEN = true

// 加密配置
const cryptJSConfig = {
  mode: CryptoJS.mode.CBC,
  iv: CryptoJS.enc.Utf8.parse('01234567'),
  padding: CryptoJS.pad.Pkcs7
}

/**
 *  生成摘要接口
 *
 *  逻辑：创建摘要,如果secretKey为空，返回【data +空字符的MD5加密】MD5加密】
 如果secretKeyn不为空，返回【【data +secretKey的MD5加密】MD5加密】
 *
 *  @param secretKey   登录后用户KEY
 *  @param params String 待加密字符串，一般是对象的json字符串
 *
 *  @return
 */
function createAbstracts(secretKey, params) {
  return CryptoJS.MD5((params + CryptoJS.MD5(secretKey))).toString()
}

/**
 * 生成密钥，未登录情况下
 *
 *  逻辑：【【version+txCode+timestamp的MD5加密】+version+txCode+timestamp的MD5加密】
 *  @param version
 *  @param timestamp
 *  @param serviceType
 *
 *  @return string
 */
function create3DSKeyNoSecret(txCode, version, timestamp) {
  // return CryptoJS.MD5(CryptoJS.MD5(version + txCode + timestamp) + version + txCode + timestamp)
  return CryptoJS.enc.Utf8.parse(CryptoJS.MD5(CryptoJS.MD5(version + txCode + timestamp) + version + txCode + timestamp))
}
/**
 * 生成密钥，已登录情况下
 *
 *  逻辑：【【secretKey的MD5加密+secretKey】的MD5加密】
 *  @param secretKey String
 *
 *  @return string
 */
function create3DSKeySecret(secretKey) {
  return CryptoJS.enc.Utf8.parse(CryptoJS.MD5(CryptoJS.MD5(secretKey) + secretKey))
}

/*
 * 3DES解密参数
 *
 *  逻辑：【3DES解密】
 *  @param params String 待加密字符串，一般是对象的json字符串
 *  @param key String 加密密钥
 *
 *  @return string
 */
function encryptParams(params, key) {
  return CryptoJS.TripleDES.encrypt(params, key, cryptJSConfig).toString()
}

/**
 * 3DES解密参数
 * @param  {[string]} desParams [3DES加密参数的结果]
 * @param  {[string]} key       [密钥]
 * @return {[Object]}           [Rresponse 返回的参数对象]
 */
/*
 function descryptPrams (desParams, key) {
 // return CryptoJS.enc.Utf8.stringify(CryptoJS.TripleDES.decrypt(desParams, key, cryptJSConfig))
 return CryptoJS.TripleDES.decrypt(desParams, key, cryptJSConfig).toString(CryptoJS.enc.Utf8)
 }
 */

// 获取时间戳
function getTimestamp() {
  let currentDate = new Date()
  let year = currentDate.getFullYear()
  let month = padStart(currentDate.getMonth() + 1, 2, '0')
  let date = padStart(currentDate.getDate(), 2, '0')
  let hour = padStart(currentDate.getHours(), 2, '0')
  let minute = padStart(currentDate.getMinutes(), 2, '0')
  let second = padStart(currentDate.getSeconds(), 2, '0')
  return '' + year + month + date + hour + minute + second
}

export default {
  install (Vue, options) {
    // 获取URL中的search内容
    Vue.prototype.$search = (function (s) {
      if (!s) return {}
      let t = {}
      s.split('?')[1].split('&').forEach(i => {
        let a = i.split('=')
        t[a[0]] = a[1]
      })
      return t
    })(location.search)

    // 从search中获取SK
    let secretKey = Vue.prototype.$search.secretKey || '';
    // 从search中获取SK
    Vue.prototype.$secretKey = Vue.prototype.$search.secretKey || '';
    Vue.prototype.$getSecretKey = function () {
      return Vue.prototype.$secretKey
    };
    Vue.prototype.$setSecretKey = function (sk) {
      Vue.prototype.$secretKey = sk
    };
    // 获取/设置TOKEN
    Vue.prototype.$TOKEN = '';
    Vue.prototype.$getTOKEN = function () {
      return Vue.prototype.$TOKEN
    };
    Vue.prototype.$setTOKEN = function (TOKEN) {
      Vue.prototype.$TOKEN = TOKEN;
      secretKey = TOKEN
    };

    // 设置参数
    let setParams = (txCode, reqParams, extParams) => {
      let params = {
        txCode: txCode || '',
        deviceId: '',
        reqParams: reqParams || {}
      }
      // 增加业务参数外的其他扩展参数（不需要加密的参数）
      if (extParams) {
        if (Object.prototype.toString.call(extParams) === '[object Array]') {
          extParams.forEach(function (item) {
            params[item.key] = JSON.stringify(item.value)
          })
        }
        if (Object.prototype.toString.call(extParams) === '[object Object]') {
          params[extParams.key] = JSON.stringify(extParams.value)
        }
      }

      /**   加密   **/
      params.timestamp = getTimestamp()
      params.platform = 'ios'
      params.version = 'V1.0.0'
      params.ip = '10.29.141.184'
      params.osVersion = ''
      params.deviceInfo = `width=${window.screen.width}|height=${window.screen.height}`
      params.source = 'WX_FINANCE_COMP'

      // 加密
      if (CRYPTO_KEY_OPEN) {
        let encryptTypeKey = ''
        if (secretKey) {
          // 用户已登录
          encryptTypeKey = create3DSKeySecret(secretKey)
        } else {
          // 用户未登录
          encryptTypeKey = create3DSKeyNoSecret(txCode, params.version, params.timestamp)
        }
        let reqParamsString = JSON.stringify(params.reqParams)
        params.reqParams = encodeURIComponent(encryptParams(reqParamsString, encryptTypeKey))
        params.abstracts = createAbstracts(secretKey, params.reqParams)
      } else {
        params.reqParams = encodeURIComponent(JSON.stringify(params.reqParams))
      }
      return params
    }

    let successCallback = (resp, callback, errorCallback) => {
      let data = resp.data
      // 返回code即表示请求成功
      if (data && data.code) {
        if (data.code === HTTP_CONFIG.FRONT_CODE.CORRECT_CODE) {
          Object.prototype.toString.call(callback) === '[object Function]' && callback(data)
        } else if (data.code === HTTP_CONFIG.SESSION_TIMEOUT_CODE || data.code === HTTP_CONFIG.FRONT_CODE.SESSION_TIMEOUT || data.code === HTTP_CONFIG.FRONT_CODE.UNLOGIN || data.code === HTTP_CONFIG.FRONT_CODE.NEED_LOGIN || data.code === HTTP_CONFIG.NO_LOGIN_CODE) { // session过期，清除token
          this.$setTOKEN('')
          this.$setUserInfo('')
          window.location.href = 'https://sfpay-sit.sf-pay.com/syf-finance-wx/api/openSfFinance?memberType=COMP'
        } else {
          Object.prototype.toString.call(errorCallback) === '[object Function]' && errorCallback(data)
        }
      } else {
        Vue.$vux.loading.hide()
        Vue.$vux.toast.text('系统繁忙', 'default')
        console.log(resp)
      }
    }

    Vue.prototype.$post = function (txCode, reqParams, callback, errorCallback, opts) {
      // console.log(' Vue.prototype.$post reqParams')
      // console.log(reqParams)
      httpRequest('post', txCode, reqParams, callback, errorCallback, opts)
    };

    function httpRequest(method, txCode, reqParams, callback, errorCallback, opts) {
      // console.log('httpRequest reqParams')
      // console.log(reqParams)
      let params = setParams(txCode, reqParams, opts && opts.extParams);
      // 如果是埋点接口 STAT100001 请求不显示加载中动画
      if ((!opts || !opts.cancelDefaultLoadingStyle) &&txCode !== 'STAT100001') {
        Vue.$vux.loading.show({
          text: '加载中...'
        })
      }
      // 发送 POST 请求
      axios({
        baseURL: HTTP_CONFIG.URL,
        url: HTTP_CONFIG.CONTEXT,
        method: method, // 默认是 get
        headers: method === 'post' ? {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        } : {
          'X-Requested-With': 'XMLHttpRequest'
        },
        transformRequest (params) {
          let str = []
          for (let p in params) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]))
          }
          return str.join('&')
        },
        data: params,
        responseType: 'json', // 默认的
        timeout: HTTP_CONFIG.CONST_REQUEST_TIMEOUT
      }).then(resp => {
        Vue.$vux.loading.hide()
        successCallback(resp, callback, errorCallback)
      }).catch(error => {
        Vue.$vux.loading.hide()
        if (error.response && error.response.status) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          // console.log(error.response.data);
          // console.log(error.response.headers);
          if (error.response.status === 504) {
            Vue.$vux.toast.text('网络不给力', 'default')
          } else if (error.response.status === 406) {
            console.log('406',"待后台解决")
          } else {
            Vue.$vux.toast.text('系统繁忙', 'default')
          }
        } else {
          if (error.message === 'Network Error') {
            Vue.$vux.toast.text('网络不给力', 'default')
          }
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
        }
      })
    }
    Vue.prototype.$get = function (txCode, reqParams, callback, errorCallback, opts) {
      httpRequest('get', txCode, reqParams, callback, errorCallback, opts)
    };
  }
}
