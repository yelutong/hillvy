import React, {Component} from 'react';
import {Link,withRouter } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import viewTitle from '../../router/views';//获取title
import './Nav.css';//获取title

import netError from '../errorNet/images/netError.png';

class Nav extends Component { 
  state={
      fromUrl:this.props.history.location.state?this.props.history.location.state.fromUrl:'',
      viewTitle:viewTitle()
  }

  componentWillReceiveProps (nextProps) {
      this.setState({
          viewTitle:viewTitle() || {}
      });
  }
  componentDidMount(){
    console.log('history',this.props);
    console.log('fromUrl',this.state.fromUrl);
    hasBackUrl = this.state.viewTitle.backUrl;
    thisPage = this;
  }

  componentWillUnmount = () => {

  }
  
  /*
  *@description 返回
  */
  goBack (backUrl) {
      if(backUrl){ //如果有url，就跳转到相应url
          if(backUrl == 'finish'){
            if(App){
              localStorage.clear(); //清空localStorage
              App.finish();
            }
            console.log('调用app的关闭H5');
          }else if(this.state.fromUrl == '/SelectAccount'){
            this.props.history.goBack();//没有url，就正常返回
          }else{
            //跳转到对应的url
            this.props.history.push(backUrl);
          }
      }else{
        this.props.history.goBack();//没有url，就正常返回
      }
  }

  render() {
    var bgBlue = window.location.pathname.indexOf('Withdrawal')>=0?'bgBlue':'';
    return (
      <div id={bgBlue}>
          <img style={{'display':'none'}} src={netError} />
          {this.state.viewTitle.isShow?<NavBar
            mode="light"
            className={bgBlue}
            id="NavBar"
            icon={<Icon type="left" />}
            onLeftClick={this.goBack.bind(this,this.state.viewTitle.backUrl)}
          >{this.state.viewTitle.titleText?this.state.viewTitle.title:''}</NavBar>:''}
      </div>
    )
  }
}

export default withRouter(Nav)