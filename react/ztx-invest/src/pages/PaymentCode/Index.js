import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, Button, List } from 'antd-mobile';
import { payJudge,rechargeCancel,getPayWay } from '../../config/api';
import {withRouter,Link} from 'react-router-dom';
import format from '../../js/format';
import config from '../../config/config';
const httpUrl = location.protocol+'//'+config.frontDomain;
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
          PaymentData:this.props.history.location.state?this.props.history.location.state.PaymentData : {},
          PaymentChannel:this.props.history.location.state?this.props.history.location.state.PaymentChannel : '',
          height: document.documentElement.clientHeight,
          data: [],
        };
    }

    componentDidMount() {
        console.log(this.state.PaymentChannel);
        localStorage.removeItem("fromUrl");
        this.setState({
          height:document.documentElement.clientHeight
        },() => {
          const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
          setTimeout(() => this.setState({
            height: hei
          }), 0);
        })
    }

    componentWillUnmount = () => {
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }

    /*
    *@description 下拉刷新后执行的事件
    */
    genData() {
        //判断是否存在未完成的充值
        payJudge('?paymentCode='+this.state.PaymentData.paymentCode).then((res) => {
            if(res.data.code == '0000'){
                if(res.data.body.paymentCode){ //如果body里面有付款码，则跳转到付款码页面
                    //未完成
                }else if(res.data.body == 'CANCELLED'){
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
                              payWay:res.data.body,
                              payChannel:channel
                            }
                          });
                        }else{
                          
                        }
                    });
                }else if(res.data.body == 'SUCCESS'){
                    //完成后跳转至成功页
                    this.props.history.push({
                      pathname:'/RechargeSucc', 
                      state: {
                        PaymentData:this.state.PaymentData,
                        //PaymentChannel:data.payChannel
                      }
                    });
                }else{
                  //失败或者其他情况，不跳转页面
                }
            }
        })
    }

    /*
    *@description cancel取消充值
    */
    cancelRecharge () {
        rechargeCancel('?rechargeApplyId='+this.state.PaymentData.rechargeApplyId).then((res) => {
            if(res.data.code=='0000'){
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
                          payWay:res.data.body,
                          payChannel:channel
                        }
                      });//依赖React-Router3.X版本
                    }else{
                      
                    }
                });
            }else{
                
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

    /*
    *@description 跳转到如何还款
    */
    goToRepay() {
       this.props.history.push('/HowToRepayIframe');
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
                                <img src={this.state.PaymentChannel == 'DOKU'?mandiri:this.state.PaymentChannel == 'BNI'?bni:''} />
                            </div>
                            <div className="Account">Nomor Virtual Account </div>
                            <div className="Code">{(this.state.PaymentData.paymentCode||'').replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'')}</div>
                        </div>
                        <div className="data">
                            <List className="list">
                                <Item extra={'Rp'+format.addCommas(this.state.PaymentData.amount)}>Nominal</Item>
                                <Item extra={this.state.PaymentData.paymentWayName}>Metode</Item>
                                {this.state.PaymentChannel == 'BNI'?<Item extra={this.state.PaymentData.lenderName}>Nama Rekening</Item>:''}
                            </List>
                        </div>
                        <div className="tips">Tarik ke bawah perbarui halaman untuk melihat hasil transaksi</div>
                    </PullToRefresh>
                    <div  className="linking" onClick={this.goToRepay.bind(this)}>Tata cara penambahan dana</div>
                </div>
            </div>
        )
    }
}

export default withRouter(PaymentCode);