import React from 'react';

import {Route, Switch, BrowserRouter as Router,browserHistory} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import Index from 'bundle-loader?lazy&name=index!views/Index/index';//投标状态页

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
          <Route exact path="/" component={createComponent(Index)}/>
        </Switch>
    </Router>
);
