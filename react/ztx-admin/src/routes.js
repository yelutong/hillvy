import Vue from 'vue'
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
//import dataReport from './views/nav1/dataReport.vue'
//import downloadList from './views/nav1/downloadList.vue'
//import userAdvice from './views/nav1/userAdvice.vue'
//import smsEdit from './views/nav2/smsEdit.vue'
//import letter from './views/nav2/letter.vue' //借款站内信
//import announcement from './views/nav2/announcement.vue' //公告
//import paymentChannel from './views/nav2/paymentChannel.vue' //付款通道配置
//import appError from './views/nav3/appError.vue'
//import clearVerificationCode from './views/nav4/clearVerificationCode.vue'//清空验证码次数
//import modifyPhoneNum from './views/nav4/modifyPhoneNum.vue'//修改手机号
//import echarts from './views/charts/echarts.vue' 报表

//组件拆分 按需加载
const dataReport = () => import('./views/nav1/dataReport.vue')
const downloadList = () => import('./views/nav1/downloadList.vue')
const userAdvice = () => import('./views/nav1/userAdvice.vue')
const smsEdit = () => import('./views/nav2/smsEdit.vue')
const letter = () => import('./views/nav2/letter.vue')
const announcement = () => import('./views/nav2/announcement.vue')
const paymentChannel = () => import('./views/nav2/paymentChannel.vue')
const appError = () => import('./views/nav3/appError.vue')
const clearVerificationCode = () => import('./views/nav4/clearVerificationCode.vue')
const modifyPhoneNum = () => import('./views/nav4/modifyPhoneNum.vue')
const strategyPackage = () => import('./views/nav3/strategyPackage.vue')

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/A',
        component: Home,
        name: '数据监控',
        iconCls: 'el-icon-menu',//图标样式class
        children: [
            { path: '/dataReport', component: dataReport, name: '数据报表' },
            { path: '/downloadList', component: downloadList, name: '下载注册' },
            { path: '/userAdvice', component: userAdvice, name: '用户意见查询' },
        ]
    },
    {
        path: '/B',
        component: Home,
        name: '信息配置',
        iconCls: 'el-icon-menu',//图标样式class
        children: [
            //{ path: '/Monitor', component: Monitor, name: '行为监控',hidden: true },
            { path: '/smsEdit', component: smsEdit, name: '短信配置' },
            { path: '/letter', component: letter, name: '消息提醒' },
            { path: '/announcement', component: announcement, name: '系统公告' },
            { path: '/paymentChannel', component: paymentChannel, name: '付款通道配置' },
        ]
    },
    {
        path: '/D',
        component: Home,
        name: '客户操作',
        iconCls: 'el-icon-menu',
        //leaf: true,//只有一个节点
        children: [
            { path: '/ClearVerificationCode', component: clearVerificationCode, name: '清空验证码次数' },
            { path: '/ModifyPhoneNum', component: modifyPhoneNum, name: '修改手机号' },
        ]
    },
    {
        path: '/C',
        component: Home,
        name: '其他',
        iconCls: 'el-icon-menu',
        //leaf: true,//只有一个节点
        children: [
            { path: '/appError', component: appError, name: 'app错误日志' },
            { path: '/strategyPackage', component: strategyPackage, name: '策略包管理' }
        ]
    },
    /*{
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },*/
    {
        path: '/*',
        hidden: true,
        redirect: { path: '/A' }
    }
];

export default routes;