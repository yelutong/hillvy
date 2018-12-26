import React from 'react';
import config from '../../config/base';
import {  Toast, Button, List, Picker, InputItem } from 'antd-mobile';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import noLoan from '../../images/loan/noLoan.png';
import axios from 'axios';
import DateApi from '../../js/dateFormat.js';

const colors = [
  {
    label:
    (<div>
      红色
    </div>),
    value: '红色',
  },
  {
    label:
    (<div>
      绿色
    </div>),
    value: '绿色',
  },
  {
    label:
    (<div>
      蓝色
    </div>),
    value: '蓝色',
  },
];

class BindCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnShow:true,
      colorValue:''
    };
   console.log(this.props.location.query);
   localStorage.setItem('token',this.props.location.query.token||localStorage.getItem('token'));//"8439096e96794349b2bdd5ff4603cfe7"
  }

  componentWillMount() {
    this.getRecordContent();
    document.body.classList.add("bg-white");
  } 
  componentWillUnmount() {
    document.body.classList.remove("bg-white");
  }
  getRecordContent = () => {
  
  }
  render() {
    return ( 
      <div className="BindCard mt10">
      <div className="vertical-view pdlr15" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#fff' }}>
       <p className="fs-15 txt-gray lh-24 Btile">Nama Pemilik Rekening</p>
       <InputItem
            clear
            placeholder="click the button below to focus"
            value="Allen"
            ref={el => this.inputRef = el}
          ></InputItem>
        <p className="fs-15 txt-gray lh-24 Btile">Nama Bank</p>
        <Picker
          data={colors}
          value={this.state.colorValue}
          cols={1}
          okText="ok"
          extra=" "
          dismissText='cancel'
          ref={'colorValue'}
          onOk ={(val)=>{console.log(val);this.setState({colorValue: val})}}
        >
          <List.Item arrow="horizontal">Pilih</List.Item>
        </Picker>
        <p className="fs-15 txt-gray lh-24 Btile">Nomor Rekening Bank</p>
       <InputItem
            clear
            placeholder="Masukkan nomor rekening Anda"
            ref={el => this.inputRef = el}
          ></InputItem>  
       <p className="fs-12 txt-red1 Btile">Rekening bank yang diberikan harus terdaftar dengan nama lengkap Anda (sesuai KTP/Paspor).</p>    
      </div>         
      <Button type="primary" disabled={this.state.btnShow} className="m30 txt-green1">Kirim</Button>
      </div> 
      );
  }
}

export default BindCard;


