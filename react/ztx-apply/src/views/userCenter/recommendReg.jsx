import React from 'react';
import config from '../../config/base';
import {  Toast, InputItem, Button } from 'antd-mobile';
import reg1 from '../../images/new/reg1.png';
import reg2 from '../../images/new/reg2.png';
import reg3 from '../../images/new/reg3.png';
import reg4 from '../../images/new/reg4.png';
import axios from 'axios';
import DateApi from '../../js/dateFormat.js';

class RecommendReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeBtn: true,
      time: 120
    };
  }
  
  getCode () {
    console.log('dd');
    this.setState({codeBtn:false});
    let _this = this;
    let i = 120,k = i;
    let getTimes = () => {
      setTimeout(()=>{
        console.log(k);
      if(k==0){
        clearTimeout(getTimes);
       _this.setState({codeBtn:true});
       _this.setState({time:120});
      }else{
        k--;
        _this.setState({time:k});
        getTimes();
      }
    },1000)
   }
   getTimes();
  }

  render() {
    return ( 
      <div className="RecommendReg bg-blue">
      <div className="vertical-view">
       <img src={reg1} />
       <img src={reg2} />
       <div className="regForm">
       <img src={reg3} />
        <div className="formInput">
           <div className="itemDiv mb10">
            <InputItem placeholder="Masukkan nomor handphone" />
           </div>
           <div className="itemDiv mb10">
            <InputItem placeholder="Masukkan verifikasi captcha" />
           </div>
           <div className="itemDiv Snscode mb10 horizontal-view">
            <InputItem placeholder="Masukkan nomor handphone" className="flex1" />
            {
             this.state.codeBtn
             ?
              <Button type="ghost" onClick={()=>{this.getCode()}} inline size="small" className="txt-blue1 code1">Kirimkan<br/>kode verifikasi</Button>
             :
              <Button type="ghost" inline size="small" className="txt-blue1 code2">{this.state.time}s</Button>
            }
           </div>
           <Button type="primary" className="mt25">OK</Button>
         </div>
       </div>
       <img src={reg4} />
      </div> 
      </div> 
      );
  }
}

export default RecommendReg;


