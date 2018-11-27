import React, {Component} from 'react';
import {Link,withRouter } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import viewTitle from '../../router/views';//获取title
import './Nav.css';//获取title

class Nav extends Component {
  state={
      viewTitle:viewTitle()
  }

  componentWillReceiveProps (nextProps) {
      this.setState({
          viewTitle:viewTitle() || {}
      });
  }

  /*
  *@description 返回
  */
  goBack (backUrl) {
      if(backUrl){ //如果有url，就跳转到相应url
          //跳转到对应的url
      }else{
        console.log('点击了返回');
        this.props.history.goBack();//没有url，就正常返回
      }
  }

  render() {
      return (
          <div>
              {this.state.viewTitle.isShow?<NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.goBack.bind(this,this.state.viewTitle.backUrl)}
              >{this.state.viewTitle.titleText?this.state.viewTitle.title:''}</NavBar>:''}
          </div>
      )
  }
}

export default withRouter(Nav)