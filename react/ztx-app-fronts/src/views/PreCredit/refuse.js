import React from 'react';
import { Button } from 'antd-mobile';

class PreCreditRefuse extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  componentDidMount() {

  }

  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'PreCreditRefuse'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.PreCreditRefuse .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'PreCreditRefuse';
        }
      }
    })
    return (
      <div className="PreCreditRefuse">
        <div className="padding20 title">{this.state.languga == 'Indonesian'?'Pusat Bantuan':'PreCredit Refuse'}</div>{/*页面标题*/}
        <Button>Start</Button>
      </div>
    );
 }
}

PreCreditRefuse.defaultProps = {
};

export default PreCreditRefuse;
