import React from 'react';

import {Route, Switch, BrowserRouter as Router,browserHistory} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import TenderStatus from 'bundle-loader?lazy&name=tenderStatus!pages/TenderStatus/Index';
import Tender from 'bundle-loader?lazy&name=tender!pages/Tender/Index';
import CommonTabs from 'bundle-loader?lazy&name=commonTabs!pages/CommonTabs/Index';


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
            <Route path="/Tender" component={createComponent(Tender)}/>
            <Route path="/CommonTabs" component={createComponent(CommonTabs)}/>
        </Switch>
    </Router>
);
