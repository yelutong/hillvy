import axios from 'axios';
import { Message } from 'element-ui';
import axiosHandler from './index'; //封装axios 统一捕捉catch异常
import config from './config';
const httpUrl = location.protocol+'//'+config.domain+'/'+config.path;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = sessionStorage.getItem('user')?(JSON.parse(sessionStorage.getItem('user')).accessToken):'';//如果sessionStorage里面有用户信息，则用accessToken，否则等于‘’
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
    	//Message.success(response.data.msg);
    }else{
    	if(response.data.msg){
    		Message.error(response.data.msg);
            if(response.data.code == '1001'){
                window.location.href='#/login';//token过期页面跳转
            }
    	}else{
    		Message.error('未知错误，请联系管理员');
    	}
    }
    
    return response;
  }, function (error) {
    // 对请求错误做些什么
    Message.error('未知错误，请联系管理员');
    return Promise.reject(error);
  }
);

//登录
export const requestLogin = params => { return axiosHandler.post(`${base}/auth/login`, params).then(res => res.data); };

//报表数据
export const getReportData = params => {return axiosHandler.get(`${base}/admin/list-apply`, { params: params })};
