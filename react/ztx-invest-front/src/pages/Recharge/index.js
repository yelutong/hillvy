import React, {Component} from 'react';
import { List,InputItem,Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { recharge } from '../../config/api';
import {Link,withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './index.css';

const Item = List.Item;
const Brief = Item.Brief;

class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payWay : this.props.history.location.state.payWay
        }
    }

    componentWillMount = () => {
       console.log(this.state.payWay);
    }

    /*
    *@description 确认充值金额
    */
    submitRecharge = () => {
        var data = {
          "cusId": "109612",
          "payChannel": "DOKU",
          "payWay": "atm"
        };
        this.props.form.validateFields((error, values) => {
          if (!error) {
            console.log('ok', values);
            recharge(Object.assign(data,{
                amount:values.amount
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
          } else {
            console.log('error', error, values);
          }
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
                          Bank Escrow <Brief>Mandiri</Brief>
                        </Item>
                    </List>
                    <List className="RechargeList my-list">
                        <Item arrow="horizontal" multipleLine onClick={() => {}}>
                          Metode Penambahan Dana <Brief>Internet Banking/ATM/Mobile Banking</Brief>
                        </Item>
                    </List>
                    <List className="RechargeList RechargeAmount list">
                        <Item multipleLine onClick={() => {}}>
                          Penambahan Dana
                          <Brief>
                            <InputItem
                                {...getFieldProps('amount')}
                                placeholder="Mulai dari Rp600,000"
                              />
                          </Brief>
                        </Item>
                    </List>
                    <div className="tips">Minimal penambahan dana mulai dari Rp600.000 JIka kurang dari nominal tersebut akan terjadi kegagalan</div>
                    <Button className="btn" type="primary" onClick={this.submitRecharge.bind(this)}>Setuju </Button>
                </div>
            </div>
        )
    }
}
const RechargeForm = createForm()(Recharge);
export default withRouter(RechargeForm);