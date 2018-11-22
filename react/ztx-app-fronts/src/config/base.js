'use strict';

// Settings configured here will be merged into the final config object.
const httpConfigArry = [];
const httpConfig = [{
	host: '10.3.31.216',
	protocol: 'http',
    domainP1: '10.3.31.221:8084',
    domainApply: '10.3.31.221:8081',
    path: 'kpt-invest',
    pathApply: 'kpt-apply',
    envCode: 'SIT',
    isDefault: true
},{
    host: '10.3.79.72',
    protocol: 'http',
    domainP1: '10.3.31.221:8084',
    domainApply: 'sit-apply.qude369.com',
    path: 'kpt-invest',
    pathApply: 'kpt-apply',
    envCode: 'LOCAL',
    isDefault: false
},{
	host: '10.3.31.221',
	protocol: 'http',
    domainP1: '10.3.31.221:8084',
    domainApply: '10.3.31.221:8081',
    path: 'kpt-invest',
    pathApply: 'kpt-apply',
    envCode: 'SIT',
    isDefault: false
},{
    host: 'localhost',
    protocol: 'http',
    domainP1: '10.3.31.221:8084',
    domainApply: 'sit-apply.qude369.com',
    path: 'kpt-invest',
    pathApply: 'kpt-apply',
    envCode: 'SIT',
    isDefault: false
},{
	host: 'sit-apply.qude369.com',
	protocol: 'http',
    domainP1: 'sit-invest.qude369.com',
    domainApply: 'sit-apply.qude369.com',
    path: 'kpt-invest',
    pathApply: 'kpt-apply',
    envCode: 'SIT',
    isDefault: false
},{
	host: 'apply.kreditplusteknologi.id',
	protocol: 'https',
    domainP1: 'invest.kreditplusteknologi.id',
    domainApply: 'apply.kreditplusteknologi.id',
    path: 'kpt-invest',
    pathApply: 'kpt-apply',
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
		if(item.isDefault){
			httpConfigArry.push(item);
		}
	})
}

httpConfigArry[0] = (httpConfigArry.length>=0)?httpConfigArry[0]:httpConfig[0];
//httpConfigArry[0].baseUrl = httpConfigArry[0].protocol+'://'+httpConfigArry[0].domain+'/'+httpConfigArry[0].path;

export default httpConfigArry[0]
