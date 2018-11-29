import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import config from '../../config/config';
import format from '../../js/format';
import useClass from '../../js/useClass';
import Nav from 'components/Nav/Nav';
import './index.css';
import { List, Button } from 'antd-mobile';
import wdTopImg from './images/wdTopImg.png';

const Item = List.Item;
  
class Withdrawal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputVal:''
        }
     this.onListScroll = this.onListScroll.bind(this);
     console.log(this.props.location.state.withdrawalData)
    }
    componentWillUnmount(){
      //挂载页面滚动监听
      window.removeEventListener('scroll',this.onListScroll.bind(this));
    }
    componentDidMount() {
      //移除页面滚动监听
      window.addEventListener('scroll',this.onListScroll, true);
    }

    handleChange = (event) => { 
        let num = String(event.target.value);
        num = num.replace(/\D/g,'');
        document.getElementById('inputVal').value=Number(num)>0?Number(num):'';
        this.setState({
            inputVal: Number(num)
        })
        this.state.inputVal = Number(num);
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
      }else{
        if(!useClass.hasClass(idName,'bgBlue')){
          useClass.addClass(idName,'bgBlue');
        }
        if(useClass.hasClass(idName,'bgBlueTrue')){
          useClass.removeClass(idName,'bgBlueTrue');
        }
      }
    }

  render() { 
    return (
      <div className="Withdrawal" onScroll={this.onListScroll}>
        <div className="WithdrawalTop">
          <img className="wdTopImg" src={wdTopImg} />
          <Nav />
          <div className="topContent txt-white">
             <div className="topTips horizontal-view"><span className="fs-14">Dana Tersedia</span></div>
             <div className="topNum">{format.addDot(this.props.location.state.withdrawalData.balance)}</div>
          </div>
        </div> 
        
        <div className="ctContent bg-white">
         <div className="listItem vux-1px-b">
           <p className="txt-gray fs-12">Nama Pemilik Rekening</p>
           <p className="fs-16">{this.props.location.state.withdrawalData.name}</p>
         </div>
         <div className="listItem">
           <p className="txt-gray fs-12">Informasi Rekening Bank</p>
           <p className="fs-16">{this.props.location.state.withdrawalData.bankCard}</p>
         </div>
        </div>

        <div className="ctContent bg-white mt10">
         <div className="listItem vux-1px-b">
           <p className="txt-gray fs-12">Nama Pemilik Rekening</p>
           <p><input id="inputVal" className="fs-16 inputVal" type="text" placeholder="Masukkan nominal penarikan"  onChange={this.handleChange}  /></p>
         </div>
         <Item extra={format.addDot(this.state.inputVal||0)}>Nominal Penarikan</Item>
         <Item extra={'-7.000'}>Biaya Penarikan</Item>
         <Item extra={'800'}>Nominal Diterima</Item>
        </div>
        <Button type="primary"  disabled={Number(this.state.inputVal||0)>0&&Number(this.state.inputVal||0) <= Number(this.props.location.state.withdrawalData.balance||0) ? false : true} className='fs-18'>Penarikan</Button>
        <p className="pd15 fs-12 txt-gray">*Nominal Diterima merupakan nominal yang akan diterima oleh pemilik rekening.<br/>Nominal Diterima = Nominal Penarikan - Biaya Penarikan *Maksimal proses 5 hari kerja dengan biaya penarikan berdasarkan pada bank yang dituju. Biaya penarikan sebesar Rp0 - Rp7.500 akan dipotong otomatis dari Akun Anda. *Proses yang diperlukan berdasarkan pada negara dan bank Penerima. Transfer yang dilakukan pada akhir pekan dan hari libur umum akan diproses di hari kerja berikutnya.</p>
       </div> 
    )
  }
}

export default withRouter(Withdrawal);