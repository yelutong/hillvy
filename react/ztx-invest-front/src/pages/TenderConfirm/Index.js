import React, {Component} from 'react';
import { List, Checkbox, Flex } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import { getPayWay } from '../../config/api';
import Nav from 'components/Nav/Nav';
import './Index.css';

import balance from '../../images/balance.png';
import checked from '../../images/checked.png';
import notChecked from '../../images/notChecked.png';
import mandiri from '../../images/mandiri.png';
import bri from '../../images/bri.png';
import bni from '../../images/bni.png';

const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

class TenderDetail extends Component {
    state = {
      tabHeight:'300px',
      lender:'superLender',
      bank:''
    }

    componentWillMount = () => {
        this.getPayWay();
    }

    componentDidMount = () => {
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
    }

    componentWillUnmount() {
        localStorage.setItem('fromUrl','TenderDetail');
    }

    /*
    *@description 获取支付方式
    */
    getPayWay () {
        var data = {}
        getPayWay(data).then((res) => {
            if(res.data.code == '0000'){
                this.setState({
                    tenderList:res.data.body
                })
            }else{
                this.setState({
                    nerError:true
                })
            }
        });
    }

    /*
    *@description 判断是否有勾选合同
    */
    onChangeAgreement = (e) => {
        console.log('checked',e.target.checked);
    }

    /*
    *@description 确认投标
    */
    confirmTender = () => {
        this.props.history.push('/TenderStatus');
    }

    /*
    *@description 选择银行
    */
    chooseBank = (bank) => {
        this.setState({
            bank:bank
        })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="TenderDetail">
                    {this.state.lender!='superLender'?<List className="Blance">
                        <Item
                          thumb={balance}
                          arrow="horizontal"
                          extra={'Rp3.000.000'} 
                          onClick={() => {}}
                        >Dana Tersedia</Item>
                    </List>:
                    <div className="bankAccount">
                        <List renderHeader={() => 'Dana Tersedia'} className="listTitleSuccess">
                        </List>
                        <div className="bankMain">
                            <div className="flexBox mandiri" onClick={this.chooseBank.bind(this,'mandiri')}>
                                <div className="left">
                                    <img src={mandiri} />
                                </div>
                                <div className="middle">
                                    <p className="bankName">Mandari</p>
                                    <p className="amt">Rp3.000.000</p>
                                </div>
                                <div className="right">
                                    <img src={this.state.bank=='mandiri'?checked:notChecked} />
                                </div>
                            </div>
                            <div className="flexBox bni" onClick={this.chooseBank.bind(this,'bni')}>
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
                            </div>
                        </div>
                    </div>
                    }
                    <List renderHeader={() => 'Informasi Peminjam'} className="listTitleSuccess">
                        <Item extra={'2.500.000'}>Total Pendanaan</Item>
                        <Item extra={'1'}>Jumlah Pinjaman</Item>
                        <Item extra={'487****4412'}>Estimasi Bunga</Item>
                    </List>
                    <div className="tips">
                        <p>*Pengembalian Aktual dihitung pada saat pembayaran dilakukan oleh peminjam </p>
                        <p>*Pendanaan tidak valid dapat dikarenakan ada beberapa Pendana memilih pinjaman yang sama. Hasil Pendanaan berdasarkan kepada hasil setelah pinjaman dicairkan.</p>
                    </div>
                    <div className="agreement">
                        <Flex className="agreementMain">
                            <Flex.Item>
                              <AgreeItem data-seed="logId" onChange={this.onChangeAgreement.bind(this)} defaultChecked={true}>
                                Saya telah membaca dan menyetujui <a className="linking">"Perjanjian Layanan Kerja Sama"dan "Perjanjian Pemberian Pinjaman"</a>
                              </AgreeItem>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div className="confirmBottom flexBox">
                        <div className="left">Rp2.500.000</div>
                        <div className="right" onClick={this.confirmTender.bind(this)}>Konfirmasi Pendanaan</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(TenderDetail);