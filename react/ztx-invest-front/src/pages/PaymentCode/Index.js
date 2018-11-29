import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, Button, List } from 'antd-mobile';
import { payJudge,rechargeCancel } from '../../config/api';
import {withRouter} from 'react-router-dom';
import format from '../../js/format';
import Nav from 'components/Nav/Nav';
import './Index.css';

import mandiri from '../../images/payment_mandiri.png';
import bni from '../../images/payment_bni.png';

const Item = List.Item;

class PaymentCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
          refreshing: false,
          down: true,
          PaymentData:this.props.history.location.state.PaymentData || {},
          PaymentChannel:this.props.history.location.state.PaymentChannel || '',
          height: document.documentElement.clientHeight,
          data: [],
        };
    }

    componentDidMount() {
        console.log(this.state.PaymentData);
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
          height: hei
        }), 0);
    }

    /*
    *@description 下拉刷新后执行的事件
    */
    genData() {
        //判断是否存在未完成的充值
        payJudge({}).then((res) => {
            if(res.data.code == '0000'){
                if(res.data.body.paymentCode){ //如果body里面有付款码，则跳转到付款码页面
                    //未完成
                }else{
                    //完成后跳转至成功页
                    this.props.history.push({
                      pathname:'/RechargeSucc', 
                      state: {
                        PaymentData:this.state.PaymentData,
                        //PaymentChannel:data.payChannel
                      }
                    });
                }
            }
        })
    }

    /*
    *@description cancel取消充值
    */
    cancelRecharge () {
        rechargeCancel({
            rechargeApplyId:this.state.PaymentData.rechargeApplyId
        }).then((res) => {
            if(res.data.code=='0000'){
                this.props.history.push('/CommonTabs');
            }
        })
    }

    /*
    *@description 刷新
    */
    onRefresh() {
        this.setState({ refreshing: true });
        setTimeout(() => {
            this.genData();
            this.setState({ refreshing: false });
        }, 1000);
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="PaymentCode">
                    <span className="cancel" onClick={this.cancelRecharge.bind(this)}>Ubah</span>
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{height: this.state.height,overflow: 'auto',}}
                        direction='down'
                        refreshing={this.state.refreshing}
                        indicator={{finish:'',activate:'',deactivate:''}}
                        onRefresh={this.onRefresh.bind(this)}>
                        {/*刷新界面包含的内容*/}
                        <div className="PaymentCodeHead">
                            <div>
                                <img src={this.state.PaymentChannel == 'DOKU'?mandiri:this.state.payChannel == 'BNI'?bni:''} />
                            </div>
                            <div className="Account">Nomor Virtual Account </div>
                            <div className="Code">{(this.state.PaymentData.paymentCode||'').replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'')}</div>
                        </div>
                        <div className="data">
                            <List className="list">
                                <Item extra={'Rp'+format.addCommas(this.state.PaymentData.amount)}>Nominal</Item>
                                <Item className="way" extra={this.state.PaymentData.paymentWayName}>Metode</Item>
                            </List>
                        </div>
                        <div className="tips">Tarik ke bawah perbarui halaman untuk melihat hasil transaksi</div>
                    </PullToRefresh>
                    <div className="linking">Tata cara penambahan dana</div>
                </div>
            </div>
        )
    }
}

export default withRouter(PaymentCode);