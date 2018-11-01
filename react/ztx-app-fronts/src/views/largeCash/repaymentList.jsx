import React from 'react'; 
import axios from 'axios';
import {  Toast } from 'antd-mobile';
import DateApi from '../../js/dateFormat.js';

class RepaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listInfo:[],
      contractNo:this.props.location.query&&this.props.location.query.contractNo?this.props.location.query.contractNo:'',
      token:this.props.location.query&&this.props.location.query.token?this.props.location.query.token:localStorage.getItem('token'),
    }
    localStorage.setItem('token',this.state.token);
    this.getListInfo();
    console.log(this.props.location.query);
  }
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }
  
  componentDidMount() {

  }
  getListInfo= () => {
    axios.get('http://10.3.32.232:8081/kpt-apply/apply/repay/v1/plan',{params:{"contractNo":this.state.contractNo}}).then((res) => {
        if(App){
          App.showLoading(false);
        }
        if(res.data.code == '0000'){
          console.log(res); 
          var listInfo = res.data;
          if(listInfo.body && listInfo.body.length > 0){
              var repayPlan = listInfo.body;
              for(let i=0;i < repayPlan.length;i++){
                var date = repayPlan[i].returnDate ? Date.parse(new Date(repayPlan[i].returnDate)) : '';
                repayPlan[i].returnDate = DateApi.format2(date);
              }
              this.setState({ listInfo: repayPlan });
            }
        }
    }).catch(function (error) {
　　    Toast.info(String(error));
    });
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
          { (this.state.listInfo&&this.state.listInfo.length>0)?
            this.state.listInfo.map((item,i) => {
             return (
              <li className="horizontal-view vux-1px-t" key={i}>
                <span className="flexg1 flex1">{item.curPeriod}</span>
                <span className="flexg2 flex1">{item.returnDate}</span>
                <span className="flexg2 flex1">Rp {DateApi.addDot(item.returnAmt)}</span>
              </li>
              )
            }):
            <li className="horizontal-view vux-1px-t">
                <span className="flexg1 flex1 center">暂无数据</span>
            </li>
          }
        </ul>   
      </div>
    );
 }
}

RepaymentList.defaultProps = {
};

export default RepaymentList;

