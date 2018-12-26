import React from 'react';
import config from '../../config/base';
import {  Toast, InputItem, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import noLoan from '../../images/loan/noLoan.png';
import axios from 'axios';
import DateApi from '../../js/dateFormat.js';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Withdrawal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:[],
      inputVal:'',
      extra:'',
      arrowShow: false,
    };
   console.log(this.props.location.query);
   localStorage.setItem('token',this.props.location.query.token||localStorage.getItem('token'));//"8439096e96794349b2bdd5ff4603cfe7"
  }

  componentWillMount() {
    this.getRecordContent();
  } 
  componentDidMount() {
    
  }
  getRecordContent = () => {
    let listData = [
     {"phone":15323438158,"time":'2018-02-17 20:09:08',"Withdrawal":18000,'isSuccess':true},
     {"phone":15323438158,"time":'2018-12-17 20:09:08',"Withdrawal":11000,'isSuccess':true},
     {"phone":15323438158,"time":'2018-11-17 21:09:08',"Withdrawal":12000,'isSuccess':false},
     {"phone":15323438158,"time":'2018-09-17 20:19:08',"Withdrawal":14000,'isSuccess':true},
     {"phone":15323438158,"time":'2018-05-17 20:09:08',"Withdrawal":18000,'isSuccess':true}
    ];
   this.setState({ listData: listData });
   if(this.state.extra == ''){
    this.setState({ extra: 'Pilih'});//="BCA（1234****5678)"
    this.setState({ arrowShow: true});
   }
    console.log(this.state.listData);
   let listShow=[],recordContent; 
   let url=location.protocol+'//'+config.domainApply+'/kpt-apply/apply/auth/v3/history';
   axios.get(url,{params:{"registId":this.props.location.query.registId}}).then((res) => {
    if(App){
      App.showLoading(false);
    }
    if(res.data.code == '0000'){
      console.log(res); 
      var listData = res.data.body;
      if(!(listData&&listData.length>0)){
        $('.Withdrawal .am-result').height(document.body.clientHeight-51);
      }
      this.setState({ listData: listData });
    }else{
      $('.Withdrawal .am-result').height(document.body.clientHeight-51);
    }
    }).catch(function (error) {
      $('.Withdrawal .am-result').height(document.body.clientHeight-51);
      Toast.info(String(error));
    });
  }


    handleChange = (n) => { 
        let num = n;
        num = num.replace(/\D/g,'');
        document.getElementsByClassName('fake-input').innerHTML=Number(num)>0?Number(num):'';
        console.log(document.getElementsByClassName('fake-input').innerHTML);
        if(Number(num)>0){
          if(Number(num)<=2000000){
            this.setState({
                inputVal: Number(num)
            })
          }else{
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

  render() {
    return ( 
      <div className="Withdrawal mt10">
      
       <div className="">
        
        <Item
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          multipleLine
          extra={this.state.extra}
          arrow={this.state.arrowShow?"horizontal":""} 
          onClick={() => {
            if(this.state.arrowShow){
              this.props.router.push({
                pathname:"/BindCard/"
             })
            }
          }}
        >
          Rekening Tujuan
        </Item>
        <Item className="mt20">Jumlah Penarikan Dana</Item>
        <InputItem
            className="inputVal" 
            type='money'
            value={this.state.inputVal?DateApi.addDot(this.state.inputVal):''}
            placeholder='Minimal penarikan dana Rp200.000'
            locale={{confirmLabel :'OK' }}
            clear
            onChange={(n)=>{console.log(n);this.handleChange(n)}}
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >Rp</InputItem>
        <Item className="bottomItem" extra={'Tarik Semua'}>Saldo bonus Rp60.000</Item>
      </div> 
       <Button type="primary" disabled={this.state.arrowShow} className="m30 txt-green1">Tarik Dana</Button>
       <p className="fixed-bottom pdb20 full-screen center txt-gray fs-14">Perkiraan 2-3 hari dicairkan ke rekening</p>
      </div> 
      );
  }
}

export default Withdrawal;


