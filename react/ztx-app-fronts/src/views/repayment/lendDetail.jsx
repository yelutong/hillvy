import React from 'react';
import axios from 'axios';
import config from '../../config/base';
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
      if(this.props.location.state.isPaid == 1){
        this.state = {
        currenList: this.props.location.state.currentItems,
        Lunas:[],
        loanDetial:[],
        repayDetails:[],
        paid:0
        }
        this.getPaid();
      }
      else if(this.props.location.state.isPaid == 0){
        this.state = {
        currenList:this.props.location.state.currenList,
        Lunas:this.props.location.state.Lunas,
        loanDetial:this.props.location.state.loanDetial,
        repayDetails:this.props.location.state.repayDetails,
        paid:0
        }
      } 
      console.log(this.props.location.state);
  }
  getPaid = () => {
    let url=config.protocol+'://'+config.domainApply+'/kpt-apply/apply/v3/historyBill';
    axios.get(url,{params:{"contractNo":this.props.location.state.currentItems.contractNo}}).then((res) => {
    if(res.data.code == '0000'){
       console.log(res); 
       let listData = res.data; 
      console.log(listData);
      if(listData.body && listData.body.termSettles&& listData.body.termSettles.length>0){//已还 数组
       var Lunas = listData.body.termSettles;
       for(let i=0;i<Lunas.length;i++){
          var date = Lunas[i].receiveDate ? Date.parse(new Date(Lunas[i].receiveDate)) : '';
          Lunas[i].receiveDate = DateApi.format3(date);
       }
        this.setState({ Lunas : Lunas });
      }
      if(listData.body && listData.body.loanDetial){
        var loanDetial = listData.body.loanDetial;
        this.setState({ loanDetial : loanDetial });
      }
      if(listData.body && listData.body.repayDetails && listData.body.repayDetails.length > 0){
        let repayDetails = listData.body.repayDetails;
         for(let i=0;i < repayDetails.length;i++){
           var date = repayDetails[i].returnDate ? Date.parse(new Date(repayDetails[i].returnDate)) : '';
           repayDetails[i].returnDate =  DateApi.format2(date);
         }
        this.setState({ repayDetails : repayDetails });
      } 

        } 
      }).catch(function (error) {
　　    Toast.info(String(error)); 
     });
  }
  routerToAgree(){
    this.props.router.push({
      pathname:"/LargeStageAgree"
    })
  }
  goToApp(contractNo,balance){
    console.log(contractNo,balance);
    if(App){
      App.repay(contractNo,balance);
      //App.finish();
    }else{
      Toast.info('请在APP中打开'); 
    }
  }
  render() { 
    let rpContent,listPlan = [];
    if(this.props.location.state.isPaid == 0){
        if(this.props.location.state.loanDetial.loanDate){
          var dateInfo = Date.parse(new Date(this.props.location.state.loanDetial.loanDate));
          var loanDate = DateApi.format2(dateInfo);
        }
        var accDetail=(
          <div className="lendDt">
              <Item extra={loanDate}>Tanggal Diterima</Item>
              <Item extra={'RP '+DateApi.addDot(this.props.location.state.loanDetial.contractAmt||0)}>Nominal Pinjaman</Item>
              <Item extra={this.props.location.state.loanDetial.period?(this.props.location.state.loanDetial.period.indexOf('DAY')>=0?this.props.location.state.loanDetial.period.replace("DAY"," hari"):this.props.location.state.loanDetial.period.replace("MONTH"," bulan")):0}>Tenor</Item>
              <Item extra={'RP '+DateApi.addDot(this.props.location.state.loanDetial.loanAmt||0)}>Nominal Diterima</Item>
              <Item extra={'RP '+DateApi.addDot(this.props.location.state.loanDetial.receiveTotalAmount||0)}>Nominal Pembayaran</Item>
              <Item onClick={() =>{this.routerToAgree()}} className="accLineBttom fs-13">Baca Perjanjian Pemberian Pinjaman</Item>
          </div>
        )
       if(this.props.location.state.repayDetails && this.props.location.state.repayDetails.length>0){
             for(let i=0;i < this.props.location.state.repayDetails.length;i++){
                  var flagClass="";
                  //结清
                  if(this.props.location.state.repayDetails[i].status == "e_settle" || this.props.location.state.repayDetails[i].status == "settle"){
                    flagClass="horizontal-view vux-1px-t";
                    this.state.paid = this.props.location.state.repayDetails[i].receiveAmt;
                  }else{
                    flagClass="horizontal-view vux-1px-t listActive";
                    this.state.paid = this.props.location.state.repayDetails[i].receiveAmt || 0;
                  }
                  listPlan.push(
                     <li className={flagClass} key={i}>
                        <span className="flex1 fs-12">{this.props.location.state.repayDetails[i].returnDate?this.props.location.state.repayDetails[i].returnDate:''}</span>
                        <span className="flex1 fs-14">RP {DateApi.addDot(this.props.location.state.repayDetails[i].returnAmt)}</span>
                        <span className="flex1 fs-14">RP {DateApi.addDot(this.state.paid)}</span>
                     </li>
                  );
                }
        } 
       let rpValue;
       if(this.props.location.state.Lunas && this.props.location.state.Lunas.length>0){
          let rp=0,lunasItem=[];
          let paySucc=(
             <div className="paySucc fs-14">Telah lunas</div>
          );
          for(let i=0;i<this.props.location.state.Lunas.length;i++){
            rp=rp+this.props.location.state.Lunas[i].receiveAmt;
            lunasItem.push(
              <Item multipleLine extra={paySucc} key={i}>
                Rp {DateApi.addDot(this.props.location.state.Lunas[i].receiveAmt)}<Brief>{this.props.location.state.Lunas[i].receiveDate}</Brief>
              </Item>
            )
          }
          rpValue="RP "+DateApi.addDot(rp);
          rpContent=(
              <div className="rp1">
              {lunasItem}
              </div>
          )
      }else{
      rpValue="RP 0";
      rpContent=(
         <div className="rp0 center">Sementara kosong</div>
        )
      }
      setTimeout(function(){
         $(".pad1 .am-accordion-header").append(`<div class="accExtra">${rpValue}</div>`);
      },0)
  }
  else if(this.props.location.state.isPaid == 1){
            if(this.state.loanDetial.loanDate){
              var dateInfo = Date.parse(new Date(this.state.loanDetial.loanDate));
              var loanDate = DateApi.format2(dateInfo);
            }
            var accDetail=(
              <div className="lendDt">
                  <Item extra={loanDate}>Tanggal Diterima</Item>
                  <Item extra={'RP '+DateApi.addDot(this.state.loanDetial.contractAmt||0)}>Nominal Pinjaman</Item>
                  <Item extra={this.state.loanDetial.period?(this.state.loanDetial.period.indexOf('DAY')>=0?this.state.loanDetial.period.replace("DAY"," hari"):this.state.loanDetial.period.replace("MONTH"," bulan")):0}>Tenor</Item>
                  <Item extra={'RP '+DateApi.addDot(this.state.loanDetial.loanAmt||0)}>Nominal Diterima</Item>
                  <Item extra={'RP '+DateApi.addDot(this.state.loanDetial.receiveTotalAmount||0)}>Nominal Pembayaran</Item>
                  <Item onClick={() =>{this.routerToAgree()}} className="accLineBttom">Baca Perjanjian Pemberian Pinjaman</Item>
              </div>
            )
           if(this.state.repayDetails && this.state.repayDetails.length>0){
          for(let i=0;i < this.state.repayDetails.length;i++){
                var flagClass="";
                //结清
                if(this.state.repayDetails[i].status == "e_settle" || this.state.repayDetails[i].status == "settle"){
                  flagClass="horizontal-view vux-1px-t";
                  this.state.paid = this.state.repayDetails[i].receiveAmt;
                }else{
                  flagClass="horizontal-view vux-1px-t listActive";
                  this.state.paid = this.state.repayDetails[i].receiveAmt || 0;
                }
                listPlan.push(
                   <li className={flagClass} key={i}>
                      <span className="flex1 fs-12">{this.state.repayDetails[i].returnDate}</span>
                      <span className="flex1 fs-14">RP {DateApi.addDot(this.state.repayDetails[i].returnAmt)}</span>
                      <span className="flex1 fs-14">RP {DateApi.addDot(this.state.paid)}</span>
                   </li>
                );
              }
           }  
           let rpValue;
           if(this.state.Lunas && this.state.Lunas.length>0){
              let rp1=0,lunasItem=[];
              let paySucc=(
                 <div className="paySucc fs-14">Telah lunas</div>
              );
              for(let i=0;i<this.state.Lunas.length;i++){
                rp1=rp1+this.state.Lunas[i].receiveAmt;
                lunasItem.push(
                  <Item multipleLine extra={paySucc} key={i}>
                    Rp {DateApi.addDot(this.state.Lunas[i].receiveAmt)}<Brief>{this.state.Lunas[i].receiveDate}</Brief>
                  </Item>
                )
              }
              setTimeout(function(){
                rpValue="RP "+DateApi.addDot(rp1);
              },0);
              rpContent=(
                  <div className="rp1">
                  {lunasItem}
                  </div>
              )
          }else{
          rpValue="RP 0";
          rpContent=(
             <div className="rp0 center">Sementara kosong</div>
            )
          }
          setTimeout(function(){
            if($(".pad1 .am-accordion-header div:first").hasClass("accExtra")){
                $(".pad1 .am-accordion-header .accExtra").html(rpValue);
            }else{
                $(".pad1 .am-accordion-header").append(`<div class="accExtra">${rpValue}</div>`);
            }
          },0)
  }
    return (
      <div className="LendDtail">
        <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#f5f5f5' }}>
        
        <div className="vertical-view billList flex1">
        <Item><Brief>Nomor Perjanjian : {this.state.currenList.contractNo}</Brief></Item>
        <div className="noLine">
         <Item
          thumb={lend01}
        >Sisa Pembayaran：Rp {DateApi.addDot(this.state.currenList.balance?this.state.currenList.balance:0)}</Item>
        <Item
          thumb={lend02}
        >
          Durasi Pinjaman：{this.props.location.state.isPaid == 0 ? this.props.location.state.currenList.receiveDate :  this.state.currenList.receiveDate}
        </Item>
        <Item
          thumb={lend03}
        >
          Sisa Tenor：{this.props.location.state.isPaid == 0 ? (this.props.location.state.currenList.lavePeriod||0) : 0}
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
              <span className="flex1 fs-12">Tanggal Pembayaran</span>
              <span className="flex1 fs-12">Nominal Pembayaran</span>
              <span className="flex1 fs-12">Telah Luna</span>
            </div>
            <ul className="listUl">
               {listPlan}
            </ul>
          </Accordion.Panel>
        </Accordion>

        <Button className={this.props.location.state.isPaid == 1 ?'hide':''} type="primary" onClick={()=>{ this.goToApp(this.state.currenList.contractNo,this.state.currenList.balance)}}  disabled={this.state.currenList.notClick?true:false}>Bayar</Button>
      </div> 
      </div>
    );
 }
}

LendDtail.defaultProps = {
};

export default LendDtail;
