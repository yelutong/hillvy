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
    state = {
      tabHeight:(document.documentElement.clientHeight-44)+'px',
      tabIndex: localStorage.getItem('tabIndex')||0,
    }

    constructor(props) {
        super(props); 
    }

    componentDidMount = () => {
        this.setState({
            tabHeight:(document.documentElement.clientHeight-44)+'px'
        })
    }

    /*
    *@description 捕获页面切换tab
    */
    changeIndex = (tab, index) => {
      console.log(tab, index);
      this.setState({
        tab:tab
      })
    }
    
    render() {
        return (
          <div className="CommonTabs">
            <Nav />
            <Tabs tabs={tabs}
              initialPage={Number(this.state.tabIndex)}
              animated={true} 
              useOnPan={false}
              swipeable={true}
              tabBarActiveTextColor="#333"
              tabBarInactiveTextColor="#999"
              onChange={(tab, index) => { this.changeIndex(index, tab) }}
              onTabClick={(tab, index) => { this.setState({ tabIndex : index });localStorage.setItem("tabIndex",index);}}
              >
              <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: this.state.tabHeight, backgroundColor: '#f5f5f5' }}>

               <ProductContent/>
              
              </div>

              <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: this.state.tabHeight, backgroundColor: '#f5f5f5' }}>
               
               <AbstractContent/>
              
              </div>
            </Tabs>
          </div>     
        )
    }
}

export default withRouter(CommonTabs);
 