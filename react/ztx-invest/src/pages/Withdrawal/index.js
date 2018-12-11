import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import config from '../../config/config';
import format from '../../js/format';
import useClass from '../../js/useClass';
import NetError from '../../components/errorNet/NetError';
import { withdrawPoundage,withdraw,withdrawLimit } from '../../config/api';
import Nav from 'components/Nav/Nav';
import './index.css';
import { Toast, List, Button, InputItem } from 'antd-mobile';
import wdTopImg from './images/wdTopImg.png';

const Item = List.Item;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Withdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputVal:'',
          poundage:0,
          type: 'money',
          receive:0,
          netError:false,
          withdrawSingleMin:16500,
          withdrawSingleMax:25006500,
          withdrawLimit:"Rp16.500 ≤ Nominal Penarikan ≤ Rp25.006.500"
        }

      console.log(this.props.location.state);
      if(!this.props.location.state.withdrawalData){
        this.props.history.push('/CommonTabs');
      }
      this.getWithdrawLimit();
    }
    componentWillUnmount(){
      //移除页面滚动监听
      window.removeEventListener('scroll',this.onListScroll);
    }
    componentDidMount() {
      //挂载页面滚动监听
      window.addEventListener('scroll',this.onListScroll);
    }
    componentWillUnmount = () => {
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }
    
    handleChange = (n) => { 
        let num = n;
        num = num.replace(/\D/g,'');
        document.getElementsByClassName('fake-input').innerHTML=Number(num)>0?Number(num):'';
        if(Number(num)>0){
          if(Number(num)<=this.props.location.state.withdrawalData.balance){
            this.setState({
                inputVal: Number(num)
            })
            let _this = this;
            //let url=config.protocol+'://'+config.domain+'/'+config.path+'/lend-asset/withdraw-poundage';
            withdrawPoundage({"amount":Number(num),"chargeAmount":0,"payChannel":this.props.location.state.withdrawalData.channel}).then((res) => {
              if(res.data.code == '0000'){
                console.log('成功');
                console.log(res.data);
                let poundage = res.data.body;
                _this.setState({ poundage : poundage });
                _this.setState({ receive : (Number(num)-poundage)>0?Number(num)-poundage:0 });
                
              }
              }).catch(function (error) { 
              console.log(error);  
            });
          }else{
             //document.getElementsByClassName('fake-input').innerHTML='';
             //this.setState({ inputVal: 0 });
             //this.setState({ poundage : 0 });
             //this.setState({ receive : 0 });
             if(App){
                App.showToast('Dana Penarikan melebihi Dana Tersedia akun Anda Silahkan coba lagi');
              }else{
                Toast.info('Dana Penarikan melebihi Dana Tersedia akun Anda Silahkan coba lagi');
              }
          }
        }else{
          this.setState({ inputVal: 0 });
          this.setState({ poundage : 0 });
          this.setState({ receive : 0 });
        }
    }
    

    getWithdrawLimit = () => {
      let _this = this;
      this.setState({
          netError:false
      })
      //let url=config.protocol+'://'+config.domain+'/'+config.path+'/lend-asset/withdraw-limit';
      withdrawLimit({"payChannel":this.props.location.state.withdrawalData.channel}).then((res) => {
        if(res.data.code == '0000'){
          console.log('成功');
          console.log(res.data);
          let withdrawSingleMin = res.data.body.withdrawSingleMin;
          let withdrawSingleMax = res.data.body.withdrawSingleMax;
          _this.setState({ withdrawLimit : "Rp"+withdrawSingleMin+" ≤ Nominal Penarikan ≤ Rp"+withdrawSingleMax });
          _this.setState({ withdrawSingleMin : withdrawSingleMin});
          _this.setState({ withdrawSingleMax : withdrawSingleMax});
        }
      }).catch(function (error) { 
          console.log('res',error);
          _this.setState({
              netError:true
          })
      });
    }

    withdraw = () =>{
      if(this.state.inputVal>=this.state.withdrawSingleMin&&this.state.inputVal<=this.state.withdrawSingleMax){
         //let url=location.protocol+'://'+config.domain+'/'+config.path+'/lend-asset/withdraw';
          withdraw({"amount":this.state.inputVal||0,"chargeAmount":this.state.poundage||0,"payChannel":this.props.location.state.withdrawalData.channel}).then((res) => {
            if(res.data.code == '0000'){
              console.log('提现成功');
              console.log(res.data);
              this.props.history.push({
                pathname:'/WDResult', 
                state: {
                  result: '0'
                }
              });
            }else{
              this.props.history.push({
                pathname:'/WDResult', 
                state: {
                  result: '2'
                }
              });
            }
            }).catch(function (error) { 
            console.log(error); 
            this.props.history.push({
                pathname:'/WDResult', 
                state: {
                  result: '2'
                }
              });
        });
      }else{
        if(this.state.inputVal<this.state.withdrawSingleMin){
           if(App){
              App.showToast("Minimal Penarikan Rp"+this.state.withdrawSingleMin);
           }else{
              Toast.info("Minimal Penarikan Rp"+this.state.withdrawSingleMin);
           }
        }else{
           if(App){
              App.showToast("Dana Penarikan melebihi Rp"+this.state.withdrawSingleMax+" Silahkan coba lagi");
           }else{
              Toast.info("Dana Penarikan melebihi Rp"+this.state.withdrawSingleMax+" Silahkan coba lagi");
           }
        }
      }
    }
    onListScroll =()=>{
      let scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
      let idName = document.getElementById("NavBar");
      if(scrollTop > 30){
        if(useClass.hasClass(idName,'bgBlue')){
          useClass.removeClass(idName,'bgBlue');
        }
        if(!useClass.hasClass(idName,'bgBlueTrue')){
          useClass.addClass(idName,'bgBlueTrue');
        }
      }else if(scrollTop>0&&scrollTop<=30){
        if(!useClass.hasClass(idName,'bgBlue')){
          useClass.addClass(idName,'bgBlue');
        }
        if(useClass.hasClass(idName,'bgBlueTrue')){
          useClass.removeClass(idName,'bgBlueTrue');
        }
      }
    }

  render() {  
    const { type } = this.state;
    return (
      <div>
        <Nav />
        {this.state.netError?
          <NetError refresh={this.getWithdrawLimit.bind(this)}/>:
        <div className="Withdrawal" onScroll={this.onListScroll()}>
        <div className="WithdrawalTop">
          <img className="wdTopImg" src={wdTopImg} />
          <div className="topContent txt-white">
             <div className="topTips horizontal-view"><span className="fs-14">Dana Tersedia</span></div>
             <div className={this.props.location.state.withdrawalData.balance&&String(this.props.location.state.withdrawalData.balance).length>12?"topNum fs-25r":"topNum"}>{format.addDot(this.props.location.state.withdrawalData.balance||0)}</div>
          </div>
        </div> 
        
        <div className="ctContent bg-white">
         <div className="listItem vux-1px-b">
           <p className="txt-gray fs-12">Nama Pemilik Rekening</p>
           <p className="fs-16">{this.props.location.state.withdrawalData.name}</p>
         </div>
         <div className="listItem">
           <p className="txt-gray fs-12">Informasi Rekening Bank</p>
           <p className="fs-16">{this.props.location.state.withdrawalData.bankName}({this.props.location.state.withdrawalData.bankCard})</p>
         </div>
        </div>

        <div className="ctContent bg-white mt10">
         <div className="listItem vux-1px-b">
           <p className="txt-gray fs-12">Nominal Penarikan</p>
          <InputItem
            className="fs-16 inputVal" 
            type={type}
            value={this.state.inputVal?format.addDot(this.state.inputVal):''}
            placeholder={this.state.withdrawLimit}
            locale={{confirmLabel :'OK' }}
            clear
            onChange={(n)=>{console.log(n);this.handleChange(n)}}
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          ></InputItem>
         </div>
         <Item extra={format.addDot(this.state.inputVal||0)}>Nominal Penarikan</Item>
         <Item extra={this.state.poundage>0?'-'+format.addDot(this.state.poundage):0}>Biaya Penarikan</Item>
         <Item extra={format.addDot(this.state.receive)}>Nominal Diterima</Item>
        </div>
        <Button onClick={() => {this.withdraw()}} type="primary"  disabled={(Number(this.state.inputVal||0)>0&&Number(this.state.inputVal||0) <= Number(this.props.location.state.withdrawalData.balance||0)&&Number(this.state.receive)>0) ? false : true} className='fs-18'>Penarikan</Button>
        <p className="pd15 fs-12 txt-gray pdb15">*Nominal Diterima merupakan nominal yang akan diterima oleh pemilik rekening.<br/>Nominal Diterima = Nominal Penarikan - Biaya Penarikan <br/>*Maksimal proses 5 hari kerja dengan biaya penarikan berdasarkan pada bank yang dituju. Biaya penarikan sebesar Rp0 - Rp7.500 akan dipotong otomatis dari Akun Anda. <br/>*Proses yang diperlukan berdasarkan pada negara dan bank Penerima. Transfer yang dilakukan pada akhir pekan dan hari libur umum akan diproses di hari kerja berikutnya.</p>
       </div> 
        }
      </div>
    )
  }
}

export default withRouter(Withdrawal);