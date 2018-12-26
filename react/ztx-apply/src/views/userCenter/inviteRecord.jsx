import React from 'react';
import config from '../../config/base';
import {  Toast, Result, Button, List, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import bill01 from '../../images/loan/bill01.png';
import bill02 from '../../images/loan/bill02.png';
import noLoan from '../../images/loan/noLoan.png';
import axios from 'axios';
import DateApi from '../../js/dateFormat.js';
const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;


class InviteRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:[]
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
     {"phone":15323438158,"time":'2018-02-17 20:09:08',"redbag":18000,'isSuccess':true},
     {"phone":15323438158,"time":'2018-12-17 20:09:08',"redbag":11000,'isSuccess':true},
     {"phone":15323438158,"time":'2018-11-17 21:09:08',"redbag":12000,'isSuccess':false},
     {"phone":15323438158,"time":'2018-09-17 20:19:08',"redbag":14000,'isSuccess':true},
     {"phone":15323438158,"time":'2018-05-17 20:09:08',"redbag":18000,'isSuccess':true}
    ];
   this.setState({ listData: listData });
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
        $('.InviteRecord .am-result').height(document.body.clientHeight-51);
      }
      this.setState({ listData: listData });
    }else{
      $('.InviteRecord .am-result').height(document.body.clientHeight-51);
    }
    }).catch(function (error) {
      $('.InviteRecord .am-result').height(document.body.clientHeight-51);
      Toast.info(String(error));
    });
  }
  render() {
    return ( 
      <div className="InviteRecord mt10">
      <div className="vertical-view" style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'start', minHeight: '150px', backgroundColor: '#fff' }}>
      { (this.state.listData&&this.state.listData.length>0)?
        this.state.listData.map((item,i) => {
         return (
           <div className="inRecord vux-1px-b billList horizontal-view justify-content-space-between flex1" key={i}>
            <div className="leftCon flex1">
             <p className="txt-black fs-14">Nomor Telepon</p>
             <p className="txt-gray fs-12 lh-24">{item.phone}</p>
            </div>
            <div className="rightCon flex1 txt-right">
             <p className="txt-black fs-14">{item.isSuccess?'Tanggal Registrasi':'Nomor Telepon'}</p>
             <p className="txt-gray fs-12 lh-24">{DateApi.format2(item.time)}</p>
            </div>
           </div>
           )
         }):
        <Result
        img={myImg(noLoan)}
        message={(
          <div>
          <p>Anda belum mempunyai histori pinjaman.</p>
          <p>Ayo ajukan pinjaman sekarang</p>
          <p>di Pinjam Gampang !</p>
          </div>
          )}
        />
      }
      </div> 
      </div> 
      );
  }
}

export default InviteRecord;


