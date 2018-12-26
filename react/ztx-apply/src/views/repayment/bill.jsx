import React from 'react';
import axios from 'axios';
import config from '../../config/base';
import {  Toast, Result, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import DateApi from '../../js/dateFormat.js';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import bill03 from '../../images/loan/bill03.png';
import noLoan from '../../images/loan/noLoan.png';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;
//http://10.3.78.177:8086/#/RepaymentBill?token=8439096e96794349b2bdd5ff4603cfe7&applyId=A2018101901000055
const tabs = [
{ title: <Badge>Belum Lunas</Badge> },
{ title: <Badge>Lunas</Badge> },
];

class RepaymentBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lunas:[],
      repayVal:{},
      paynot:[],
      settle:[],
      repayDetails: [],
      navIndex: localStorage.getItem('navIndex')||0,
    } 
    localStorage.setItem('token',this.props.location.query.token||localStorage.getItem('token'));//this.state.token);
    console.log(this.props.location.query);
    this.getBill();
  }

  componentWillMount() {
    
  }

  componentDidMount() {
     //Js在src/index.html里面定义，Js里面的方法可供app调用
    Js.billTabs = this.billTabs;
  }

  /*
  *@description 供app调用的方法 切换tabs
  */
  billTabs = (tab) => {
    tab = tab == 0?0:1;
    this.setState({ navIndex : tab });
    localStorage.setItem("navIndex",tab);
    console.log('Tabs',tab);
  }

  routerTo(currenList) {
    this.props.router.push({
      pathname:"/LendDtail/"+currenList.contractNo,
      state: {
        isPaid: 0,
        currenList: currenList,
        Lunas: this.state.Lunas,
        loanDetial: this.state.loanDetial,
        repayDetails: this.state.repayDetails
      }
    });//依赖React-Router3.X版本
  }
  routerToPaid(currentItems){
    this.props.router.push({
      pathname:"/LendDtail/"+currentItems.contractNo,
      state: { 
        isPaid: 1,
        currentItems: currentItems,
      }
      })
    this.setState({ navIndex : '1' });
    console.log(localStorage.getItem('navIndex'))
  }
  toApp = (contractNo,balance) => {
    console.log(contractNo+" "+balance)
    if (App) {
      App.repay(contractNo,balance);
    }
    else {
      Toast.info('请在app中打开');
    }
  }

  getBill = () => {
    if(this.props.location.query.applyId){
      let url=location.protocol+'//'+config.domainApply+'/kpt-apply/apply/v3/bill';
      axios.get(url,{params:{"applyId":this.props.location.query.applyId}}).then((res) => {
        if(res.data.code == '0000'){
            console.log(res); 
            let listData = res.data; 
            console.log(listData);
        if(listData.body && listData.body.termSettles&& listData.body.termSettles.length>0){//已还 数组
           var Lunas = listData.body.termSettles;
            for(let i=0;i<Lunas.length;i++){
              let date = Lunas[i].receiveDate ? Date.parse(new Date(Lunas[i].receiveDate)) : '';
              let settleDate = Lunas[i].settleDate ? Date.parse(new Date(Lunas[i].settleDate)) : '';
              Lunas[i].receiveDate = DateApi.format3(date);
              Lunas[i].settleDate = DateApi.format3(settleDate);
            }
           this.setState({ Lunas : Lunas });
        }else{
         $('.RepaymentBill .Lunas .am-result').height(window.screen.height-102);
        }
        if(listData.body && listData.body.settle&& listData.body.settle.length>0){//已还 数组
         var settle = listData.body.settle;
         for(let i=0;i<settle.length;i++){
          let date = settle[i].receiveDate ? Date.parse(new Date(settle[i].receiveDate)) : '';
          let settleDate = settle[i].settleDate ? Date.parse(new Date(settle[i].settleDate)) : '';
          settle[i].receiveDate = DateApi.format2(date);
          settle[i].settleDate = DateApi.format3(settleDate);
        }
        this.setState({ settle : settle });
        } 
        if(listData.body && listData.body.loanDetial){
          let loanDetial = listData.body.loanDetial;
          this.setState({ loanDetial : loanDetial });
        }
        if(listData.body && listData.body.repayDetails && listData.body.repayDetails.length > 0){
          let repayDetails = listData.body.repayDetails;
          for(let i=0;i < repayDetails.length;i++){
           let date = repayDetails[i].returnDate ? Date.parse(new Date(repayDetails[i].returnDate)) : '';
           if(date){
            repayDetails[i].returnDate = DateApi.format2(date);
           }
          }
          console.log(repayDetails);
         this.setState({ repayDetails : repayDetails });
        }
          if(listData.body && listData.body.toRepayList&&listData.body.toRepayList.length>0){//待还
            var paynot = listData.body.toRepayList; 
            for(let i=0;i < paynot.length;i++){
              var date = paynot[i].receiveDate ? Date.parse(new Date(paynot[i].receiveDate)) : '';
              var dateApply = paynot[i].applyTime ? Date.parse(new Date(paynot[i].applyTime)) : '';
              if(paynot[i].status != 'overdue'){
                paynot[i].DateDiff = DateApi.DateDiff(date);//剩余多少天到期
              }
              if(i>0){
                paynot[i].notClick = true;
              }
              paynot[i].receiveDate = DateApi.format2(date);
              paynot[i].returnDate1 = DateApi.format3(date);
              paynot[i].applyTime = DateApi.format3(dateApply);
            }
            this.setState({ paynot : paynot });
            if(App){
              let timestamp1 =Date.parse(new Date());
             (paynot&&paynot.length>0&&(paynot[0].status=='overdue'||paynot[0].receiveDate==DateApi.format2(timestamp1)))?App.redViewShow(true):App.redViewShow(false);
           }
          }else{
            $('.RepaymentBill .paynot .am-result').height(window.screen.height-102);
          }
        }else{
          $('.RepaymentBill .am-result').height(window.screen.height-102);
        }
      }).catch(function (error) {
        $('.RepaymentBill .am-result').height(window.screen.height-102);
        console.log(error);
      });
  }else{
    $('.RepaymentBill .am-result').height(window.screen.height-102);
  }
}
render() {
  return (
    <div className="RepaymentBill">
    <Tabs tabs={tabs}
    initialPage={Number(this.state.navIndex)}
    page={Number(this.state.navIndex)}
    animated={false} 
    useOnPan={false}
    swipeable={false}
    tabBarActiveTextColor="#333"
    tabBarInactiveTextColor="#999"
     onTabClick={(tab, index) => { this.setState({ navIndex : index });localStorage.setItem("navIndex",index);}}
    >
    <div className="paynot vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
    { (this.state.paynot&&this.state.paynot.length>0)?
      this.state.paynot.map((item,i) => {
       return (
        <div className="vertical-view billList flex1" key={i}>
        <div className="bg-gray lh-30 pb5 txt-gray center"><span className="fs-10">Tanggal Pengajuan {item.applyTime}</span></div>
        <Item arrow="horizontal" onClick={()=>{this.routerTo(item)}}><Brief>Nomor Perjanjian : {item.contractNo}</Brief></Item>

        <div className="noLine">
        <Item
        thumb={bill01}
        >Sisa Pembayaran：Rp {DateApi.addDot(item.balance||0)}</Item>
        <Item
        thumb={bill02}
        >
        Tanggal Pembayaran：{item.receiveDate}
        </Item>
        {item.lavePeriod?<Item
        thumb={bill03}
        >
        Sisa Tenor：{item.lavePeriod}
        </Item>:""}
        </div>

        <div className="horizontal-view align-items-center">
        <div className={item.status != 'overdue'?"flex1 txt-blue listLeft fs-13":"flex1 txt-orange listLeft fs-13"}>{item.isStaging?(item.status != 'overdue'?"Menunggu Pembayaran":"Telah jatuh tempo"):(item.status!='overdue'?item.DateDiff +" hari lagi":"Terlambat "+item.overDueDays+" hari")}</div>
        <div className="flex1 txt-right"><Button onClick={()=>{this.toApp(item.contractNo,item.balance)}} type="primary" inline style={{ marginRight: '20px' }} disabled={i>0?true:false}>Bayar</Button></div>
        </div>
        </div>
        )
       }):
      <Result
      img={myImg(noLoan)}
      message={(
        <div>
        <p>Daftar pinjaman Anda kosong.</p>
        <p>Ayo ajukan pinjaman sekarang</p>
        <p>di Pinjam Gampang !</p>
        </div>
        )}
      />
    }
    </div>



    <div className="Lunas vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
    { (this.state.settle&&this.state.settle.length>0)?
      this.state.settle.map((item,k) => {
       return (
        <div className="vertical-view billList flex1" key={k}>
        <div className="bg-gray lh-30 pb5 txt-gray center"><span className="fs-10">Tanggal Pengajuan {item.settleDate}</span></div>
        <Item arrow="horizontal" onClick={()=>{this.routerToPaid(item)}}><Brief>Nomor Perjanjian : {item.contractNo}</Brief></Item>
        <div className="noLine">
        <Item
        thumb={bill01}
        >Sisa Pembayaran：Rp {DateApi.addDot(item.balance||0)}</Item>
        <Item
        thumb={bill02}
        >
        Tanggal Pembayaran：{item.receiveDate}
        </Item>
        </div>
        <div className="horizontal-view align-items-center">
        <div className="flex1 txt-black listLeft lh-36 h36 fs-14">Telah lunas</div>
        </div>
        </div>
        )
       }):
      <Result
      img={myImg(noLoan)}
      message={(
        <div>
        <p>Daftar pinjaman Anda kosong.</p>
        <p>Ayo ajukan pinjaman sekarang</p>
        <p>di Pinjam Gampang !</p>
        </div>
        )}
      />
    }
    </div>
    </Tabs>    
    </div>
    );
}
}

RepaymentBill.defaultProps = {
};

export default RepaymentBill;