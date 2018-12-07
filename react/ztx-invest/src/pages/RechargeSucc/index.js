import React from 'react';
import axios from 'axios';
import format from '../../js/format';
import {withRouter} from "react-router-dom";
import './index.css';
import Nav from 'components/Nav/Nav';
import { Result, Button } from 'antd-mobile';
import rechargeOk from './images/rechargeOk.png';

const myImg = src => <img src={src} className="imgc spe am-icon am-icon-md" alt="" />;

class RechargeSucc extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        PaymentData:this.props.history.location.state?this.props.history.location.state.PaymentData : {},
      } 
    }
    
    componentWillMount = () => {
        localStorage.setItem("tabIndex",1);
    } 

    /*
    *@description 点击完成按钮
    */
    finishCharge () {
        localStorage.setItem("tabIndex",0);
        this.props.history.push('/CommonTabs');
    }

    render(){
      let rTitle=(
        <div className="fs-18 txt-black lh-24">
        Anda telah berhasil menambah<br/>
        dana sebesar Rp{format.addCommas(this.state.PaymentData.amount)}<br/>
        Ayo mulai pendanaan !
        </div>
        )
        return (
        <div className="RechargeSucc">
        <Nav />
        <Result
        img={myImg(rechargeOk)}
        title={rTitle}/>
        <Button type="primary" className='fs-18' onClick={this.finishCharge.bind(this)}>Mulai Pendanaan</Button>
        <div className="rechargeFooter txt-gray fs-12">
        <p>Jika Dana Tersedia Anda masih belum bertambah,<br/>hubungi CS <span className="txt-blue">(021) 3003 3358</span></p>
        </div>
        </div>
        )
    }
} 


export default withRouter(RechargeSucc);