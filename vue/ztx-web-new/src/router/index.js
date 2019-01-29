import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

// 页面路由 ---------------------------------------
const index = () =>
  import ('@/views/index'); // 首页
const companyPro = () =>
  import ('@/views/companyPro'); // 公司简介
const howItWork = () =>
  import ('@/views/howItWork'); // 它是如何工作的
const riskStatement = () =>
  import ('@/views/riskStatement'); // 风险声明
const webNotice = () =>
  import ('@/views/webNotice'); // 网站公告
const faq = () =>
  import ('@/views/faq'); // FAQ
const complaintPro = () =>
  import ('@/views/complaintPro'); // 投诉程序     
// 路由加载 --------------------------------------
const router = new Router({
  // mode: "history",
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    // 主页路由
    {
      path: '/index',
      component: index
    },
    {
      path: '/companyPro',
      component: companyPro
    },
    {
      path: '/howItWork',
      component: howItWork
    },
    {
      path: '/riskStatement',
      component: riskStatement
    },
    {
      path: '/webNotice',
      component: webNotice
    },
    {
      path: '/faq',
      component: faq
    },
    {
      path: '/complaintPro',
      component: complaintPro
    }
  ]
});

// 输出router
export default router;
