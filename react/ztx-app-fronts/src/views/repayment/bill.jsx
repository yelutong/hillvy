import React from 'react';
import axios from 'axios';
import {  Toast, Result, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import DateApi from '../../js/dateFormat.js';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import noLoan from '../../images/loan/noLoan.png';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

const tabs = [
  { title: <Badge>Pending</Badge> },
  { title: <Badge>Lunas</Badge> },
];

class RepaymentBill extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Lunas:[],
      repayVal:{},
      paynot:[],
      applyId:this.props.location.query&&this.props.location.query.applyId?this.props.location.query.applyId:'',
      token:this.props.location.query&&this.props.location.query.token?this.props.location.query.token:localStorage.getItem('token'),
    }
    localStorage.setItem('token',this.state.token);
    console.log(this.props.location.query);
    this.getBill();
  }

  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }

  componentDidMount() {
    
  }
  routerTo(currenList) {
    this.props.router.push({
    pathname:"/LendDtail/"+currenList.contractNo,
    state: { 
      currenList: currenList,
      Lunas: this.state.Lunas,
      repayVal: this.state.repayVal
    }
    });//依赖React-Router3.X版本
  }

  getBill = () => {
    if(App){
      App.showLoading(false);
    }
   axios.get('http://10.3.32.232:8081/kpt-apply/apply/auth/v3/history',{params:{"registId":"109981"}}).then((res) => {
        if(App){
          App.showLoading(false);
        }
        if(res.data.code == '0000'){
          console.log(res); 
          let listData2 = res.data;
          
          let listData = {
"code": "0000",
"msg": "成功",
"body": {
"repayPlan": [{
"contractNo": "CN20181019000025",
"curPeriod": 1,
"period": 3,
"returnDate": "2018-11-26 00:00:00",
"returnAmt": 6031722,
"principal": 4531722,
"interest": 1500000
},
{
"contractNo": "CN20181019000025",
"curPeriod": 2,
"period": 3,
"returnDate": "2018-12-26 00:00:00",
"returnAmt": 6031722,
"principal": 4984894,
"interest": 1046828
},
{
"contractNo": "CN20181019000025",
"curPeriod": 3,
"period": 3,
"returnDate": "2019-01-26 00:00:00",
"returnAmt": 6031722,
"principal": 5483384,
"interest": 548338
}
],
"repayList": [{
"repayDetail": [{
"repayOrderNo": null,
"repayChannel": null,
"contractNo": "CN20181019000025",
"loanAccount": "CN20181019000025",
"period": 3,
"curPeriod": 1,
"returnDate": "2018-11-26 00:00:00",
"returnAmt": 6031722,
"balance": 6031722,
"principal": 4531722,
"interest": 1500000,
"overdueDays": 0,
"overdueAmt": null,
"fixedAmt": null,
"defaultAmt": null,
"receiveDate": null,
"receiveAmt": null,
"receivePrincipalAmt": null,
"receiveInterestAmt": null,
"receiveOverdueAmt": null,
"receiveFixedAmt": null,
"receiveDefaultAmt": null,
"virtualAccount": null,
"status": "repayment",
"repayDetail": [{
"curPeriod": 1,
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"feeCode": "PRINCIPAL",
"feeName": "本金",
"delinquentAmount": null,
"receiveAmount": null,
"receiveDate": null,
"amount": 4531722,
"status": "repayment"
},
{
"curPeriod": 1,
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"feeCode": "INTEREST",
"feeName": "利息",
"delinquentAmount": null,
"receiveAmount": null,
"receiveDate": null,
"amount": 1500000,
"status": "repayment"
}
]
},
{
"repayOrderNo": null,
"repayChannel": null,
"contractNo": "CN20181019000025",
"loanAccount": "CN20181019000025",
"period": 3,
"curPeriod": 2,
"returnDate": "2018-12-26 00:00:00",
"returnAmt": 6031722,
"balance": 6031722,
"principal": 4984894,
"interest": 1046828,
"overdueDays": 3,//逾期天数
"overdueAmt": null,
"fixedAmt": null,
"defaultAmt": null,
"receiveDate": 3,//逾期天数
"receiveAmt": null,
"receivePrincipalAmt": null,
"receiveInterestAmt": null,
"receiveOverdueAmt": null,
"receiveFixedAmt": null,
"receiveDefaultAmt": null,
"virtualAccount": null,
"status": 'overdue',// 待还： overdue逾期 repayment正常还款 ； 已还 ： e_settle提前结清  settle结清
"repayDetail": [{
"curPeriod": 2,
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"feeCode": "PRINCIPAL",
"feeName": "本金",
"delinquentAmount": null,
"receiveAmount": null,
"receiveDate": null,
"amount": 4984894,
"status": "overdue"
},
{
"curPeriod": 2,
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"feeCode": "INTEREST",
"feeName": "利息",
"delinquentAmount": null,
"receiveAmount": null,
"receiveDate": null,
"amount": 1046828,
"status": "overdue"
}
]
},
{
"repayOrderNo": null,
"repayChannel": null,
"contractNo": "CN20181019000025",
"loanAccount": "CN20181019000025",
"period": 3,
"curPeriod": 3,
"returnDate": "2019-01-26 00:00:00",
"returnAmt": 6031722,
"balance": 6031722,
"principal": 5483384,
"interest": 548338,
"overdueDays": 10,
"overdueAmt": null,
"fixedAmt": null,
"defaultAmt": null,
"receiveDate": null,
"receiveAmt": null,
"receivePrincipalAmt": null,
"receiveInterestAmt": null,
"receiveOverdueAmt": null,
"receiveFixedAmt": null,
"receiveDefaultAmt": null,
"virtualAccount": null,
"status": "settle",
"repayDetail": [{
"curPeriod": 3,
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"feeCode": "PRINCIPAL",
"feeName": "本金",
"delinquentAmount": null,
"receiveAmount": null,
"receiveDate": null,
"amount": 5483384,
"status": "settle"
},
{
"curPeriod": 3,
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"feeCode": "INTEREST",
"feeName": "利息",
"delinquentAmount": null,
"receiveAmount": null,
"receiveDate": null,
"amount": 548338,
"status": "settle"
}
]
}
],
"repayInfo": {
"loanAccount": "CN20181019000025",
"contractNo": "CN20181019000025",
"contractAmt": 15000000,//借款金额
"idNum": "2458181103945818",
"name": "Autotester2575563170",
"term": 3,//借款期数 
"termType": "MONTH",//月
"curPeriod": 1,
"loanDate": "2018-10-26 00:00:00",//放款日期
"loanAmount": 1176000,//到账金额
"principal": 4531722,
"productCode": null,
"productCodeSub": null,
"productName": null,
"returnDate": "2018-11-26 00:00:00",
"remainPrincipal": 15000000,
"returnAmt": 6031722,
"balance": 12222222,//应还金额
"interest": 1500000,
"delinquentAmount": null,
"delinquentDays": 0,
"delinquentMaxAmount": null,
"delinquentMaxDays": null,
"delinquentTotalAmount": null,
"accountStatus": "loan"
}
}]

}
}

if(listData.body && listData.body.repayList){
  var repayList = listData.body.repayList[0];
  this.setState({ repayVal : repayList });
}
if(listData.body && listData.body.repayList && listData.body.repayList[0].repayDetail && listData.body.repayList[0].repayDetail.length > 0){
  var repayDetail = listData.body.repayList[0].repayDetail;
  var paynot=[],Lunas=[];
  for(let i=0;i < repayDetail.length;i++){
    var date = repayDetail[i].returnDate ? Date.parse(new Date(repayDetail[i].returnDate)) : '';
    repayDetail[i].returnDate = DateApi.format2(date);
    repayDetail[i].returnDate1 = DateApi.format3(date);
    //正常还款或者逾期
    if(repayDetail[i].status == "repayment" || repayDetail[i].status == "overdue"){
      if(repayDetail[i].status == "repayment"){
      repayDetail[i].DateDiff = DateApi.DateDiff(date);//剩余多少天到期
      }
      paynot.push(repayDetail[i]);
    }
    //提前结清或者结清
    else if(repayDetail[i].status == "e_settle" || repayDetail[i].status == "settle"){
    Lunas.push(repayDetail[i]);
    }
  }
  if(App){
    (paynot&&paynot.length>0)?App.redViewShow(true):App.redViewShow(false);
  }
  this.setState({ paynot : paynot });
  this.setState({ Lunas : Lunas });
 }  
}    

    }).catch(function (error) {
　　    Toast.info(String(error)); 
    });
  }
  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'RepaymentBill'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.RepaymentBill .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'RepaymentBill';
        }
      }
    }) 
    return (
      <div className="RepaymentBill">
         <Tabs tabs={tabs}
      initialPage={0}
      tabBarActiveTextColor="#333"
      tabBarInactiveTextColor="#999"
    >

      <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        
         { (this.state.paynot&&this.state.paynot.length>0)?
            this.state.paynot.map((item,i) => {
             return (
                <div className="vertical-view billList flex1" key={i}>
                <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan 24:00 22-may-2018</p>
                <Item arrow="horizontal" onClick={()=>{this.routerTo(item)}}><Brief>Nomor Perjanjian : {item.contractNo}</Brief></Item>
                
                <div className="noLine">
                 <Item
                  thumb={bill01}
                >Sisa Pembayaran：Rp {DateApi.addDot(item.balance)}</Item>
                <Item
                  thumb={bill02}
                >
                  Tanggal Pembayaran：{item.returnDate}
                </Item>
                </div>

                <div className="horizontal-view align-items-center">
                  <div className={item.status == "repayment"?"flex1 txt-blue listLeft":"flex1 txt-orange listLeft"}>{item.status == "repayment"? item.DateDiff +" hari lagi":"Terlambat "+item.overdueDays+" hari"}</div>
                    <div className="flex1 txt-right"><Button onClick={()=>{window.location.href="https://www.baidu.com"}} type="primary" inline style={{ marginRight: '20px' }}>Bayar</Button></div>
                  </div>
                </div>
              )
             }):
            <Result
                img={myImg(noLoan)}
                message={(
                  <div>
                  <p>Daftar pinjaman Anda kosong.</p>
                  <p>Ayo ajukan pinjaman sekarang di Pinjam Gampang !</p>
                  </div>
                )}
             />
          }
      </div>
      <div className="Lunas" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        { (this.state.Lunas&&this.state.Lunas.length>0)?
            this.state.Lunas.map((item,k) => {
             return (
          <div className="vertical-view billList flex1" key={k}>
        <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan 24:00 22-may-2018</p>
        <Item arrow="horizontal" onClick={()=>{this.routerTo(item)}}><Brief>Nomor Perjanjian : {item.contractNo}</Brief></Item>
        <div className="noLine">
         <Item
          thumb={bill01}
        >Sisa Pembayaran：Rp {DateApi.addDot(item.balance)}</Item>
        <Item
          thumb={bill02}
        >
          Tanggal Pembayaran：{item.returnDate}
        </Item>
        </div>
          <div className="horizontal-view align-items-center">
            <div className="flex1 txt-black listLeft lh-36 h36">Telah lunas</div>
          </div>
        </div>
         )
        }):
       <Result
          img={myImg(noLoan)}
          message={(
            <div>
            <p>Daftar pinjaman Anda kosong.</p>
            <p>Ayo ajukan pinjaman sekarang di Pinjam Gampang !</p>
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

