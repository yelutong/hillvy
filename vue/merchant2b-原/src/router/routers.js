import Vue from 'vue'
import Router from 'vue-router'
// import authFormInit from  '../store/authentication/authFormInit';
// 首页
const Index = () => import('../views/Index')
// 首页
const AuthenticationHome = () => import('../components/authentication/AuthenticationHome.vue')
const AuthenticationShow = () => import('../components/authentication/AuthenticationShow.vue')
// 首页
const AuthenticationCertificate = () => import('../components/authentication/AuthenticationCertificate.vue')
// 首页
const AuthenticationIdentity = () => import('../components/authentication/AuthenticationIdentity.vue')
// 首页
const AuthenticationAudit = () => import('../components/authentication/AuthenticationAudit.vue')
// 首页
const BankList = () => import('../components/bank/BankList.vue')
// 首页
const BankInfo = () => import('../components/bank/BankInfo.vue')
const BankDetail = () => import('../components/bank/bankDetail.vue')
// 首页
const BankResult = () => import('../components/bank/BankResult.vue')
const BankSuport = () => import('../components/bank/BankSuport.vue')
// 登录
const Login = () => import('../views/Login')
// 注册
const Register = () => import('../views/Register')
// 找回密码
const FindPwd = () => import('../views/FindPwd')
// 绑定手机号
const BindPhone = () => import('../views/BindPhone')
// 首页
const WithdrawDeposit = () => import('../views/WithdrawDeposit')
// 首页
const TransferHome = () => import('../views/TransferHome')
// 首页
const TransferInputNum = () => import('../views/TransferInputNum')
// 首页
const TransferDetails = () => import('../views/TransferDetails')
// 首页
const TransferResult = () => import('../views/TransferResult')
// 账户安全
const AccountSecurity = () => import('../views/AccountSecurity')
// 修改登录密码
const ChangeLoginPwd = () => import('../views/ChangeLoginPwd')
// 修改交易密码
const ChangeTransPwd = () => import('../views/ChangeTransPwd')
// 设置交易密码
const SetTransPwd = () => import('../views/SetTransPwd')
const CheckoutTransPwd = () => import('../views/CheckoutTransPwd')
// 找回交易密码
const FindTransPwd = () => import('../views/FindTransPwd')
// 设置
const Setting = () => import('../views/Setting')
// 服务
const Service = () => import('../views/Service')
// 企业
const Mine = () => import('../views/Mine')
// 首页
const BillDetails = () => import('../views/BillDetails')
// 首页
const BillList = () => import('../views/BillList')
// 资产
const Property = () => import('../views/Property')
// 回填金额
const FillMoney = () => import('../views/FillMoney')
// 帮助中心
const HelpCenter = () => import('../views/HelpCenter')

Vue.use(Router)
let router= new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/bank/fillMoney',
      name: 'fillMoney',
      component: FillMoney
    },
    {
      path: '/authentication/authShow',
      name: 'authShow',
      component: AuthenticationShow,
      meta:{title:'实名认证'}
    },
    {
      path: '/authentication/:type', // new 实名认证（new）  not 未通过审核查看
      name: 'authentication',
      component: AuthenticationHome,
      meta:{title:'实名认证'}
    },
    {
      path: '/authentication/certificate/:memberType', //  COMP 企业  PERSON //个人
      name: 'certificate',
      component: AuthenticationCertificate,
      meta:{title:'实名认证'}
    },
    {
      path: '/authentication/certificate/identity/:memberType', //  COMP 企业  PERSON //个人
      name: 'identity',
      component: AuthenticationIdentity,
      meta:{title:'实名认证'}
    },
    {
      path: '/authentication/certificate/identity/audit/:type',//0 审核查询  1 实名认证提交结果
      name: 'audit',
      component: AuthenticationAudit,
      meta:{title:'实名认证'}
    },
    {
      path: '/bankList',
      name: 'bankList',
      component: BankList,
      meta:{title:'银行卡'}
    },
    {
      path: '/bankInfo/:type',  //  add 新增  modify  更改银行卡
      name: 'bankInfo',
      component: BankInfo,
      meta:{title:'添加银行卡'}
    },  {
      path: '/bank/bankDetail',
      name: 'bankDetail',
      component: BankDetail,
      meta:{title:'银行卡详情'}
    },
    {
      path: '/bank/bankInfo/bankSuport/:type',//bankinfo 回跳的type
      name: 'bankSuport',
      component: BankSuport,
      meta:{title:'选择开户行'}
    },
    {
      path: '/bank/over/bankResult',
      name: 'bankResult',
      component: BankResult,
      meta:{title:'结果页'}
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login/bindPhone',
      name: 'bindphone',
      component: BindPhone
    },
    {
      path: '/index/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index/findPwd',
      name: 'findPwd',
      component: FindPwd
    },
    {
      path: '/mine/property',
      name: 'property',
      component: Property
    },
    {
      path: '/mine/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/mine/setting/accountSecurity',
      name: 'accountSecurity',
      component: AccountSecurity
    },
    {
      path: '/mine/setting/accountSecurity/changeLoginPwd',
      name: 'changeLoginPwd',
      component: ChangeLoginPwd
    },
    {
      path: '/mine/setting/accountSecurity/SetTransPwd/:numType',
      name: 'setTransPwd',
      component: SetTransPwd
    },
    {
      path: '/checkoutTransPwd/:type',
      name: 'checkoutTransPwd',
      component: CheckoutTransPwd,
      meta:{title:'验证交易密码'}
    },
    {
      path: '/mine/setting/accountSecurity/changeTransPwd',
      name: 'changeTransPwd',
      component: ChangeTransPwd
    },
    {
      path: '/mine/setting/accountSecurity/findTransPwd',
      name: 'findTransPwd',
      component: FindTransPwd
    },
    {
      path: '/mine/property/withdrawDeposit',
      name: 'withdrawDeposit',
      component: WithdrawDeposit
    },
    {
      path: '/mine/property/transferHome',
      name: 'transferHome',
      component: TransferHome
    },
    {
      path: '/mine/property/transferHome/transferInputNum',
      name: 'transferInputNum',
      component: TransferInputNum
    },
    {
      path: '/mine/property/transferHome/transferInputNum/transferDetails',
      name: 'transferDetails',
      component: TransferDetails
    },
    {
      path: '/mine/property/transferHome/transferInputNum/transferDetails/transferResult',
      name: 'transferResult',
      component: TransferResult
    },
    {
      path: '/mine/property/billList/billDetails',
      name: 'billDetails',
      component: BillDetails
    },
    {
      path: '/mine/property/billList',
      name: 'billList',
      component: BillList
    },
    {
      path: '/mine/helpCenter',
      name: 'helpCenter',
      component: HelpCenter
    }
  ]
});

export default router;
