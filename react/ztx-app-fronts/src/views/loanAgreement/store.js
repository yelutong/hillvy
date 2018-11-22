'use strict';
import config from '../../config/base';
const httpUrl = location.protocol+'//'+config.domainApply+'/'+config.pathApply;
//const httpUrl = config.protocol+'://'+config.domainP1;
const restStore = {

	//获取合同
	contractData:httpUrl+'/apply/agreement'

};

export default restStore
