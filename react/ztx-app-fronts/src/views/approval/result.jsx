import React from 'react';
import { Result, List, WhiteSpace } from 'antd-mobile';
import refuse from '../../images/loan/refuse.png';
import wait from '../../images/loan/wait.png';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class ApprovalResult extends React.Component {
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
      if(document.title == 'Pusat Bantuan' || document.title == 'ApprovalResult'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.ApprovalResult .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'ApprovalResult';
        }
      }
    })
    let result=3,rPic,rTtile,eMess;
    if(result==0){//审批中
      rPic=wait;
      rTtile="Dalam Proses Verifik";
      eMess=(
        <div>
        <p>Diperkirakan 1 – 5 hari kerja</p>
        <p>Pastikan HP Anda selalu aktif</p>
        </div>
        );
    }else if(result==1){//放款中
      rPic=wait;
      rTtile="Sedang Dicairkan";
      eMess="Pinjaman Anda telah lolos verifikasi dan diperkirakan 1 – 3 hari kerja untuk sampai ke rekening bank Anda";
    }else{//被拒绝
      rPic=refuse;
      rTtile="Gagal Terverifikasi";
      eMess="Mohon maaf. Berdasarkan hasil verifikasi informasi Anda, pengajuan ini dinyatakan tidak lolos verifikasi. Silahkan ajukan kembali pada 11 Oktober 2018. Terima kasih";
    }
    
    return (
      <div className="ApprovalResult">
        <Result
          img={myImg(rPic)}
          title={rTtile}
          message={eMess}
        />
        <WhiteSpace />
        <Item extra={'Rp925.000'}>Nominal Pinjaman</Item>
        <Item extra={'7hari'}>Tenor</Item>
      </div>
    );
 }
}

ApprovalResult.defaultProps = {
};

export default ApprovalResult;

