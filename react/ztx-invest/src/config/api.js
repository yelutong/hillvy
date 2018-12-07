import axios from 'axios';
import { Toast } from 'antd-mobile';
import axiosHandler from './index'; //封装axios 统一捕捉catch异常
import config from './config';
const httpUrl = location.protocol+'//'+config.domain+'/'+config.path;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config);
    console.log(config.url.indexOf('withdraw-poundage'));
    if(App){
      if(config.url.indexOf('withdraw-poundage')<0){
         App.showLoading(true);
      }
    }else{
      Toast.loading('', 0);
    }
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token');
    //const token='028d17962c4742ebaaa42d81fc40e494';
    //const token = 'bfc6a5c65e0e4be18d930144b3fb79b5';//超级lender
    config.headers['X-Sso-Token'] = token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    var responseURL = response.request.responseURL;
    if(responseURL.indexOf('/lend-object/list')>=0){
        localStorage.setItem('responseURL',responseURL);
    }
    // 对响应数据做点什么
    if(response.data.code == '0000'){ //0000的时候才是成功
    	//成功
    }else{
    	if(response.data.code){
    		//Message.error(response.data.msg);
            if(response.data.code == '1001'){
                //token过期页面跳转
                if(App){
                    App.tokenInvalid();
                }
            }else{
                if(App){
                    App.showToast('Tidak ada koneksi jaringan (code:'+response.data.code+')');
                }else{
                    Toast.info('Tidak ada koneksi jaringan (code:'+response.data.code+')');
                }
            }
    	}else{
            if(App){
                App.showToast('Tidak ada koneksi jaringan');
            }else{
                Toast.info('Tidak ada koneksi jaringan');
            }
    	}
    }
    //加个判断，账户中心返回太快了，导致标的列表加载的时候没有loading
    if(responseURL.indexOf('/lend-asset/query-asset')>=0 && (!localStorage.getItem('responseURL') && !localStorage.getItem('localStorageList'))){
        //如果标的列表未加载完成，就不需要把loading关闭
    }else{
        if(App){
            App.showLoading(false);
        }else{
            Toast.hide();
        }
        localStorage.removeItem('responseURL');
        localStorage.removeItem('localStorageList');
    }
    return response;
  }, function (error) {
    console.log('error',error.response.status);
    // 对请求错误做些什么
    if(App){
        App.showLoading(false);
        if(error.response.status == '500'){
            App.showToast('Server bermasalah. Silahkan coba lagi nanti (500)');
        }else{
            App.showToast('Tidak ada koneksi jaringan-'+error.response.status);
        }
    }else{
        Toast.hide();
        Toast.info('Tidak ada koneksi jaringan -'+error.response.status);
    }
    return Promise.reject(error);
  }
);

//登录
//export const requestLogin = params => { return axiosHandler.post(`${httpUrl}/auth/login`, params).then(res => res.data); };

//获取投标列表
export const getTenderList = params => {return axiosHandler.get(`${httpUrl}/lend-object/list`, { params: params })};
//获取支付方式
export const getPayWay = params => {return axiosHandler.get(`${httpUrl}/lend-asset/pay-way`, { params: params })};
//充值
export const recharge = params => {return axiosHandler.post(`${httpUrl}/lend-asset/recharge`, params)};
//判断上一笔交易是否完成
export const payJudge = params => {return axiosHandler.post(`${httpUrl}/lend-asset/pay-judge`+params)};
//取消充值
export const rechargeCancel= params => {return axiosHandler.put(`${httpUrl}/lend-asset/recharge-cancel`+params)};
//确认投标
export const lendConfirm = params => {return axiosHandler.post(`${httpUrl}/lend-object/confirm`, params)};
//获取渠道账户资金
export const getAccount = params => {return axiosHandler.get(`${httpUrl}/lend-asset/v2/list`, { params: params })};
//认证成功点击按钮
export const status = params => {return axiosHandler.post(`${httpUrl}/lend/status`, params)};
//获取出借账户中心信息
export const queryAsset = params => {return axiosHandler.get(`${httpUrl}/lend-asset/query-asset`, { params: params })};
//修改提现金额----？
export const withdrawPoundage = params => {return axiosHandler.post(`${httpUrl}/lend-asset/withdraw-poundage`, params)};
//确认提现---？
export const withdraw = params => {return axiosHandler.post(`${httpUrl}/lend-asset/withdraw`, params )};
//获取提现的最高和最低金额
export const withdrawLimit = params => {return axiosHandler.get(`${httpUrl}/lend-asset/withdraw-limit`, { params: params })};
