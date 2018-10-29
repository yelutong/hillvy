import React from 'react';
import { Result, List, WhiteSpace } from 'antd-mobile';
import refuse from '../../images/loan/refuse.png';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

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
    let result=0,rPic,rTtile,eMess;
    if(result==0){//拒绝
      rTtile="Mohon maaf";
      eMess="Berdasarkan hasil verifikasi informasi Anda, pengajuan ini dinyatakan tidak lolos verifikasi. Silahkan ajukan kembali besok.Terima kasih.";
    } 
    return (
      <div className="PreCreditRefuse">
        <Result
          img={myImg(refuse)}
          title={rTtile}
          message={eMess}
        /> 
      </div>
    );
 }
}

PreCreditRefuse.defaultProps = {
};

export default PreCreditRefuse;

