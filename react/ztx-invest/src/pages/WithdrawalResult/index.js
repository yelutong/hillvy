import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { Result, List, Button } from 'antd-mobile';
import format from '../../js/format.js';
import w1 from './images/w1.png';
import w2 from './images/w2.png';
import w3 from './images/w3.png';
import './index.css';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class WithdrawalResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       
    }
  }  
  render() {
    let result;
    let parms = this.props.location.search.replace("?","").split("&");
    let json = format.getUrlData(parms);
    console.log(json);
    if(json.RESULT=="0"){
      result=0
    }else if(json.RESULT=="1"){
      result=1
    }else{ 
      result=2;
    }
    let rPic,rTtile,eMess,eList,btn = false;
    if(result==0){//提现中
      rPic=w3;
      rTtile="Sedang Diproses";
      eMess=(
        <div>
        <p className="txt-gray">Estimasi 1～5 hari kerja</p>
        </div>
        );
      btn = true;
      eList='';
    }else if(result==1){//提现成功
      rPic=w1;
      rTtile=(
        <div>
        <p className="fs-15">Anda telah berhasil melakukan<br/>
        penarikan sebesar Rp200.000<br/>
        ke rekening BCA (*****2323) Silahkan<br/>
        cek saldo rekening bank Anda</p>
        </div>);
      eMess='';
      btn = true;
      eList='';
    }else{//提现失败
      rPic=w2;
      rTtile="Penarikan Gagal";
      eMess='';
      eList=(
       <div className="wdFail fs-14 txt-gray">
       <p className="fsize-bold lh-24">Mohon periksa kembali</p>
       <ul className="lh-24">
       <li>Koneksi jaringan</li>
       <li>Batas waktu transaksi</li>
       </ul>
       </div>
        )
    }
    return (
      <div className="WithdrawalResult">
      <Result
      img={myImg(rPic)}
      title={rTtile}
      message={eMess}
      />
      {eList}
      <Button type="primary" className={btn?'fs-18':'hide'}>Kembali ke Menu</Button>
      </div>
      );
  }
}
 
export default withRouter(WithdrawalResult);

