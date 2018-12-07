import React from 'react'; 
import axios from 'axios';
import config from '../../config/base';
import {  Toast } from 'antd-mobile';
import DateApi from '../../js/dateFormat.js';

class RepaymentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listInfo:[],
    }
    localStorage.setItem('token',this.props.location.query.token||localStorage.getItem('token'));
    console.log(this.props.location.query);
    console.log(JSON.parse(this.props.location.query.repaymentPlan));
  }
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
    this.getListInfo();
  }
  
  componentDidMount() {

  }
  getListInfo= () => {
      var listInfo;
      if(this.props.location.query.repaymentPlan&&JSON.parse(this.props.location.query.repaymentPlan).length>0){
        listInfo = JSON.parse(this.props.location.query.repaymentPlan)
        this.setState({ listInfo: listInfo });
      }
    }
    render() { 
      return (
        <div className="RepaymentList">
        <div className="fs-14 pdb12 bg-gray">
        <p className="txt-red2">Berikut contoh rencana pengembalian dengan asumsi hari ini adalah tanggal pembayaran.</p>
        <p className="txt-red2">Untuk rencana pengembalian didasarkan pada yang tertera di aplikasi setelah lolos verifikasi</p>
        </div>
        <div className="fs-12 horizontal-view listHead align-items-center">
        <span className="flexg1 flex1">Tenor</span>
        <span className="flexg2 flex1">Tanggal<br/>Pembayaran</span>
        <span className="flexg2 flex1">Nominal<br/>Pembayaran</span>
        </div>
        <ul className="listUl">
        { (this.state.listInfo&&this.state.listInfo.length>0)?
          this.state.listInfo.map((item,i) => {
           return (
            <li className="horizontal-view vux-1px-t fs-14" key={i}>
            <span className="flexg1 flex1">{item.curPeriod}</span>
            <span className="flexg2 flex1">{item.planDate}</span>
            <span className="flexg2 flex1">Rp {DateApi.addDot(item.dueAmount)}</span>
            </li>
            )
           }):
          <li className="horizontal-view vux-1px-t fs-14">
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

