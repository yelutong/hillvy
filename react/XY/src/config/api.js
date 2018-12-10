import axios from 'axios';
import { Toast } from 'antd-mobile';
import axiosHandler from './index'; //封装axios 统一捕捉catch异常
import config from './config';
const httpUrl = location.protocol+'//'+config.domain+'/'+config.path;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    Toast.loading('Loading', 1);
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
    // 对响应数据做点什么
    Toast.hide();
    if(response.data.code == '0000'){ //0000的时候才是成功
    	//成功
    }else{
      Toast.info('错误');
    }
    
    return response;
  }, function (error) {
    console.log('error',error.response.status);
    // 对请求错误做些什么
    if(error.response.status == '500'){
      Toast.info('500错误');
    }
    return Promise.reject(error);
  }
);


// export const withdraw = params => {return axiosHandler.post(`${httpUrl}/lend-asset/withdraw`, params )};
// //获取提现的最高和最低金额
// export const withdrawLimit = params => {return axiosHandler.get(`${httpUrl}/lend-asset/withdraw-limit`, { params: params })};