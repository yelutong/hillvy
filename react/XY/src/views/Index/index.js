import React, {Component} from 'react';
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './index.css';
import IndexContent from '../IndexContent/index'; 
import Cart from '../Cart/index';
import VContent from '../VContent/index';
import User from '../user/index';

import index from './images/index.png';
import index1 from './images/index1.png';
import cart from './images/cart.png';
import cart1 from './images/cart1.png';
import v1 from './images/v1.png';
import v from './images/v.png';
import user from './images/user.png';
import user1 from './images/user1.png';

class Index extends Component {

    constructor(props) {
    super(props);
      this.state = {
        selectedTab: 'tab1',
        hidden: false,
        fullScreen: false,
      };
    }

    componentDidMount = () => {
       
    }
    
    render() {
        return (
          <div className="Index">
         <TabBar
          unselectedTintColor="#5A5A5A"
          tintColor="#FF4F00"
          barTintColor="white"
          prerenderingSiblingsNumber={0}
          hidden={this.state.hidden}
        >

          <TabBar.Item
            title="首页"
            key="首页"
            icon={<div style={{
              width: '20px',
              height: '20px',
              background: 'url('+index+') center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '20px',
              height: '20px',
              background: 'url('+index1+') center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'tab1'}
            onPress={() => {
              this.setState({
                selectedTab: 'tab1',
              });
            }}
            data-seed="logId"
          >
            <IndexContent/>
          </TabBar.Item>

          <TabBar.Item
            icon={
              <div style={{
                width: '20px',
                height: '20px',
                background: 'url('+v+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '20px',
                height: '20px',
                background: 'url('+v1+') center center /  21px 21px no-repeat' }}
              />
            }
            title="小V"
            key="小V"
            selected={this.state.selectedTab === 'tab2'}
            onPress={() => {
              this.setState({
                selectedTab: 'tab2',
              });
            }}
            data-seed="logId1"
          >
            <VContent/>
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '20px',
                height: '20px',
                background: 'url('+cart+') center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '20px',
                height: '20px',
                background: 'url('+cart1+') center center /  21px 21px no-repeat' }}
              />
            }
            title="购物车"
            key="购物车"
            badge={1}
            selected={this.state.selectedTab === 'tab3'}
            onPress={() => {
              this.setState({
                selectedTab: 'tab3',
              });
            }}
          >
           <Cart/>
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: user }}
            selectedIcon={{ uri: user1}}
            title="个人"
            key="个人"
            selected={this.state.selectedTab === 'tab4'}
            onPress={() => {
              this.setState({
                selectedTab: 'tab4',
              });
            }}
          >
            <User/>
          </TabBar.Item>
        </TabBar>

          </div>     
        )
    }
}

export default withRouter(Index);
 