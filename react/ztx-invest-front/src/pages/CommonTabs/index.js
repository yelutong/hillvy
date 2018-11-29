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
      tabHeight:'300px',
      tabIndex: localStorage.getItem('tabIndex')||0,
    }

    constructor(props) {
        super(props); 
    }

    componentDidMount = () => {
        //获取屏幕有效高度
        console.log(document.documentElement.clientHeight-44);
        this.setState({
          tabHeight:(document.documentElement.clientHeight-44)+'px'
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
              onTabClick={(tab, index) => { this.setState({ tabIndex : index });localStorage.setItem("tabIndex",index);}}
              >
              <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: this.state.tabHeight, backgroundColor: '#f5f5f5' }}>

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
 