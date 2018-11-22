'use strict';
import config from '../../config/base';
const httpUrl = location.protocol+'//'+config.domainApply+'/'+config.pathApply;
const restStore = {

	//获取活动列表
	getPubActivityInfo:httpUrl+'/pubActivity/activityInfo',

	//埋点接口
	statistics:httpUrl+'/pubActivity/statisticalActivity'

};

export default restStore
