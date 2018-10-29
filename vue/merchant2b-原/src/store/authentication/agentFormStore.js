// /**
//  * Created by sf5 on 6/19/18.
//  */
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex);

// export default initauthForm;
// const authFormStore = new Vuex.Store({
//   state: initauthForm,
//   mutations: {
//     epCertNoEnsure: function (state, epCertType) {
//       state.epCertType = epCertType;
//     },
//     epExpDateSet: (state, date) => {
//       state.epExpDate = date;
//     }
//   }
// });
let agentForm = {
  agentCertType: "",//	String	代理人证件类型（身份证:I_CARD；军官证:O_CERT；护照:PASSPORT；港澳通行证:HK_M_PASS；澳门居民来往大陆通行证:MC_PASS；台湾居民来往大陆通行证:TW_PASS）
  agentName: "",//	String	代理人姓名
  agentCertNo: "",//	String	代理人身份证号
  agentCertExpDate: "",//	String	代理人身份证有效期限（止）（yyyy-MM-dd）
  agentCertFrontPath: "",//	String	代理人身份证正面内网存放路径
  agentCertBackPath: "",//	String	代理人身份证背面内网存放路径
  authLetterPath: "",//	String	上传后的代理人授权委托书内网地址
};
const agentFormStore = {
  state: agentForm,
  mutations: {
    update: function (state, obj) {
      state[obj.name] = obj.value;
    }
  }
};
export default agentFormStore;
