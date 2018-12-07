import React from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import './index.css';
import Nav from 'components/Nav/Nav';
import { List } from 'antd-mobile';
import bri from './images/bri.png';
import bni from './images/bni.png';
import mandiri from './images/mandiri.png';
import sDelete from './images/delete.png';

const Item = List.Item;
const Brief = Item.Brief;
  
class SelectAccount extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        payWay:this.props.history.location.state?this.props.history.location.state.payWay:[],
        payChannel:this.props.history.location.state?this.props.history.location.state.payChannel:[]
      } 
    }
    
    componentDidMount = () => {
      localStorage.setItem('payWay',JSON.stringify(this.state.payWay));
      localStorage.setItem('payChannel',JSON.stringify(this.state.payChannel));
      if(this.state.payWay.length<=0 && this.state.payChannel.length<=0){
        this.setState({
          payWay:JSON.parse(localStorage.getItem('payWay')) || [],
          payChannel:JSON.parse(localStorage.getItem('payChannel')) || [],
        })
      }
    }

    /*
    *@description 选取账户
    */
    chooseAccount(payChannel) {
      var chooseWay = this.state.payWay.filter(item => item.payChannel == payChannel);
      console.log(chooseWay);
      this.props.history.push({
        pathname:"/Recharge", 
        state: {
          payWay:chooseWay,
          fromUrl:'/SelectAccount'
        }
      });
    }

    selectClose=()=>{
      document.getElementById("noticeBar").style.display="none";
    }
     
    render(){
        return (
        <div className="SelectAccount">
        <Nav />
        <div id="noticeBar" className="noticeBar justify-content-space-between">
        <span className="fs-13">*Pilih bank untuk pembayaran（Antar bank akan dikenakan biaya sebesar Rp5.000~Rp8.500）</span>
        <span className="selectClose align-items-center" onClick={() => { this.selectClose() } }><img src={sDelete} /></span>
        </div>
        {this.state.payChannel.map((item,index) => {
          return(
            <Item key={index}
              thumb={item == 'BRI'?bri:item == 'BNI'?bni:item == 'DOKU'?mandiri:''}
              arrow="horizontal"
              onClick={this.chooseAccount.bind(this,item)}
            >{item=='DOKU'?'Mandiri':item}</Item>
          )
        })}
         {/*<Item
          thumb={bri}
          arrow="horizontal"
          onClick={() => {}}
        >BRI</Item>
        <Item
          thumb={bni}
          arrow="horizontal"
          onClick={() => {}}
        >BNI</Item>
        <Item
          thumb={mandiri}
          arrow="horizontal"
          onClick={() => {}}
        >mandiri</Item>*/}

        </div>
        )
    }
} 


export default withRouter(SelectAccount);