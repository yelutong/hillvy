import React from 'react';
import axios from 'axios';
import './index.css';
import { Toast, List } from 'antd-mobile';
import config from '../../config/config';
import format from '../../js/format.js';
import AbstractBg from './images/AbstractBg.png';
import arrow from './images/arrow.png';
import queIcon from './images/queIcon.png';
import AbstractIcon1 from './images/AbstractIcon1.png';
import AbstractIcon2 from './images/AbstractIcon2.png';
import queIconGrey from './images/queIconGrey.png';


const Item = List.Item;
const Brief = Item.Brief;

class AbstractContent extends React.Component{
    constructor(props){
      super(props); 
    }
    state = {
      getAssets:''
    }
    componentWillMount = () => {
      this.getAssets = this.getAssets.bind(this);
      this.getAssets();
    }
    
    addMoney = () => {
     Toast.info('去充值');
    }

    withdrawal = () => {
     Toast.info('去提现');
    }
    
    toMoneyDetail = () => {
     Toast.info('资产详情');
    }

    totalMoney = () => {
     Toast.info('总资产');
    }

    canUseMoney = () => {
     Toast.info('可用金额');
    }

    getAssets = () => {
      let _this = this;
      console.log(config);
      let url=config.protocol+'://'+config.domain+'/lend-assert/query-assert';
      axios.get(url,{params:{"cusId":'No123456'}}).then((res) => {
        if(res.data.code == '0000'){
          console,log(res);
        }
        }).catch(function (error) {
          console.log('错误');
          console.log(error);
          let data={
            code: "0000", 
            msg: "成功", 
            body: {
             totalAmt:550000,
             balance:250000
            }
          }
          let getAssets = data.body;
          console.log(getAssets);
          _this.setState({ getAssets : getAssets });
      });
    }
    render(){
        return (
        <div className="AbstractContent">
          
          <div className="topBg">
            <img className="topImg" src={AbstractBg} />
            <div className="topContent txt-white">
             <div className="topTips horizontal-view"><span>Total Nilai Akun</span><span onClick={() => {this.totalMoney()}} className="align-items-center"><img src={queIcon}/></span></div>
             <div className="topNum justify-content-space-between"><span>{format.addDot(this.state.getAssets.totalAmt||0)}</span><span onClick={() => {this.toMoneyDetail()}}  className="align-items-center"><img src={arrow}/></span></div>
            </div> 
          </div>
          <div className="centerNum mb10 justify-content-space-between pd15 bg-white"><span className="txt-gray">Dana Tersedia<i><img onClick={() => {this.canUseMoney()}} src={queIconGrey}/></i></span><span className="txt-blue">{format.addDot(this.state.getAssets.balance||0)}</span></div>
         
         <Item
          thumb={AbstractIcon1}
          onClick={() => {this.addMoney()}}
          arrow="horizontal"
        >
          Penarikan
        </Item>
        <Item
          thumb={AbstractIcon2}
          onClick={() => {this.withdrawal()}}
          arrow="horizontal"
        >
          Tambah Dana
        </Item>
        </div>
        )
    }
} 


export default AbstractContent;