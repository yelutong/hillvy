import React, {Component} from 'react';
import { Tabs, Badge } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './index.css';
import AbstractContent from '../AbstractContent/index';
import ProductContent from '../ProductContent/index';

const tabs = [
  { title: <Badge>Telusuri</Badge> },
  { title: <Badge>Ringkasan</Badge> }
];
 
class CommonTabs extends Component {
  constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
          <div className="CommonTabs">
            <Nav />
            <Tabs tabs={tabs}
              initialPage={0}
              animated={true} 
              useOnPan={false}
              swipeable={false}
              tabBarActiveTextColor="#333"
              tabBarInactiveTextColor="#999"
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
              >
              <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>

               <ProductContent/>
              
              </div>

              <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
               
               <AbstractContent/>
              
              </div>
            </Tabs>
          </div>     
        )
    }
}

export default withRouter(CommonTabs);
 