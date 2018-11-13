import React from 'react';
import config from '../../config/base';
import {  Toast, Result, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import noLoan from '../../images/loan/noLoan.png';
import axios from 'axios';
import DateApi from '../../js/dateFormat.js';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

const tabs = [
{ title: <Badge>Pending</Badge> },
{ title: <Badge>Lunas</Badge> },
];

class ApplyRecord extends React.Component {
  constructor(props) {
    super(props);
    this.statApplyRecorde = {
      listData:[],
      getResult:'',
    };
    console.log(this.props.location.query);
    localStorage.setItem('token',this.props.location.query.token||localStorage.getItem('token'));//"8439096e96794349b2bdd5ff4603cfe7"
    this.getRecordContent();
  }
  state = {languga:'Indonesian'};
  componentWillMount() {//在render()方法之前
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  } 
  componentDidMount() {
    
  }
  routerTo(v) {
    console.log(`/LendDtail/${v}`);
    this.props.router.push(`/LendDtail/${v}`);//依赖React-Router3.X版本
  }
  getRecordContent = () => {
   let listShow=[],recordContent; 
   let url=config.protocol+'://'+config.domainApply+'/kpt-apply/apply/auth/v3/history';
   axios.get(url,{params:{"registId":this.props.location.query.registId}}).then((res) => {
    if(App){
      App.showLoading(false);
    }
    if(res.data.code == '0000'){
      console.log(res); 
      var listData = res.data.body;
      if(!(listData&&listData.length>0)){
        $('.RepaymentBill .am-result').height(document.body.clientHeight-44);
      }
      this.setState({ listData: listData });
    }else{
      $('.RepaymentBill .am-result').height(document.body.clientHeight-44);
    }
    }).catch(function (error) {
      $('.RepaymentBill .am-result').height(document.body.clientHeight-44);
      Toast.info(String(error));
      });
  }
  render() {
    return ( 
      <div className="ApplyRecord">
      <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
      { (this.state.listData&&this.state.listData.length>0)?
        this.state.listData.map((item,i) => {
         return (
           <div className="vertical-view billList flex1" key={i}>
           <div className="bg-gray lh-30 pb5 txt-gray center"><span className="fs-10">Tanggal Pengajuan {DateApi.format3(item.applyTime)}</span></div>
           <Item className="fs-13 mb2"><Brief>Nomor : {item.contractNo}</Brief></Item>
           <div className="noLine">
           <Item
           thumb={bill01}
           >Sisa Pembayaran：Rp {DateApi.addDot(item.loanAmt)}</Item>
           <Item
           thumb={bill02}
           >
           Tanggal Pembayaran：{item.productTerm}{item.productTermType=="DAY"?"hari":"bulan"}
           </Item>
           </div> 
           <div className="horizontal-view align-items-center ht-44">
           <div className={(item.status=="REJECTED"||item.status=="FAILED")?'flex1 txt-red2 listLeft':'flex1 txt-blue listLeft'}>{DateApi.getResult(item.status)}</div>
           </div>
           </div>
           )
         }):
        <Result className="h100"
        img={myImg(noLoan)}
        message={(
          <div>
          <p>Anda belum mempunyai histori pinjaman.</p>
          <p>Ayo ajukan pinjaman sekarang</p>
          <p>di Pinjam Gampang !</p>
          </div>
          )}
        />
      }
      </div> 
      </div> 
      );
  }
}

ApplyRecord.defaultProps = {
};

export default ApplyRecord;


