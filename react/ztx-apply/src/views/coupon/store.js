'use strict';
import config from '../../config/base';
const httpUrl = location.protocol+'//'+config.domainApply+'/'+config.pathApply;
const restStore = {

	//获取优惠券列表
	couponInfo:httpUrl+'/pubActivity/couponInfo'

};

export default restStore
