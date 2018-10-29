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


export default {
  memberType: "COMP",//	String	会员类型(企业会员：COMP，个人会员：PERSON)
  epMemberType: "",//	String	商户类型（GENERAL：普通企业,DEALER:商户）
  mobileNo: "",//	String	联系人手机号
  epCertType: "EP_SCCNO",//	String	"企业证件类型(营业执照：EP_BLICENSENO，统一社会信用代码：EP_SCCNO,其他：OTHER)	"
  epCertNo: "",//	String	企业证件号｜｜注册码
  epAddress: "",//	String	营业地址
  epName: "",//	String	企业名称
  epBusinessScope: "",//	String	经营范围
  epExpDate: "",//	String	营业期限(日期格式：yyyy-MM-dd,长期请填：9999-12-31)
  epOrgCode: "",//	String	组织机构代码号
  epTaxCode: "",//	String	税务登记号
  epOrgPath: "",//  组织代码证图片
  epTaxPath: "",//  税务登记证图片
  epLicenseImgPath: "",//	String	营业执照内网存放路径
  legalCertType: "I_CARD",//	String	法人证件类型（身份证:I_CARD；军官证:O_CERT；护照:PASSPORT；港澳通行证:HK_M_PASS；澳门居民来往大陆通行证:MC_PASS；台湾居民来往大陆通行证:TW_PASS）
  legalName: "",//	String	法人姓名
  legalCertNo: "",//	String	法人身份证号
  legalCertExpDate: "",//	String	法人身份证有效期限（止）（yyyy-MM-dd）
  legalCertFrontPath: "",//	String	法人身份证正面内网存放路径
  legalCertBackPath: "",//	String	法人身份证背面内网存放路径
  agentCertType: "I_CARD",//	String	代理人证件类型（身份证:I_CARD；军官证:O_CERT；护照:PASSPORT；港澳通行证:HK_M_PASS；澳门居民来往大陆通行证:MC_PASS；台湾居民来往大陆通行证:TW_PASS）
  agentName: "",//	String	代理人姓名
  agentCertNo: "",//	String	代理人身份证号
  agentCertExpDate: "",//	String	代理人身份证有效期限（止）（yyyy-MM-dd）
  agentCertFrontPath: "",//	String	代理人身份证正面内网存放路径
  agentCertBackPath: "",//	String	代理人身份证背面内网存放路径
  authLetterPath: "",//	String	上传后的代理人授权委托书内网地址
  agentHas:'N' //授权人信息是否打开
};
