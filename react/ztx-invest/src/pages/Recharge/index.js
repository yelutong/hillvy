import React, {Component} from 'react';
import { List,InputItem,Button,Picker,Toast,ActionSheet  } from 'antd-mobile';
import { createForm } from 'rc-form';
import format from '../../js/format.js';
import { recharge } from '../../config/api';
import {Link,withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './index.css';

import NetError from '../../components/errorNet/NetError';

import atm from '../../images/atm.png';
import alfa from '../../images/alfa.png';
import notChecked from '../../images/notChecked.png';
import checked from '../../images/checked.png';

const Item = List.Item;
const Brief = Item.Brief;
let wrapProps;

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount:'',
            allPayWay: this.props.history.location.state?this.props.history.location.state.payWay:[],
            payWay : this.props.history.location.state?this.props.history.location.state.payWay:[],
            choosePayWay:this.props.history.location.state?this.props.history.location.state.payWay[0].payWayName : '',
            accountValue: this.props.history.location.state?[this.props.history.location.state.payWay[0].payWay] : []
        }
    }

    componentDidMount = () => {
        //console.log(this.state.payWay,this.state.accountValue);
        //console.log('this.state.choosePayWay',this.state.choosePayWay);
        var newPayway = new Array();
        this.state.payWay.map((item) => {
          newPayway.push(Object.assign(item,{
            label:(<div key={item.payWay}>{item.payWayName}</div>),
            value:item.payWay,
          }))
        })
        this.setState({
          payWay:newPayway
        })
    }

    componentWillUnmount() {
        this.mounted = false;
        localStorage.removeItem('fromUrl');
    }

    /*
    *@description 修改金额
    */
    changeAmount = (value) => {
      var amount = value.replace(/\D/g,'');
      console.log(amount);
      this.setState({
        amount:amount
      })
    }

    /*
    *@description 确认充值金额
    */
    submitRecharge = () => {
        var data = {
          payChannel: this.state.payWay[0].payChannel,
          payWay: this.state.payWay[0].payWay
        };
        if(this.state.amount<this.state.payWay[0].rechargeSingleMin){ //校验输入金额是否大于最低限制金额
          if(App){
              App.showToast('Nominal yang dimasukkan salah Silahkan coba lagi');
          }else{
              Toast.info('Nominal yang dimasukkan salah Silahkan coba lagi');
          }
          return false;
        }
        recharge(Object.assign(data,{
            amount:this.state.amount.replace(',','')
        })).then((res) => {
            if(res.data.code == '0000'){
                this.props.history.push({
                    pathname:'PaymentCode', 
                    state: {
                      PaymentData:res.data.body,
                      PaymentChannel:data.payChannel
                    }
                });
            }
        })

    }

    /*
    *@description 选择渠道
    */
    onChangeAccount = (value) => {
      console.log(value);
      var chooseWay = this.state.payWay.filter(item => item.payWay == value);
      this.setState({
        accountValue: value,
        choosePayWay:chooseWay.payWayName
      });
    };

    /*
    *选中付款方式
    */
    chooseWay = (data) =>{
      this.setState({
        payWay:[data]
      })
    }

    /*
    *点击弹出选择付款方式
    */
    showActionSheet = () => {
      //遍历还款方式
      console.log(this.state.payWay);
      const BUTTONS = [];
      this.state.allPayWay.map((item) => {
        var way = (<div className="flexBox payWayAlert" onClick={this.chooseWay.bind(this,item)}>
                    <div className="left">
                      <img src={item.payWay == 'atm'?atm:item.payWay == 'alfa'?alfa:''} />
                    </div>
                    <div className="middle">{item.payWayName}</div>
                    <div className="right"><img src={item.payWay == this.state.payWay[0].payWay?checked:notChecked} /></div>
                  </div>);
        BUTTONS.push(way);
      })
      ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length,
        // title: 'title',
        message: 'Pilih Metode Pembayaran',
        maskClosable: true,
        'data-seed': 'logId',
        wrapProps,
      },
      (buttonIndex) => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      });
    }

    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <Nav />
                <div className="Recharge">
                    <List className="RechargeList my-list">
                        <Item multipleLine onClick={() => {}}>
                          Bank Escrow <Brief>{this.state.payWay.length>0?(this.state.payWay[0].payChannel == 'DOKU'?'Mandiri':this.state.payWay[0].payChannel):''}</Brief>
                        </Item>
                    </List>
                    <List className="RechargeList my-list">
                        {(this.state.payWay.length>0&&this.state.payWay[0].payChannel!='DOKU')?
                        <Item arrow="horizontal" className="notChoose" multipleLine onClick={() => {}}>
                          Metode Penambahan Dana 
                          <Brief>
                            {this.state.payWay[0].payWayName}
                          </Brief>
                        </Item>:
                        <Item arrow="horizontal" className="canChoose" multipleLine onClick={this.showActionSheet.bind(this)}>
                          Metode Penambahan Dana 
                          <Brief>
                            {this.state.payWay.length>0?this.state.payWay[0].payWayName:''}
                          </Brief>
                        </Item>
                        }
                        {/*<Picker
                            data={this.state.payWay}
                            value={this.state.accountValue}
                            cols={1}
                            ref={'amount'}
                            onChange={this.onChangeAccount.bind(this)}
                          >
                            <List.Item arrow="horizontal" className="choose">
                              {this.state.choosePayWay}
                              <span  className="gray">Metode Penambahan Dana</span>
                            </List.Item>
                          </Picker>*/}
                    </List>

                    <List className="RechargeList RechargeAmount list">
                        <Item multipleLine onClick={() => {}}>
                          Penambahan Dana
                          <Brief>
                            <InputItem
                                type={'money'}
                                maxLength={21}
                                clear
                                value={format.addDot(this.state.amount) || ''}
                                onChange={(n) => {this.changeAmount(n)}}
                                moneyKeyboardAlign="left"
                                locale={{confirmLabel :'OK' }}
                                moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                                placeholder={"Mulai dari Rp"+((this.state.payWay.length>0 && this.state.payWay[0].rechargeSingleMin)?(format.addDot(this.state.payWay[0].rechargeSingleMin)):'')}
                              />
                          </Brief>
                        </Item>
                    </List>
                    <div className="tips">Minimal penambahan dana mulai dari Rp{(this.state.payWay.length>0 && this.state.payWay[0].rechargeSingleMin)?(format.addDot(this.state.payWay[0].rechargeSingleMin)):''} JIka kurang dari nominal tersebut akan terjadi kegagalan</div>
                    <Button className="btn" type="primary" onClick={this.submitRecharge.bind(this)}>Setuju </Button>
                </div>
            </div>
        )
    }
}
const RechargeForm = createForm()(Recharge);
export default withRouter(RechargeForm);