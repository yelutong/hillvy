import React, {Component} from 'react';
import { Button,List } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import statusIcon from '../../images/success.png';

const Item = List.Item;

class FailStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount () {

    }

    /*
    *@description 跳转到投标页
    */
    goToTender() {
        this.props.history.push('/Tender');
    }

    render() {
        return (
            <div className="Status Success">
                <div className="head">
                    <img src={statusIcon} />
                    <div className="statusText">Pendanaan Berhasil</div>
                    <div className="topTips">Total Pendanaan : Rp1.000.000</div>
                </div>
                <div className="statusData">
                    <List renderHeader={() => 'Berhasil'} className="listTitleSuccess">
                        <Item extra={'800.000'}>Total Pendanaan</Item>
                        <Item extra={'4'}>Jumlah Pinjaman</Item>
                        <Item extra={'2,740'}>Estimasi Bunga</Item>
                    </List>
                    <List renderHeader={() => 'Gagal'} className="listTitlefail">
                        <Item extra={'200.000'}>Total Pendanaan</Item>
                        <Item extra={'1'}>Jumlah Pinjaman</Item>
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