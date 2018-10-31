import React from 'react'; 
import axios from 'axios';
import DateApi from '../../js/dateFormat.js';

class RepaymentList extends React.Component {
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
      if(document.title == 'Pusat Bantuan' || document.title == 'RepaymentList'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.RepaymentList .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'RepaymentList';
        }
      }
    })

  /*  axios.get('http://10.3.32.232:8081/kpt-apply/apply/repay/v1/plan',{params:{"contractNo":"A2018101901000055","token":"8439096e96794349b2bdd5ff4603cfe7"}}).then((res) => {
        if(App){
          App.showLoading(false);
        }
        if(res.data.code == '0000'){
          console.log(res); 
          let listInfo = res.data;
        }
    }).catch(function (error) {
　　    alert(error);
    });*/
let listInfo={
  "code": "0000",
  "msg": "成功",
  "body": [
    {
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
  ]
}


  console.log(listInfo);

if(listInfo.body && listInfo.body.length > 0){
  var repayPlan = listInfo.body;
  var listVal = [];
  for(let i=0;i < repayPlan.length;i++){
    var date = repayPlan[i].returnDate ? Date.parse(new Date(repayPlan[i].returnDate)) : '';
    var returnDate = DateApi.format2(date);
    console.log(returnDate);
    listVal.push(
        <li className="horizontal-view vux-1px-t" key={i}>
          <span className="flexg1 flex1">{repayPlan[i].curPeriod}</span>
          <span className="flexg2 flex1">{returnDate}</span>
          <span className="flexg2 flex1">Rp {DateApi.addDot(repayPlan[i].returnAmt)}</span>
        </li>
        );
  }
}

    return (
      <div className="RepaymentList">
      <div>
        <p className="txt-gray txt-red2">Berikut contoh rencana pengembalian dengan asumsi hari ini adalah tanggal pembayaran.</p>
        <p className="txt-gray txt-red2">Untuk rencana pengembalian didasarkan pada yang tertera di aplikasi setelah lolos verifikasi</p>
      </div>
        <div className="horizontal-view listHead align-items-center">
          <span className="flexg1 flex1">Tenor</span>
          <span className="flexg2 flex1">Tanggal Pembayaran</span>
          <span className="flexg2 flex1">Nominal Pembayaran</span>
        </div>
        <ul className="listUl">
        {listVal}
        </ul>   
      </div>
    );
 }
}

RepaymentList.defaultProps = {
};

export default RepaymentList;

