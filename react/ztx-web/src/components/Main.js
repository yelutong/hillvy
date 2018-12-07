import React from 'react';
import '../style/H5.css';
import '../style/index.css';
import '../js/index.js';
import Index from '../views/index'; //首页
import Loan from '../views/loan'; //loan
import Introduction from '../views/introduction'; //Introduction
import Risk from '../views/risk'; //Risk
import Announcement from '../views/announcement'; //Announcement
import HelpCenter from '../views/helpCenter'; //HelpCenter
import { Router, Route, hashHistory, Link, useRouterHistory,browserHistory } from 'react-router';

let widthFlag = $(window).width() > 1025 ? true : false;
global.constants = { //定义全局变量
    "wFlag1": widthFlag
};

const About = React.createClass({
  render() {
    return (
      <div><Link to="/">about</Link></div>
    )
  }
})

import { createHashHistory } from 'history'
var appHistory = useRouterHistory(createHashHistory)({queryKey:false});

class App extends React.Component {
  state = {};

  componentWillMount() {/*页面加载前调用*/
    this.setFontSize(); //监听设置字体大小
    window.removeEventListener('resize',this.resize);//移除监听器，否则多个组件之间会导致this的指向紊乱
  }

  componentDidMount() {// 在第一次渲染后调用，只在客户端
    $('.mainload').hide();
    $('.moreNav').hide();
    this.screenChange();//监听屏幕大小变化
  }

  screenChange() {
     window.addEventListener('resize', this.resize);
  }

  resize() {
    var wFlag2 = $(window).width() > 1025 ? true : false;
    if(global.constants.wFlag1 != wFlag2){
      window.location.reload()
    }
  }
  
  /*动态设置字体随屏幕的大小而变化*/
  setFontSize = () => {
    (function (doc, win) {
      var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;
          if(clientWidth>=1025){
            var fontSize = 12 * (clientWidth / 1200);
            docEl.style.fontSize = (fontSize<16?16:(fontSize>26?26:fontSize)) + 'px';
          }else{
            docEl.style.fontSize = 14 * (clientWidth / 320) + 'px';
          }
        };
     
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
  }

  render() {
    return (
      <Router history={browserHistory}>{/*appHistory带#号不带随机数  hashHistory会带hash随机数 browserHistory不带#号不带随机数*/}
        <div>
          {/*PC*/}
          <Route path="/" component={Index}/>
          <Route path="/Index" component={Index}/>{/**Index*/}
          <Route path="/Loan" component={Loan}/>{/**Loan*/}
          <Route path="/Introduction" component={Introduction}/>{/**Introduction*/}
          <Route path="/Risk" component={Risk}/>{/**Risk*/}
          <Route path="/Announcement" component={Announcement}/>{/**Announcement*/}
          <Route path="/HelpCenter" component={HelpCenter}/>{/**HelpCenter*/}

          {/*H5*/}
        </div>
      </Router>
    );
  }
}

App.defaultProps = {
};

export default App;
