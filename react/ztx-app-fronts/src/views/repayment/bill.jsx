import React from 'react';
import axios from 'axios';
import {  Toast, Result, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import DateApi from '../../js/dateFormat.js';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import bill03 from '../../images/loan/bill03.png';
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
      settle:[],
      repayDetails: [],
      applyId:this.props.location.query&&this.props.location.query.applyId?this.props.location.query.applyId:'',
      token:this.props.location.query&&this.props.location.query.token?this.props.location.query.token:localStorage.getItem('token'),
    }
    localStorage.setItem('token',"1b99c025180840f59713a1ae16eab747");//this.state.token);
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
  }
  getBill = () => {
    if(App){
      App.showLoading(false);
    }
   axios.get('http://10.3.32.232:8081/kpt-apply/apply/v3/bill',{params:{"applyId":"A2018101901000055"}}).then((res) => {
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
    "toRepayList":[{  //当前还款情况
      "returnDate": "2018-11-26 00:00:00",// 应还日期,
      "overDueDays": 30,//逾期天数
      "balance": 3000.0,//余额
      "isStaging": false,
        "lavePeriod": 3,
        "receiveDate": "11",
      "applyTime": "2018-10-26 00:00:00",//申请时间,
      "contractNo": "334EEEE333",
      "status": 'repayment'  //还款状态 overdue逾期
    },
     {"returnDate": "2018-11-26 00:00:00",// 应还日期,
      "overDueDays": 30,//逾期天数
      "balance": 3000.00,//余额
      "isStaging": true,
        "lavePeriod": 3,
        "receiveDate": "11",
      "applyTime": "2018-10-26 00:00:00",//申请时间,
      "contractNo": "334EEEE333",
      "status": 'repayment'  //还款状态 repayment正常还款
    }],
    "loanDetial": {   //借款明细目录
      "period": "3MONTH",//  借款周期,
      "receiveTotalAmount": 23323232,// 应还金额 ,
      "contractAmt": 232332,//   合同金额,
      "loanDate": "2018-10-26 00:00:00",//   放款日期,
      "loanAmt": 1176000,//    放款金额（实际收到金额）
    },
 
    "termSettles": [{  //已还目录
        "status":"settle",//已结清  为空就是未结清
        "receiveDate":"2018-10-26 00:00:00",
        "receiveAmt":323232,//还款金额
        "term":3//期数
    },{
        "status":"settle",//已结清  为空就是未结清
        "receiveDate":"2018-10-26 00:00:00",
        "receiveAmt":32223,
        "term":3,//期数
        }
    ],
 
    "repayDetails": [//还款详情目录
      {
        "returnDate": "2018-11-26 00:00:00",  //应还日期,
        "term": 1, //期数,
        "returnAmt": 6031722,  //应还金额,
        "receiveAmt": 2222, //已还金额,
        "status": 'settle'  //还款状态
      },
      {
        "returnDate": "2018-12-26 00:00:00",
        "term": 2,
        "returnAmt": 6031722,
        "receiveAmt": 322,
        "status": 'repayment'
      },
      {
        "returnDate": "2019-01-26 00:00:00",
        "term": 3,
        "returnAmt": 6031722,
        "receiveAmt": 1212,
        "status": 'settle'
      }
    ],
 
    "settle": [{//近6个月借款结清历史信息
        "isStaging":1,//为分期借贷，0为小额贷款，
        "receiveDate":'2019-01-26 00:00:00',//分期情况为固定还款日期，不分期情况为到期还款日，
        "balance":0,//剩余应还余额，结果为0，
        "contractNo":"Noooddds32232332",
        "status":'settle',//"合同状态 settle-已结清"
        "settleDate":"2019-12-26 00:00:00",
        "applyTime":'2019-01-26 00:00:00',
    },{//近6个月借款结清历史信息
        "isStaging":1,//为分期借贷，0为小额贷款，
        "receiveDate":'2019-01-26 00:00:00',//分期情况为固定还款日期，不分期情况为到期还款日，
        "balance":0,//剩余应还余额，结果为0，
        "contractNo":"Noooddds32232332",
        "status":'settle',//"合同状态 settle-已结清"
        "settleDate":"2019-11-26 00:00:00",
        "applyTime":'2019-01-26 00:00:00',
    }]
  }
}
console.log(listData);
if(listData.body && listData.body.termSettles&& listData.body.termSettles.length>0){//已还 数组
 var Lunas = listData.body.termSettles;
 for(let i=0;i<Lunas.length;i++){
    var date = Lunas[i].receiveDate ? Date.parse(new Date(Lunas[i].receiveDate)) : '';
    var settleDate = Lunas[i].settleDate ? Date.parse(new Date(Lunas[i].settleDate)) : '';
    Lunas[i].receiveDate = DateApi.format3(date);
    Lunas[i].settleDate = DateApi.format3(settleDate);
    
 }
  this.setState({ Lunas : Lunas });
}
if(listData.body && listData.body.settle&& listData.body.settle.length>0){//已还 数组
 var settle = listData.body.settle;
 for(let i=0;i<settle.length;i++){
    var date = settle[i].receiveDate ? Date.parse(new Date(settle[i].receiveDate)) : '';
    var date = settle[i].receiveDate ? Date.parse(new Date(settle[i].receiveDate)) : '';
    settle[i].receiveDate = DateApi.format3(date);
    settle[i].applyTime = DateApi.format3(date);
 }
  this.setState({ settle : settle });
} 
if(listData.body && listData.body.loanDetial){
  var loanDetial = listData.body.loanDetial;
  this.setState({ loanDetial : loanDetial });
}
if(listData.body && listData.body.repayDetails && listData.body.repayDetails.length > 0){
  var repayDetails = listData.body.repayDetails;
   for(let i=0;i < repayDetails.length;i++){
     var date = repayDetails[i].returnDate ? Date.parse(new Date(repayDetails[i].returnDate)) : '';
     repayDetails[i].returnDate =  DateApi.format2(date);
   }
  this.setState({ repayDetails : repayDetails });
}
if(listData.body && listData.body.toRepayList&&listData.body.toRepayList.length>0){//待还
  var paynot = listData.body.toRepayList;
  for(let i=0;i < paynot.length;i++){
    var date = paynot[i].returnDate ? Date.parse(new Date(paynot[i].returnDate)) : '';
    var dateApply = paynot[i].applyTime ? Date.parse(new Date(paynot[i].applyTime)) : '';
    if(paynot[i].status == "repayment"){
      paynot[i].DateDiff = DateApi.DateDiff(date);//剩余多少天到期
    }
    paynot[i].returnDate = DateApi.format2(date);
    paynot[i].returnDate1 = DateApi.format3(date);
    paynot[i].applyTime = DateApi.format3(dateApply);
  }
  this.setState({ paynot : paynot });
  if(App){
   (paynot&&paynot.length>0)?App.redViewShow(true):App.redViewShow(false);
  }
}

}  
}).catch(function (error) {
　　    Toast.info(String(error)); 
});
}
render() {
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
            <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan {item.applyTime}</p>
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
            <Item
              thumb={bill03}
            >
              Sisa Tenor：{item.lavePeriod}
            </Item>
            </div>

            <div className="horizontal-view align-items-center">
              <div className={item.isStaging == false?"flex1 txt-blue listLeft":"flex1 txt-orange listLeft"}>{item.isStaging == false? item.DateDiff +" hari lagi":"Terlambat "+item.overDueDays+" hari"}</div>
                <div className="flex1 txt-right"><Button onClick={()=>{if(App){App.repay();}}} type="primary" inline style={{ marginRight: '20px' }}>Bayar</Button></div>
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
  <div className="Lunas vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
    { (this.state.settle&&this.state.settle.length>0)?
        this.state.settle.map((item,k) => {
         return (
      <div className="vertical-view billList flex1" key={k}>
    <p className="bg-gray lh-30 pb5 txt-gray center">Tanggal Pengajuan {item.settleDate}</p>
    <Item arrow="horizontal" onClick={()=>{this.routerToPaid(item)}}><Brief>Nomor Perjanjian : {item.contractNo}</Brief></Item>
    <div className="noLine">
     <Item
      thumb={bill01}
    >Sisa Pembayaran：Rp {DateApi.addDot(item.balance)}</Item>
    <Item
      thumb={bill02}
    >
      Tanggal Pembayaran：{item.receiveDate}
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

