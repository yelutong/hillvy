'use strict';

// Settings configured here will be merged into the final config object.
const httpConfigArry = [];
const httpConfig = [{
    host: 'localhost', //本地
    protocol: 'http',
    frontDomain: 'sit-admin.qude369.com', //前端调用url
    strategyPackDomain: 'sit-strategy.qude369.com', //调用策略服务url
    //domain: 'admin.kreditplusteknologi.id', //运维控制台
    //domain: '10.3.79.117:8090', //运维控制台
    //domain: '10.3.32.233:8090', //运维控制台 帅果ip
    domain: '10.3.32.219:8090', //运维控制台
    //domain: '10.3.32.232:8090', //蛟龙ip
    //domain: '10.3.79.117:8090', //尹振ip
    path: 'kpt-admin',
    envCode: 'LOCAL',
    isDefault: false
},{
    host: '10.3.78.177', //本地
    protocol: 'http',
    frontDomain: '10.3.31.216:8091', //前端调用url
    strategyPackDomain: '10.3.76.90:8096', //调用策略服务url
    domain: '10.3.32.219:8090', //运维控制台
    path: 'kpt-admin',
    envCode: 'LOCAL',
    isDefault: true
},{
    host: '10.3.31.221', //内网
    protocol: 'http',
    frontDomain: '10.3.31.221:8091', //前端调用url
    strategyPackDomain: '10.3.31.221:8096', //调用策略服务url
    domain: '10.3.31.221:8090', //运维控制台
    path: 'kpt-admin',
    envCode: 'SIT',
    isDefault: false
},{
    host: '183.62.194.205', //内网 映射外网ip
    protocol: 'http',
    frontDomain: '183.62.194.205:8091', //前端调用url
    strategyPackDomain: '183.62.194.205:8096', //调用策略服务url
    domain: '183.62.194.205:8090', //运维控制台
    path: 'kpt-admin',
    envCode: 'SIT-OUTSIDE',
    isDefault: false
},{
    host: 'sit-admin.qude369.com', //sit
    protocol: 'https',
    frontDomain: 'sit-admin.qude369.com', //前端调用url
    strategyPackDomain: 'sit-strategy.qude369.com', //调用策略服务url
    domain: 'sit-admin.qude369.com', //运维控制台
    path: 'kpt-admin',
    envCode: 'SIT',
    isDefault: false
},{
    host: 'admin.kreditplusteknologi.id', //生产
    protocol: 'https',
    frontDomain: 'admin.kreditplusteknologi.id', //前端调用url
    strategyPackDomain: 'strategy.kreditplusteknologi.id', //调用策略服务url
    domain: 'admin.kreditplusteknologi.id', //运维控制台
    path: 'kpt-admin',
    envCode: 'PRODUCT',
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
