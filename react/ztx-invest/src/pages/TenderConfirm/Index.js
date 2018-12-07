import React, {Component} from 'react';
import { List, Checkbox, Flex, Toast,Modal } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import { lendConfirm,getAccount,getPayWay,payJudge } from '../../config/api';
import format from '../../js/format';
import Nav from 'components/Nav/Nav';
import './Index.css';

import NetError from '../../components/errorNet/NetError';

import balance from '../../images/balance.png';
import question from '../../images/question.png';
import checked from '../../images/checked.png';
import notChecked from '../../images/notChecked.png';
import mandiri from '../../images/mandiri.png';
import bri from '../../images/bri.png';
import bni from '../../images/bni.png';

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class TenderConfirm extends Component {
    state = {
      tabHeight:'300px',
      lender:'lender',
      bank:null,
      ids:'',
      balance:'',
      account:[],
      modal1:false,
      modal2:false,
      aggrement:true,
      netError:false,
      cusId:localStorage.getItem('cusId') || '',
      chooseNum:this.props.history.location.state?this.props.history.location.state.chooseNum: 0,
      amount:this.props.history.location.state?this.props.history.location.state.amount : 0,
      income:this.props.history.location.state?this.props.history.location.state.income : 0,
      tenderList:this.props.history.location.state?this.props.history.location.state.tenderList : []
    }

    componentWillMount = () => {
        localStorage.setItem('fromUrl','TenderDetail');
    }

    componentDidMount = () => {
        this.getAccount();
    }

    componentWillUnmount = () => {
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }

    /*
    *@description 获取账户资金
    */
    getAccount = () =>{
        var data = {custId:this.state.cusId};
        this.setState({
            netError:false
        })
        getAccount(data).then((res) => {
            if(res.data.code == '0000'){
                this.setState({account:res.data.body},() => {
                    //获取提示文字高度和位置以及合同位置,看是否有重叠,调整合同样式
                    var tipsTop = document.getElementsByClassName('tips')[0].offsetTop+10;
                    var tipsHeight = document.getElementsByClassName('tips')[0].clientHeight;
                    var agreementTop = document.getElementsByClassName('agreement')[0].offsetTop;
                    var agreementHeight = document.getElementsByClassName('agreement')[0].clientHeight;
                    if(!(tipsTop+tipsHeight < agreementTop)){
                        document.getElementsByClassName('TenderDetail')[0].style.marginBottom = '5rem';
                        document.getElementsByClassName('agreement')[0].style.position = 'relative';
                        document.getElementsByClassName('agreement')[0].style.bottom = 'auto';
                    }
                    const TenderConfirmList = this.state.tenderList.filter(item => item.choose == true);
                    console.log('TenderConfirmList',TenderConfirmList);
                    var ids = new Array();
                    TenderConfirmList.map((item) => {
                        ids.push(item.id);
                    })
                    this.setState({
                        ids:ids
                    })
                });
                if(res.data.body.length <= 1){
                    this.setState({
                        balance:res.data.body[0].balance,
                        bank:res.data.body[0].channel
                    });
                }
            }
        }).catch((error) => {
            console.log('res',error);
            this.setState({
                netError:true
            })
        });
    }

    /*
    *@description 判断是否有勾选合同
    */
    onChangeAgreement = (e) => {
        console.log(e.target.checked);
        this.setState({
            aggrement:e.target.checked
        })
    }

    /*
    *@description 判断最新的一笔查询
    */
    reChargeStatus =　() => {
        //判断是否存在未完成的充值
        payJudge('').then((res) => {
            if(res.data.code == '0000'){
              if(res.data.body && res.data.body.paymentCode){ //如果body里面有付款码，则跳转到付款码页面
                this.props.history.push({
                  pathname:'/PaymentCode', 
                  state: {
                    PaymentData:res.data.body,
                    PaymentChannel:res.data.body.paymentChannel
                  }
                });
              }else{
                this.goToRecharge();//否则按暂无未完成的充值，正常跳转
              }
            }
        })
    }

    /*
    *@description 去充值
    */
    goToRecharge() {
        getPayWay({}).then((res) => {
            if(res.data.code == '0000'){
              //如果渠道是doku的话，就先去重一下
              var channel = new Array();
              res.data.body.map((item) => {
                if(channel.indexOf(item.payChannel)<0){
                  channel.push(item.payChannel);
                }
              })
              localStorage.setItem('tabIndex',0);
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
    }

    /*
    *@description 确认投标
    */
    confirmTender = () => {
        if(!this.state.bank || !this.state.aggrement){
            return false;
        }
        if(this.state.balance<this.state.amount){
            this.setState({
                modal1:true
            })
            return false;
        }
        var data = {
            cusId:this.state.cusId,
            lendIds:this.state.ids,
            channelCode:this.state.bank
        }
        lendConfirm(data).then((res) => {
            if(res.data.code == '0000'){
                this.props.history.push({
                    pathname:'/TenderStatus', 
                    state: {
                        TenderResult:res.data.body.sucCount>0?res.data.body:'fail'
                    }
                });
            }
        })
    }

    /*
    *@description 选择银行
    */
    chooseBank = (bank,balance) => {
        this.setState({
            bank:bank,
            balance:balance
        })
    }

    /*
    *@description 点击协议 跳转至合同列表
    */
    goToContractList = (type) => {
        const TenderConfirmList = this.state.tenderList.filter(item => item.choose == true);
        console.log('TenderConfirmList',TenderConfirmList);
        this.props.history.push({
            pathname:'/AgreementList'+type,
            state:{
                TenderConfirmList:TenderConfirmList
            }
        });
    }

    /*
    *@description 点击弹窗事件
    */
    onClickAlert=() => {
        this.setState({
            modal1:false
        },() => {
            //this.goToRecharge();
            this.reChargeStatus();
        })
    }

    /*
    *@description 关闭弹窗
    */
    onClose = (key) => {
      this.setState({
        [key]: false,
      });
    }
    /*
    *@description 开启弹窗
    */
    onShow = (key) => {
      this.setState({
        [key]: true,
      });
    }

    render() {
        return (
            <div>
                <Nav />
                <Modal className="normal"
                  visible={this.state.modal1}
                  transparent
                  maskClosable={true}
                  onClose={this.onClose.bind(this,'modal1')}
                  footer={[{ text: 'Tidak', onPress: () => {this.onClose('modal1')}},{ text: 'Ok', onPress: () => {this.onClickAlert()}}]}
                  title="">
                <div className="alert">
                    <div>Total Pendanaan Rp{format.addCommas(this.state.amount)}</div>
                    <div>Dana Tersedia Rp{format.addCommas(this.state.balance)}</div>
                    <div style={{'marginTop':'0.5rem'}}>Total Pendanaan lebih besar dari Dana Tersedia Anda saat ini. Mohon melakukan penambahan dana terlebih dahulu.</div>
                  </div>
                </Modal>
                <Modal
                    visible={this.state.modal2}
                    transparent
                    maskClosable={true}
                    title="Pendanaan Invalid"
                    onClose={this.onClose.bind(this,'modal2')}
                    footer={[{ text: 'Ok', onPress: () => { this.onClose('modal2'); } }]}
                  >
                    <div className="alert" style={{'padding':'0rem 1.1rem'}}>
                    Pinjaman terdapat yang tidak valid dikarenakan adanya beberapa Pendana memilih pinjaman yang sama
                    </div>
                  </Modal>
                {this.state.netError?
                <NetError refresh={this.getAccount.bind(this)}/>:
                <div className="TenderDetail">
                    {this.state.account.length<=0?'':
                    this.state.account.length==1?<List className="Blance">
                        <Item
                          thumb={balance}
                          arrow="horizontal"
                          extra={'Rp'+format.addCommas(this.state.balance)} 
                          onClick={this.reChargeStatus.bind(this)}
                        >Dana Tersedia</Item>
                    </List>:
                    <div className="bankAccount">
                        <span className="reCharge" onClick={this.reChargeStatus.bind(this)}>Tambah Dana</span>
                        <List renderHeader={() => 'Dana Tersedia'} className="listTitleSuccess">
                        </List>
                        <div className="bankMain">
                            {this.state.account.map((item,index) => {
                                return(
                                    <div className={"flexBox "+(item.channel=='DOKU'?'mandiri':item.channel=='BNI'?'bni':item.channel=='BRI'?'bri':'')} key={index} onClick={this.chooseBank.bind(this,item.channel,item.balance)}>
                                        <div className="left">
                                            <img src={item.channel=='DOKU'?mandiri:item.channel=='BNI'?bni:item.channel=='BRI'?bri:''} />
                                        </div>
                                        <div className="middle">
                                            <p className="bankName">{item.channel=='DOKU'?'Mandari':item.channel}</p>
                                            <p className="amt">{'Rp'+(format.addCommas(item.balance))}</p>
                                        </div>
                                        <div className="right">
                                            <img src={this.state.bank==item.channel?checked:notChecked} />
                                        </div>
                                    </div>
                                )
                            })}
                            {/*<div className="flexBox bni" onClick={this.chooseBank.bind(this,'bni')}>
                                <div className="left">
                                    <img src={bni} />
                                </div>
                                <div className="middle">
                                    <p className="bankName">BNI</p>
                                    <p className="amt">Rp3.000.000</p>
                                </div>
                                <div className="right">
                                    <img src={this.state.bank=='bni'?checked:notChecked} />
                                </div>
                            </div>
                            <div className="flexBox bri" onClick={this.chooseBank.bind(this,'bri')}>
                                <div className="left">
                                    <img src={bri} />
                                </div>
                                <div className="middle">
                                    <p className="bankName">BRI</p>
                                    <p className="amt">Rp3.000.000</p>
                                </div>
                                <div className="right">
                                    <img src={this.state.bank=='bri'?checked:notChecked} />
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    }
                    <List renderHeader={() => (<span onClick={() => { this.onShow('modal2'); }}>Ringkasan Keranjang <img className="question" src={question}/></span>)} className="listTitleSuccess">
                        <Item extra={format.addCommas(this.state.amount)}>Total Pendanaan</Item>
                        <Item extra={this.state.chooseNum}>Jumlah Pinjaman</Item>
                        <Item extra={format.addCommas(this.state.income)}>Estimasi Bunga</Item>
                    </List>
                    <div className="tips">
                        <p>*Pengembalian Aktual dihitung pada saat pembayaran dilakukan oleh peminjam </p>
                        <p>*Pendanaan tidak valid dapat dikarenakan ada beberapa Pendana memilih pinjaman yang sama. Hasil Pendanaan berdasarkan kepada hasil setelah pinjaman dicairkan.</p>
                    </div>
                    <div className="agreement">
                        <Flex className="agreementMain">
                            <Flex.Item>
                              <AgreeItem data-seed="logId" onChange={this.onChangeAgreement.bind(this)} defaultChecked={true}>
                                Saya telah membaca dan menyetujui <a className="linking" onClick={this.goToContractList.bind(this,'/lend')}>"Perjanjian Layanan Kerja Sama"</a>dan <a className="linking" onClick={this.goToContractList.bind(this,'/loan')}>"Perjanjian Pemberian Pinjaman"</a>
                              </AgreeItem>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className="confirmBottom flexBox">
                        <div className="left">Rp{format.addCommas(this.state.amount)}</div>
                        <div className="right" onClick={this.confirmTender.bind(this)} style={(this.state.bank && this.state.aggrement)?{}:{'backgroundColor':'#CCCCCC'}}>Konfirmasi Pendanaan</div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default withRouter(TenderConfirm);