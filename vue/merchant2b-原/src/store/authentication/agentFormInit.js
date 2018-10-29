/**
 * Created by sf5 on 7/4/18.
 */
let agentForm = {
  agentCertType: "I_CARD",//	String	代理人证件类型（身份证:I_CARD；军官证:O_CERT；护照:PASSPORT；港澳通行证:HK_M_PASS；澳门居民来往内地通行证:MC_PASS；台湾居民来往大陆通行证:TW_PASS）
  agentName: "",//	String	代理人姓名
  agentCertNo: "",//	String	代理人身份证号
  agentCertExpDate: "",//	String	代理人身份证有效期限（止）（yyyy-MM-dd）
  agentCertFrontPath: "",//	String	代理人身份证正面内网存放路径
  agentCertBackPath: "",//	String	代理人身份证背面内网存放路径
  authLetterPath: "",//	String	上传后的代理人授权委托书内网地址
};
export  default agentForm;
