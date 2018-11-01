import React from 'react';
import {  Toast, Button, List, Accordion } from 'antd-mobile';
import DateApi from '../../js/dateFormat.js';
import lend01 from '../../images/loan/bill01.png';
import lend02 from '../../images/loan/bill02.png';
import lend03 from '../../images/loan/bill03.png';
const Item = List.Item;
const Brief = Item.Brief;
  
class LendDtail extends React.Component {
  state = {languga:'Indonesian'};
  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
  }
  componentDidMount() {

  }
  constructor(props, context) {
      super(props, context);
      this.state = {
      currenList:this.props.location.state.currenList,
      Lunas:this.props.location.state.Lunas,
      repayVal:this.props.location.state.repayVal,
      paid:0
      }
      console.log(this.props.location.state);
  }
  routerToAgree(){
    this.props.router.push({
      pathname:"/LargeStageAgree"
    })
  }
  closeApp(){
    if(App){
      App.finish();
    }else{
      Toast.info('请在APP中打开'); 
    }
  }
  render() {
    $(window).scroll(function(){
      if(document.title == 'Pusat Bantuan' || document.title == 'LendDtail'){
        var scrollTop =  $(window).scrollTop() ;
        var topHeight = $('.LendDtail .title').outerHeight();
        if(scrollTop>topHeight){
          document.title = 'Pusat Bantuan';
        }else{
          document.title = 'LendDtail';
        }
      }
    }) 
    if(this.props.location.state.repayVal.repayInfo.loanDate){
      var dateInfo = Date.parse(new Date(this.props.location.state.repayVal.repayInfo.loanDate));
      var loanDate = DateApi.format2(dateInfo);
    }
    if(this.props.location.state.repayVal.repayInfo.termType=="MONTH"){
      var termType = "个月"
    }
    let accDetail=(
      <div className="lendDt">
          <Item extra={loanDate}>Tanggal Diterima</Item>
          <Item extra={'RP '+DateApi.addDot(this.props.location.state.repayVal.repayInfo.contractAmt)}>Nominal Pinjaman</Item>
          <Item extra={this.props.location.state.repayVal.repayInfo.term+termType}>Tenor</Item>
          <Item extra={'RP '+DateApi.addDot(this.props.location.state.repayVal.repayInfo.loanAmount)}>Nominal Diterima</Item>
          <Item extra={'RP '+DateApi.addDot(this.props.location.state.repayVal.repayInfo.balance)}>Nominal Pembayaran</Item>
          <Item onClick={() =>{this.routerToAgree()}} className="accLineBttom">Baca Perjanjian Pemberian Pinjaman</Item>
      </div>
    )

   if(this.props.location.state.repayVal && this.props.location.state.repayVal.repayDetail){
     var listPlan = [];
     for(let i=0;i < this.props.location.state.repayVal.repayDetail.length;i++){
          var flagClass="";
          //结清
          if(this.props.location.state.repayVal.repayDetail[i].status == "e_settle" || this.props.location.state.repayVal.repayDetail[i].status == "settle"){
            flagClass="horizontal-view vux-1px-t";
            this.state.paid = this.props.location.state.repayVal.repayDetail[i].balance;
          }else{
            flagClass="horizontal-view vux-1px-t listActive";
            this.state.paid = 0;
          }
          listPlan.push(
             <li className={flagClass} key={i}>
                <span className="flex1">{this.props.location.state.repayVal.repayDetail[i].returnDate}</span>
                <span className="flex1">RP {DateApi.addDot(this.props.location.state.repayVal.repayDetail[i].balance)}</span>
                <span className="flex1">RP {DateApi.addDot(this.state.paid)}</span>
             </li>
          );
     }
     
   }
    if(this.props.location.state.Lunas){
        let rp=0,lunasItem=[];
        let paySucc=(
           <div className="paySucc">Telah lunas</div>
        );
        for(let i=0;i<this.props.location.state.Lunas.length;i++){
          rp=rp+this.props.location.state.Lunas[i].balance;
          lunasItem.push(
            <Item multipleLine extra={paySucc} key={i}>
              Rp {DateApi.addDot(this.props.location.state.Lunas[i].balance)}<Brief>{this.props.location.state.Lunas[i].returnDate1}</Brief>
            </Item>
          )
        }
        var rpValue="RP "+DateApi.addDot(rp);
        var rpContent=(
            <div className="rp1">
            {lunasItem}
            </div>
        )
    }else{
    var rpValue="RP 0";
    var rpContent=(
       <div className="rp0 center">Sementara kosong</div>
      )
    }
    setTimeout(function(){
       $(".pad1 .am-accordion-header").append(`<div class="accExtra">${rpValue}</div>`);
    },0)

    return (
      <div className="LendDtail">
        <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        
        <div className="vertical-view billList flex1">
        <Item><Brief>Nomor Perjanjian : {this.state.currenList.contractNo}</Brief></Item>
        <div className="noLine">
         <Item
          thumb={lend01}
        >Sisa Pembayaran：Rp {DateApi.addDot(this.state.currenList.balance)}</Item>
        <Item
          thumb={lend02}
        >
          Durasi Pinjaman：{this.props.location.state.currenList.returnDate}
        </Item>
        <Item
          thumb={lend03}
        >
          Sisa Tenor：{this.props.location.state.currenList.period-this.props.location.state.Lunas.length}
        </Item>
        </div>
        </div>
        
        <Accordion className="my-accordion lendList">
         <Accordion.Panel header="Daftar Pembayaran" className="pad1">
           {rpContent}
         </Accordion.Panel>

          <Accordion.Panel header="Detail pinjaman" className="pad2">
            {accDetail}
          </Accordion.Panel>
          <Accordion.Panel header="Jadwal Pembayaran" className="pad3">
            
            <div className="horizontal-view listHead align-items-center">
              <span className="flex1">Tanggal Pembayaran</span>
              <span className="flex1">Nominal Pembayaran</span>
              <span className="flex1">Telah Luna</span>
            </div>
            <ul className="listUl">
               {listPlan}
            </ul>
          </Accordion.Panel>
        </Accordion>

        <Button type="primary" onClick={()=>{ this.closeApp() }}>Bayar</Button>
      </div> 
      </div>
    );
 }
}

LendDtail.defaultProps = {
};

export default LendDtail;
