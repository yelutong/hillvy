import React from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';

const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class LargeStageAgree extends React.Component {
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
      if(document.title == 'Pusat Bantuan' || document.title == 'LargeStageAgree'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.LargeStageAgree .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'LargeStageAgree';
        }
      }
    })
    return (
      <div className="LargeStageAgree">
        <Result
          img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
          title="验证成功"
          message="还款计划表"
        />
      </div>
    );
 }
}

LargeStageAgree.defaultProps = {
};

export default LargeStageAgree;

