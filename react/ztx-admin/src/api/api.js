import axios from 'axios';
import { Message } from 'element-ui';
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

let base = httpUrl;//10.3.78.124
let strategyBase = location.protocol+'//'+config.strategyPackDomain;//策略服务

//登录
export const requestLogin = params => { return axios.post(`${base}/auth/login`, params).then(res => res.data); };

//报表数据
export const getReportData = params => { return axios.get(`${base}/admin/list-apply`, { params: params }); };

//下载注册数据
export const getDownloadData = params => { return axios.get(`${base}/admin/list-channel`, { params: params }); };

//用户意见反馈查询
export const listAdvice = params => { return axios.get(`${base}/admin/list-advice`, { params: params }); };

//下载EXCEL
export const listAdviceExcel = `${base}/admin/excel`;

//获取短信配置列表
export const listSms = params => { return axios.get(`${base}/admin/list-sms-template`, { params: params }); };

//编辑短信
export const editSms = params => { return axios.post(`${base}/admin/update-sms-template`, params); };

//获取消息提醒列表
export const remindInfo = params => { return axios.get(`${base}/admin/list-remind-info`, { params: params }); };

//编辑消息提醒
export const editRemindInfo = params => { return axios.post(`${base}/admin/update-remind-info`, params); };

//获取系统公告列表
export const noticeInfo = params => { return axios.get(`${base}/admin/list-notice-info`, { params: params }); };

//编辑系统公告
export const editNotice = params => { return axios.post(`${base}/admin/update-notice-info`, params); };

//获取付款通道配置列表
export const peyamentChannelList = params => { return axios.get(`${base}/admin/list_payway`, { params: params }); };

//删除支付方式
export const deletePayment = params => { return axios.delete(`${base}/admin/payway/`+params); };

//获取支付渠道列表
export const paymentChannel = params => { return axios.get(`${base}/admin/list_paychannel`, { params: params }); };

//获取支付渠道列表
export const savePayWay = params => { return axios.post(`${base}/admin/save_payway`, params); };

//app错误信息
export const listAppError = params => { return axios.get(`${base}/admin/list-app-error`, { params: params }); };

//清空手机验证码次数
export const emptyCode = params => { return axios.post(`${base}/admin/reset-captcha`, params); };

//查询手机号列表
export const listPhone = params => { return axios.get(`${base}/admin/list-apply-info`, { params: params }); };

//修改手机号
export const updatePhone = params => { return axios.post(`${base}/admin/update-phone-info`, params); };

//导入策略包
export const strategyPackageUrl = `${strategyBase}/kpt-strategy/strategy/upload`;

//加载策略包
export const strategyReload = params => { return axios.put(`${strategyBase}/kpt-strategy/strategy/reload`+params); };

