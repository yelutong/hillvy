import React, {Component} from 'react';
import { Button,List } from 'antd-mobile';
import format from '../../js/format';
import {Link,withRouter} from 'react-router-dom';
import statusIcon from '../../images/success.png';

const Item = List.Item;

class FailStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TenderResult: {}
        }
    }

    componentWillMount () {
        this.setState({
            TenderResult:this.props.history.location.state?this.props.history.location.state.TenderResult:''
        })
    }

    /*
    *@description 跳转到投标页
    */
    goToTender() {
        this.props.history.push('/CommonTabs');
    }

    render() {
        return (
            <div className="Status Success">
                <div className="head">
                    <img src={statusIcon} />
                    <div className="statusText">Pendanaan Berhasil</div>
                    <div className="topTips">Total Pendanaan : Rp{format.addDot(this.state.TenderResult.sucAmount+this.state.TenderResult.failAmount)}</div>
                </div>
                <div className="statusData">
                    <List renderHeader={() => 'Berhasil'} className="listTitleSuccess">
                        <Item extra={format.addDot(this.state.TenderResult.sucAmount)}>Total Pendanaan</Item>
                        <Item extra={this.state.TenderResult.sucCount}>Jumlah Pinjaman</Item>
                        <Item extra={format.addDot(this.state.TenderResult.antAmount)}>Estimasi Bunga</Item>
                    </List>
                    <List renderHeader={() => 'Gagal'} className="listTitlefail">
                        <Item extra={format.addDot(this.state.TenderResult.failAmount)}>Total Pendanaan</Item>
                        <Item extra={this.state.TenderResult.failCount}>Jumlah Pinjaman</Item>
                    </List>
                </div>
                <div className="btn">
                    <Button type="primary" onClick={this.goToTender.bind(this)}>Kembali ke Menu</Button>
                </div>
                <div className="bottomText">
                    <p>*Anda dapat melihat pendanaan yang berhasil pada Histori Transaksi dan nominal pendanaan yang gagal akan dikembalikan ke Dana Tersedia</p>
                    <p>*Pendanaan gagal dapat dikarenakan pinjaman telah terdanai penuh atau waktu transaksi telah lewat. Silahkan coba kembali.</p>
                </div>
            </div>
        )
    }
}

export default withRouter(FailStatus);