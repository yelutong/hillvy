import React from 'react';

import {Route, Switch, BrowserRouter as Router,browserHistory} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import TenderStatus from 'bundle-loader?lazy&name=tenderStatus!views/TenderStatus/Index';//投标状态页

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
            <Route exact path="/" component={createComponent(CommonTabs)}/>
            /*
            *status的值分别为：fail 投标失败，waiting 投标等待，success 投标成功
            *查看url的时候/TenderStatus/fail  类似等等
            */
            <Route path="/TenderStatus/:status" component={createComponent(TenderStatus)}/>
            <Route path="/TenderStatus" component={createComponent(TenderStatus)}/>
            <Route path="/TenderDetail" component={createComponent(TenderDetail)}/>
            <Route path="/CommonTabs" component={createComponent(CommonTabs)}/>
            <Route path="/AgreementList/:type" component={createComponent(AgreementList)}/>
            <Route path="/AgreementList" component={createComponent(AgreementList)}/>
            <Route path="/TenderConfirm" component={createComponent(TenderConfirm)}/>
            <Route path="/Recharge" component={createComponent(Recharge)}/>
            <Route path="/Withdrawal" component={createComponent(Withdrawal)}/>
            <Route path="/PaymentCode" component={createComponent(PaymentCode)}/>
            <Route path="/SelectAccount" component={createComponent(SelectAccount)}/>
            <Route path="/RechargeSucc" component={createComponent(RechargeSucc)}/>
            <Route path="/authResult/:status" component={createComponent(AuthResult)}/>
            <Route path="/authResult" component={createComponent(AuthResult)}/>
            <Route path="/WDResult" component={createComponent(WDResult)}/>
            <Route path="/AssetsReport" component={createComponent(AssetsReport)}/>
            <Route path="/ContractIframe" component={createComponent(ContractIframe)}/>
            <Route path="/HowToRepayIframe" component={createComponent(HowToRepayIframe)}/>
        </Switch>
    </Router>
);
