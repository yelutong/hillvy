import React, {Component} from 'react';
import { List } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import config from '../../config/config';
const httpUrl = location.protocol+'//'+config.frontDomain;
import Nav from 'components/Nav/Nav';
import './Index.css';

const Item = List.Item;

class AgreementList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AgreementList:[],
            type:this.props.match.params.type||'',
            TenderConfirmList:this.props.history.location.state?this.props.history.location.state.TenderConfirmList : []
        }
    }

    componentDidMount = () => {
        console.log('TenderConfirmList',this.state.TenderConfirmList);
    }

    componentWillUnmount = () => {
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }

    /*
    *@description 前往合同页
    */
    goToContract = (contractNo) => {
        var type = this.props.match.params.type;
        /*if(type == 'loan'){
            var url = httpUrl+'/#/loanAgreement?token='+localStorage.getItem('token')+'&contractNo='+contractNo+'&top=show'
            //window.open(url);
            window.location.href = url;
            return false;
        }else{
            var url = httpUrl+'/#/lendingAgreement?token='+localStorage.getItem('token')+'&contractNo='+contractNo+'&top=show'
            //window.open(url);
            window.location.href = url;
            return false;
        }*/
        this.props.history.push({
            pathname:'/ContractIframe',
            state:{
                type:type,
                contractNo:contractNo
            }
        });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="AgreementList">
                    {this.state.TenderConfirmList.map((item,index) => {
                        return(
                            <List className="list" key={index} onClick={this.goToContract.bind(this,item.contractNo)}>
                                <Item className="agreementTitle">ID Produk ：{item.contractNo}</Item>
                                <Item className="agreementMian" arrow="horizontal" onClick={() => {}}>{this.state.type == 'loan'?'Perjanjian Pemberian Pinjaman':'Perjanjian Layanan Kerja Sama'}</Item>
                            </List>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(AgreementList);