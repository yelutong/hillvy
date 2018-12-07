'use strict';

// Settings configured here will be merged into the final config object.
const httpConfigArry = [];
const httpConfig = [{
    host: 'localhost', //本地
    protocol: 'http',
    domain: 'sit-invest.qude369.com', //出借端
    path: 'kpt-invest',
    envCode: 'LOCAL',
    frontDomain: '10.3.31.216:8086', //调用前端url域名
    isDefault: false
},{
    host: '10.3.79.72', //本地
    protocol: 'http',
    domain: 'sit-invest.qude369.com', //出借端
    path: 'kpt-invest',
    envCode: 'LOCAL',
    frontDomain: 'sit-apply.qude369.com', //调用前端url域名
    isDefault: false
},{
    host: 'localhost', //内网
    protocol: 'http',
    domain: '10.3.31.221:8084', //出借端
    path: 'kpt-invest',
    envCode: 'SIT',
    frontDomain: '10.3.31.216:8086', //调用前端url域名
    isDefault: false
},{
    host: 'sit-invest.qude369.com', //sit
    protocol: 'https',
    domain: 'sit-invest.qude369.com', //出借端
    path: 'kpt-invest',
    envCode: 'SIT',
    frontDomain: 'sit-apply.qude369.com', //调用前端url域名
    isDefault: true
},{
    host: 'uat-invest.qude369.com', //uat
    protocol: 'https',
    domain: 'uat-invest.qude369.com', //出借端
    path: 'kpt-invest',
    envCode: 'UAT',
    frontDomain: 'uat-apply.qude369.com', //调用前端url域名
    isDefault: false
},{
    host: 'invest.kreditplusteknologi.id', //生产
    protocol: 'https',
    domain: 'invest.kreditplusteknologi.id', //出借端
    path: 'kpt-invest',
    envCode: 'PRODUCT',
    frontDomain: 'apply.kreditplusteknologi.id', //调用前端url域名
    isDefault: false
}];
//获取相同域名的环境
httpConfig.map((item) => {
    if(location.hostname == item.host){
        httpConfigArry.push(item);
    }
})
//如果相同域名的环境，则选择isDefault = true的时候
if(httpConfigArry.length<=0){
    httpConfig.map((item) => {
        if(item.isDefault == true){
            httpConfigArry.push(item);
        }
    })
}

httpConfigArry[0] = (httpConfigArry.length>0)?httpConfigArry[0]:httpConfig[0];
//httpConfigArry[0].baseUrl = httpConfigArry[0].protocol+'://'+httpConfigArry[0].domain+'/'+httpConfigArry[0].path;

export default httpConfigArry[0]
