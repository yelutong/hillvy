'use strict';
/*
*@description 设置所有页面的title
* isShow 是否展示顶部Nav，
* titleText 是否展示title的名称，
* backUrl 返回按钮跳转，不添加url表示一般的返回
*/
const views = [
	//投标状态页
	{pathName:'/TenderStatus',title:'Status Pendanaan',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  {pathName:'/TenderStatus/fail',title:'Status Pendanaan',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  {pathName:'/TenderStatus/success',title:'Status Pendanaan',isShow:true,titleText:true,backUrl:'/CommonTabs'},
	//标的详情页
	{pathName:'/TenderDetail',title:'Detail',isShow:true,titleText:true,backUrl:''},
	//首页（标的和出借账户中心tabs）
  {pathName:'/CommonTabs',title:'CommonTabs',isShow:true,titleText:false,backUrl:'finish'},
  //投标确认页
  {pathName:'/TenderConfirm',title:'Daftar Pendanaan',isShow:true,titleText:true,backUrl:''},
  //合同列表页
  {pathName:'/AgreementList',title:'Perjanjian',isShow:true,titleText:true,backUrl:''},
  {pathName:'/AgreementList/loan',title:'Perjanjian',isShow:true,titleText:true,backUrl:''},
  {pathName:'/AgreementList/lend',title:'Perjanjian',isShow:true,titleText:true,backUrl:''},
  //充值页
  {pathName:'/Recharge',title:'Tambah Dana',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  //提现页
  {pathName:'/Withdrawal',title:'Penarikan',isShow:true,titleText:true,backUrl:''},
  //付款码页面
  {pathName:'/PaymentCode',title:'Tambah Dana',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  //选择托管户
  {pathName:'/SelectAccount',title:'Bidding cepat',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  //充值成功页
  {pathName:'/RechargeSucc',title:'Status Penambahan Dana',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  //提现结果页
  {pathName:'/WithdrawalResult',title:'Status Penarikan',isShow:true,titleText:true,backUrl:''},
  //认证结果页
  {pathName:'/authResult/fail',title:'Otentikasi gagal',isShow:true,titleText:true,backUrl:'finish'},
  {pathName:'/authResult/success',title:'Otentikasi berhasil',isShow:true,titleText:true,backUrl:'finish'},
  {pathName:'/AuthResult/fail',title:'Otentikasi gagal',isShow:true,titleText:true,backUrl:'finish'},
  {pathName:'/AuthResult/success',title:'Otentikasi berhasil',isShow:true,titleText:true,backUrl:'finish'},
  {pathName:'/WDResult',title:'Status Penarikan',isShow:true,titleText:true,backUrl:'/CommonTabs'},
  //资产详情
  {pathName:'/AssetsReport',title:'Ringkasan Pendana',isShow:true,titleText:true,backUrl:''},
  //合同页-嵌入iframe
  {pathName:'/ContractIframe',title:'Perjanjian',isShow:true,titleText:true,backUrl:''},
  //如何还款-嵌入iframe
  {pathName:'/HowToRepayIframe',title:'Tata Cara Pembayaran',isShow:true,titleText:true,backUrl:''},
];

/*
*@description 筛选url相应的title
*/
const viewTitle = () => {
	const href = window.location.pathname;
    const titles = views.filter((item) => window.location.pathname == item.pathName);
    const viewTitle = titles.length>0?titles[0]:{}; 
	document.title = viewTitle.title;//设置浏览器title
	return viewTitle;
}

export default viewTitle
