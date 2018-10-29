'use strict';

// Settings configured here will be merged into the final config object.
const httpConfigArry = [];
const httpConfig = [{
	host: 'localhost:8080',
	protocol: 'http',
    domain: '10.3.78.124:8082',
    path: 'approve-check',
    envCode: 'LOCAL',
    isDefault: true
},{
	host: 'awakensit-cxs.jujinpan.cn',
	protocol: 'https',
    domain: 'awakensit-cxs.jujinpan.cn',
    path: 'net-awaken-web',
    envCode: 'SIT',
    isDefault: false
},{
	host: 'awakenuat-cxs.jujinpan.cn',
	protocol: 'https',
    domain: 'awakenuat-cxs.jujinpan.cn',
    path: 'net-awaken-web',
    envCode: 'UAT',
    isDefault: false
},{
	host: 'awaken.chinatopcredit.com',
	protocol: 'https',
    domain: 'awaken.chinatopcredit.com',
    path: 'net-awaken-web',
    envCode: 'PRODUCT',
    isDefault: false
}];
//获取相同域名的环境
httpConfig.map((item) => {
	if(location.host == item.host){
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
httpConfigArry[0].baseUrl = httpConfigArry[0].protocol+'://'+httpConfigArry[0].domain+'/'+httpConfigArry[0].path;

export default httpConfigArry[0]
