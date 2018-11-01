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

    console.log(this.props.location.query.PAGE);
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
    var result;
    if(this.props.location.query.PAGE=="APPROVE_WAITING"){
      result=0
    }else if(this.props.location.query.PAGE=="LOAN_WAITING"){
      result=1
    }else if(this.props.location.query.PAGE=="APPLY_REJECT"){
      result=2
    }else{
      result=3
    }
    if(this.props.location.query.LoadAmt&&this.props.location.query.Term){
      var amtShow=(
        <div>
          <Item extra={this.props.location.query.LoadAmt}>Nominal Pinjaman</Item>
          <Item extra={this.props.location.query.Term}>Tenor</Item>
        </div>
        )
    }
    let rPic,rTtile,eMess;
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
    }else if(result==2){//预授信拒绝
      rPic=refuse;
      rTtile="Mohon maaf";
      eMess="Berdasarkan hasil verifikasi informasi Anda, pengajuan ini dinyatakan tidak lolos verifikasi. Silahkan ajukan kembali besok.Terima kasih.";
    }else{//审批被拒绝
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
        {amtShow}
      </div>
    );
 }
}

ApprovalResult.defaultProps = {
};

export default ApprovalResult;

