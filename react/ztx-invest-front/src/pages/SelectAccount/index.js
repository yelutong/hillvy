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
      
      } 
    }
    
    componentWillMount = () => {
     
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

         <Item
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
        >mandiri</Item>

        </div>
        )
    }
} 


export default withRouter(SelectAccount);