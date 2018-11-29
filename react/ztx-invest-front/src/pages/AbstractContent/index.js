import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import './index.css';
import { Modal, Toast, List } from 'antd-mobile';
import config from '../../config/config';
import format from '../../js/format.js';
import { getPayWay,payJudge } from '../../config/api';
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
      this.state = {
        modal1: false,
        modal2: false,
        getAssets:'',
        payWay:[],
        custId:'109612'
      } 
    }
    
    componentWillMount = () => {
      this.getAssets = this.getAssets.bind(this);
      this.totalMoney = this.totalMoney.bind(this);
      this.canUseMoney = this.canUseMoney.bind(this);
      this.getAssets();
    }
    /*
    *@description 获取支付方式,如果返回多条，则跳转到选择支付渠道，如果只有doku，则跳转到充值页面
    */
    getPayWay () {
        getPayWay({}).then((res) => {
            if(res.data.code == '0000'){
              //如果渠道是doku的话，就先去重一下
              var channel = new Array();
              res.data.body.map((item) => {
                if(channel.indexOf(item.payChannel)<0){
                  channel.push(item.payChannel);
                }
              })
              console.log('channel',channel);
              this.props.history.push({
                pathname:channel.length<=1?"/Recharge":'/SelectAccount', 
                state: {
                  payWay:res.data.body
                }
              });//依赖React-Router3.X版本
            }else{
              if(App){
                  App.showToast('Tidak ada koneksi jaringan');
              }else{
                  Toast.info('Tidak ada koneksi jaringan');
              }
            }
        });
    }
    /*
    *@description 去充值
    */
    addMoney = () => {
      //判断是否存在未完成的充值
      payJudge({}).then((res) => {
        if(res.data.code == '0000'){
          if(res.data.body.paymentCode){ //如果body里面有付款码，则跳转到付款码页面
            this.props.history.push({
              pathname:'/PaymentCode', 
              state: {
                PaymentData:res.data.body,
                PaymentChannel:res.data.body.paymentChannel
              }
            });
          }else{
            this.getPayWay();//否则按暂无未完成的充值，正常跳转
          }
        }
      })
    }
    //去提现
    withdrawal = () => {
       this.props.history.push({
        pathname:"/Withdrawal",
        query: { 
          token:'8439096e96794349b2bdd5ff4603cfe7',
          cusId:'109612'
        },
        state: {
          withdrawalData:this.state.getAssets
        }
      });//依赖React-Router3.X版本
    }
    
    toMoneyDetail = () => {
     Toast.info('资产详情');
    }

    totalMoney = (key,e) => {
      e.preventDefault(); // 修复 Android 上点击穿透
      this.setState({
        [key]: true,
      });
    }
    
    onClose = (key) => {
      this.setState({
        [key]: false,
      });
    }
     
    canUseMoney = (key,e) => {
     e.preventDefault(); // 修复 Android 上点击穿透
      this.setState({
        [key]: true,
      });
    }

    getAssets = () => {
      let _this = this;
      let url=config.protocol+'://'+config.domain+'/'+config.path+'/lend-asset/queryAssert';
      axios.get(url,{params:{"custId":this.state.custId}}).then((res) => {
        if(res.data.code == '0000'){
          console.log('成功');
          console.log(res.data);
          let getAssets = res.data.body;
          console.log(getAssets);
          _this.setState({ getAssets : getAssets });
        }
      }).catch(function (error) {
          console.log('错误');
          console.log(error);
          let data={
            code: "0000", 
            msg: "成功", 
            body: {
             totalAmt:550000,
             balance:250000,
             name:'Oliver Chen',
             bankCard:'BCA (9292 1232 2323)',
            }
          }
          
      });
    }
    render(){
        return (
        <div className="AbstractContent">
          <Modal
            visible={this.state.modal1}
            transparent
            maskClosable={false}
            onClose={() => { this.onClose('modal1') }}
            title="Total Nilai Akun"
            footer={[{ text: 'Ok', onPress: () => { this.onClose('modal1'); } }]}
          >
            <div>
            Total Nilai Akun terdiri dari total dana yang tersedia, dana yang sudah berhasil didanai, dan total pengembalian yang sudah diterima.
            </div>
          </Modal>
          <Modal
            visible={this.state.modal2}
            transparent
            maskClosable={false}
            onClose={() => { this.onClose('modal2')}}
            title="Dana Tersedia"
            footer={[{ text: 'Ok', onPress: () => { this.onClose('modal2'); } }]}
          >
            <div>
            Dana yang dapat digunakan untuk mendanai.
            </div>
          </Modal>
          <div className="topBg">
            <img className="topImg" src={AbstractBg} />
            <div className="topContent txt-white">
             <div className="topTips horizontal-view"><span>Total Nilai Akun</span><span onClick={() => {this.totalMoney('modal1',event)}} className="align-items-center"><img src={queIcon}/></span></div>
             <div className="topNum justify-content-space-between"><span>{format.addDot(this.state.getAssets.totalAmt||0)}</span><span onClick={() => {this.toMoneyDetail()}}  className="align-items-center"><img src={arrow}/></span></div>
            </div> 
          </div>
          <div className="centerNum mb10 justify-content-space-between pd15 bg-white"><span className="txt-gray">Dana Tersedia<i><img onClick={() => {this.canUseMoney('modal2',event)}} src={queIconGrey}/></i></span><span className="txt-blue">{format.addDot(this.state.getAssets.balance||0)}</span></div>
         
         <Item
          thumb={AbstractIcon1}
          onClick={() => {this.withdrawal()}}
          arrow="horizontal"
        >
          Penarikan
        </Item>
        <Item
          thumb={AbstractIcon2}
          onClick={() => {this.addMoney()}}
          arrow="horizontal"
        >
          Tambah Dana
        </Item>
        </div>
        )
    }
} 


export default withRouter(AbstractContent);