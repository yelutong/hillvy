import React from 'react';
import baseConfig from '../../config/base';
import HeadIcon from './headIcon'; //头部图标
import FAQ from './FAQ'; //FAQ
import Bottom from '../../common/bottom/index'; //底部
import axios from 'axios';

class HelpCenter extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
    //localStorage.setItem('languga',languga);
  }

  componentDidMount() {
    var pageView = $(window).height();//屏幕可视高度
    var topHelpCenter = $('.helpCenter').height();//FAQ高度
    var bottomHelpCenter = pageView - topHelpCenter;
    console.log(pageView);
    console.log(topHelpCenter);
  }

  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'HelpCenter'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.helpCenter .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'HelpCenter';
        }
      }
    })
    return (
      <div className="helpCenter">
        <div className="padding20 title">{this.state.languga == 'Indonesian'?'Pusat Bantuan':'Help Center'}</div>{/*页面标题*/}
        <HeadIcon languga={this.state.languga}/>{/*头部图标*/}

        <FAQ languga={this.state.languga}/>{/*FAQ*/}

        <Bottom languga={this.state.languga}/>{/*底部*/}
      </div>
    );
  }
}

HelpCenter.defaultProps = {
};

export default HelpCenter;
