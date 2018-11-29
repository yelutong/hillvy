import axios from 'axios';
import { Toast} from 'antd-mobile';
import axiosHandler from './index'; //封装axios 统一捕捉catch异常
import config from './config';
const httpUrl = location.protocol+'//'+config.domain+'/'+config.path;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //const token = localStorage.getItem('token');
    const token='8439096e96794349b2bdd5ff4603cfe7';
    config.headers['X-Sso-Token'] = token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code == '0000'){ //0000的时候才是成功
    	//成功
    }else{
    	if(response.data.code){
    		//Message.error(response.data.msg);
            if(response.data.code == '1001'){
                //token过期页面跳转
            }
    	}else{
            if(App){
                App.showToast('Tidak ada koneksi jaringan');
            }else{
                Toast.info('Tidak ada koneksi jaringan');
            }
    	}
    }
    
    return response;
  }, function (error) {
    // 对请求错误做些什么
    if(App){
        App.showToast('Tidak ada koneksi jaringan');
    }else{
        Toast.info('Tidak ada koneksi jaringan');
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
export const payJudge = params => {return axiosHandler.post(`${httpUrl}/lend-asset/pay-judge`, params)};
//取消充值
export const rechargeCancel= params => {return axiosHandler.post(`${httpUrl}/lend-asset/recharge-cancel`, params)};
