'use strict';
import config from '../../config/base';
const httpUrl = location.protocol+'//'+config.domainP1+'/'+config.path;
//const httpUrl = config.protocol+'://'+config.domainP1;
const restStore = {

	//获取合同
	contractData:httpUrl+'/lend/aggrement'

};

export default restStore
