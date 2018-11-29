import React from 'react';

import {Route, Switch, BrowserRouter as Router,browserHistory} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import TenderStatus from 'bundle-loader?lazy&name=tenderStatus!pages/TenderStatus/Index';//投标状态页
import TenderDetail from 'bundle-loader?lazy&name=tenderDetail!pages/TenderDetail/Index';//标的详情页
import CommonTabs from 'bundle-loader?lazy&name=commonTabs!pages/CommonTabs/Index';////首页（标的和出借账户中心tabs）
import TenderConfirm from 'bundle-loader?lazy&name=tenderConfirm!pages/TenderConfirm/Index';//投标确认页
import AgreementList from 'bundle-loader?lazy&name=agreementList!pages/AgreementList/Index';//合同列表页
import Recharge from 'bundle-loader?lazy&name=recharge!pages/Recharge/Index';//充值页面
import Withdrawal from 'bundle-loader?lazy&name=withdrawal!pages/Withdrawal/Index';//提现页面
import PaymentCode from 'bundle-loader?lazy&name=paymentCode!pages/PaymentCode/Index';//付款码页面
import SelectAccount from 'bundle-loader?lazy&name=selectAccount!pages/SelectAccount/Index';//选择托管户
import RechargeSucc from 'bundle-loader?lazy&name=rechargeSucc!pages/RechargeSucc/Index';//选择托管户
import WithdrawalResult from 'bundle-loader?lazy&name=withdrawalResult!pages/WithdrawalResult/Index';//选择托管户


const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

export default () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={createComponent(TenderStatus)}/>
            /*
            *status的值分别为：fail 投标失败，waiting 投标等待，success 投标成功
            *查看url的时候/TenderStatus/fail  类似等等
            */
            <Route path="/TenderStatus/:status" component={createComponent(TenderStatus)}/>
            <Route path="/TenderStatus" component={createComponent(TenderStatus)}/>
            <Route path="/TenderDetail" component={createComponent(TenderDetail)}/>
            <Route path="/CommonTabs" component={createComponent(CommonTabs)}/>
            <Route path="/AgreementList" component={createComponent(AgreementList)}/>
            <Route path="/TenderConfirm" component={createComponent(TenderConfirm)}/>
            <Route path="/Recharge" component={createComponent(Recharge)}/>
            <Route path="/Withdrawal" component={createComponent(Withdrawal)}/>
            <Route path="/PaymentCode" component={createComponent(PaymentCode)}/>
            <Route path="/SelectAccount" component={createComponent(SelectAccount)}/>
            <Route path="/RechargeSucc" component={createComponent(RechargeSucc)}/>
            <Route path="/WithdrawalResult" component={createComponent(WithdrawalResult)}/>
        </Switch>
    </Router>
);
