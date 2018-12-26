import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import '../style/index.less';
import views from './views';
import { Router, Route, hashHistory, Link, browserHistory, IndexRedirect } from 'react-router';



//帮助中心
const HelpCenter  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/helpCenter/index'));}, 'HelpCenter');
};
//关于我们
const AboutUs  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/aboutUs/index'));}, 'AboutUs');
};
//帮助中心 子页面
const SecondHelpCenter  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/secondHelpCenter/index'));}, 'SecondHelpCenter');
};
//帮助中心 子页面
const QuestionDetails  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/secondHelpCenter/questionDetails'));}, 'QuestionDetails');
};

//合同
const LoanAgreement  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/loanAgreement/index'));}, 'LoanAgreement');
};
//出借协议
const LendingAgreement  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/lendingAgreement/index'));}, 'LendingAgreement');
};
//登录隐私协议
const PrivacyService  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/privacyService/index'));}, 'PrivacyService');
};
//如何还款
const HowToRepay  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/howToPay/index'));}, 'HowToRepay');
};
//活动
const Activity  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/activity/index'));}, 'Activity');
};
//活动规则
const ActivityRule  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/activity/rule'));}, 'ActivityRule');
};
//活动
const ActivityNew  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/activityNew/index'));}, 'ActivityNew');
};
//优惠券
const Coupon  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/coupon/index'));}, 'Coupon');
};
//活动列表
const Event  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/event/index'));}, 'Event');
};
//优惠券规则
const CouponRule  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/couponRule/index'));}, 'CouponRule');
};
//小额现金贷介绍页
const LoanDetailExplain  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/loanDetail/explain'));}, 'LoanDetailExplain');
};
//现金分期产品介绍页
const LoanStageDetail  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/loanDetail/stage'));}, 'LoanStageDetail');
};
//还款计划表
const RepaymentList  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/largeCash/repaymentList'));}, 'RepaymentList');
}; 
//大额借款协议
const LargeStageAgree  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/lendingAgreement/largeStage'));}, 'LargeStageAgree');
};
//审批及放款
const ApprovalResult  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/approval/result'));}, 'ApprovalResult');
};
//账单
const RepaymentBill  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/repayment/bill'));}, 'ApprovalResult');
};
//借款详情
const LendDtail  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/repayment/lendDetail'));}, 'LendDtail');
};
//申请记录
const ApplyRecord  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/applyRecord'));}, 'ApplyRecord');
};
//要求记录
const InviteRecord  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/inviteRecord'));}, 'InviteRecord');
};
//被推荐人注册
const RecommendReg  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/recommendReg'));}, 'RecommendReg');
};
//推荐成功
const RegSuccess  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/regSuccess'));}, 'RegSuccess');
};
//红包
const RedBag  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/redBag'));}, 'RedBag');
};
//提现
const Withdrawal  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/withdrawal'));}, 'Withdrawal');
};
//提现状态
const WdStatus  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/wdStatus'));}, 'WdStatus');
};
//绑卡
const BindCard  = (location, cb) => {
  require.ensure([], require => {cb(null, require('../views/userCenter/bindCard'));}, 'BindCard');
};

const routes = (
    <div>
        <Route path='/' component={App}>
          <IndexRedirect to='HelpCenter' />
          <Route path='HelpCenter' getComponent={HelpCenter} />
          <Route path="Coupon" getComponent={Coupon}/>
          <Route path="CouponRule" getComponent={CouponRule}/>
          <Route path="Event" getComponent={Event}/>
          <Route path="activity" getComponent={Activity}/>
          <Route path="ActivityRule" getComponent={ActivityRule}/>
          <Route path="activityNew" getComponent={ActivityNew}/>{/**Activity 活动页面*/}
          <Route path="HelpCenter" getComponent={HelpCenter}/>
          <Route path="SecondHC/:name" getComponent={SecondHelpCenter}/>
          <Route path="aboutUs" getComponent={AboutUs}/>
          <Route path="questionDetails" getComponent={QuestionDetails}/>
          <Route path="questionDetails/:title/:name" getComponent={QuestionDetails}/>
          <Route path="HowToRepay" getComponent={HowToRepay}/>
          <Route path="loanAgreement" getComponent={LoanAgreement}/>
          <Route path="privacyService" getComponent={PrivacyService}/>
          <Route path="lendingAgreement" getComponent={LendingAgreement}/>
          <Route path="LoanDetailExplain" getComponent={LoanDetailExplain}/>
          <Route path="LoanStageDetail" getComponent={LoanStageDetail}/>
          <Route path="RepaymentList" getComponent={RepaymentList}/>
          <Route path="LargeStageAgree" getComponent={LargeStageAgree}/>
          <Route path="ApprovalResult" getComponent={ApprovalResult}/>
          <Route path="RepaymentBill" getComponent={RepaymentBill}/>
          <Route path="LendDtail/:name" getComponent={LendDtail}/>
          <Route path="ApplyRecord" getComponent={ApplyRecord}/>
          <Route path="InviteRecord" getComponent={InviteRecord}/>
          <Route path="RecommendReg" getComponent={RecommendReg}/>
          <Route path="RegSuccess" getComponent={RegSuccess}/>
          <Route path="RedBag" getComponent={RedBag}/>
          <Route path="Withdrawal" getComponent={Withdrawal}/>
          <Route path="WdStatus" getComponent={WdStatus}/>
          <Route path="BindCard" getComponent={BindCard}/>
        </Route>
    </div>
);

class App extends React.Component {
  state = {};
  
  // 页面加载前调用
  componentWillMount() {
    this.setFontSize();
  }

  componentDidMount() {
    $('.mainload').hide();
  }

  /*动态设置字体随屏幕的大小而变化*/
  setFontSize = () => {
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth>=900?900:docEl.clientWidth;
          if (!clientWidth) return;
          docEl.style.fontSize = 14 * (clientWidth / 320) + 'px';
        };
     
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  }

  /*
  *替换title
  */
  changeTitle = () => {
    const href = location.href;
    const titles = views.filter((item) => href.indexOf(item.pathName)>=0);
    const languga = href.indexOf('English')>=0?'English':'Indonesian';
    if(titles.length>0){
      if(href.indexOf(titles[0].pathName)>=0){
        //设置页面标题
        if(languga == 'Indonesian'){
          document.title = titles[0].IndonesianTitle;
        }else{
          document.title = titles[0].title;
        }
      }else{
        //设置页面标题
        document.title = ' ';
      }
    }else{
      //document.title = ' ';
    }
  }

  render() {
    /*
    *监听路由的变化
    */
    this.changeTitle();//首次打开路由无变化，先执行一次changeTitle
    hashHistory.listen(()=>{
      this.changeTitle();
    })
    return (
      <Router history={hashHistory} routes={routes} />
    );
  }
}
App.defaultProps = {
};

export default App;
