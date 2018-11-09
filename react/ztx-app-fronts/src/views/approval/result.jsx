import React from 'react';
import { Result, List, WhiteSpace } from 'antd-mobile';
import refuse from '../../images/loan/refuse.png';
import wait from '../../images/loan/wait.png';
import DateApi from '../../js/dateFormat.js';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class ApprovalResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tryDate:'',
    }
  }
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});

    console.log(this.props.location.query);
  }

  componentDidMount() {

  }

  render() {
    var result,flag=true;
    if(this.props.location.query.PAGE=="APPROVE_WAITING"){
      result=0
    }else if(this.props.location.query.PAGE=="LOAN_WAITING"){
      result=1
    }else if(this.props.location.query.PAGE=="APPLY_REJECT"){//授信拒绝
      result=2;
      flag=false;
    }else{//审批被拒绝  APPROVE_REJECT
      result=3;
      let tDate = this.props.location.query.tryDate || '';
      if(tDate){
        this.state.tryDate = DateApi.format2(parseInt(tDate));
        console.log(this.state.tryDate);
      }
    }
    if(flag==true&&this.props.location.query.LoadAmt&&this.props.location.query.Term){
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
      eMess=(
        <div>
        <p>Pinjaman Anda telah lolos verifikasi dan</p>
        <p>diperkirakan 1 – 3 hari kerja untuk sampai ke</p>
        <p>rekening bank Anda</p>
        </div>
        );
    }else if(result==2){//预授信拒绝
      rPic=refuse;
      rTtile="Mohon maaf";
      eMess=(
        <div>
        <p>Berdasarkan hasil verifikasi informasi Anda,</p>
        <p>pengajuan ini dinyatakan tidak lolos verifikasi.</p>
        <p>Silahkan ajukan kembali besok.</p>
        <p>Terima kasih.</p>
        </div>
        );
    }else{//审批被拒绝
      rPic=refuse;
      rTtile="Mohon maaf";
      eMess=(
        <div>
        <p>Berdasarkan hasil verifikasi informasi Anda,</p>
        <p>pengajuan ini dinyatakan tidak lolos verifikasi.</p>
        <p>Silahkan ajukan kembali pada {this.state.tryDate}.</p>
        <p>Terima kasih.</p>
        </div>
        );
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

