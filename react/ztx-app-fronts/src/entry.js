/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */
import axios from 'axios';
//require('es5-shim');
//require('es5-shim/es5-sham');
//require('console-polyfill');
//require('es6-promise');
require('babel-polyfill');
require('jquery/jquery.min');

/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

const React = require('react');
const ReactDOM = require('react-dom');
const Appmain = require('./components/main');

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //$('.mainload').show();
    var token = localStorage.getItem('token');
    /*if(window.location.hash.indexOf('token=')>=0){
      token = window.location.hash.split('token=')[1].split('&')[0];
    }else{
      token = '';
    }*/
    config.headers['X-Sso-Token'] = token;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    /*$('.warningTips').show().html('Tidak ada koneksi jaringan');
    setTimeout(() => {
      if($('.warningTips').is(':visible')){
        $('.warningTips').hide();
      }
    },2000);*/
    if(App){
      App.showToast('Tidak ada koneksi jaringan');
      App.showLoading(false);
    }
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.code == '0000'){ //0000的时候才是成功
      //成功
    }else{
      //失败
      if(App){
        if(response.data.code == '1001'){//token过期
          App.tokenInvalid();
         //App.showToast('token过期');
        }else{
         App.showToast('Tidak ada koneksi jaringan'+'('+response.data.code+')');
         App.showLoading(false);
        }
      }else{
        alert(response.data.msg);
      }
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    //失败app弹窗
    if(App){
      App.showToast('Tidak ada koneksi jaringan');
      App.showLoading(false);
    }
    //$('.warningTips').show().html('Tidak ada koneksi jaringan');
    /*setTimeout(() => {
      if($('.warningTips').is(':visible')){
        $('.warningTips').hide();
      }
    },2000);*/
    return Promise.reject(error);
  }
);


ReactDOM.render(
  <Appmain/>,
  document.getElementById('app')
);
