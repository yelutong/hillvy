import React, {Component} from 'react';
import { List } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import format from '../../js/format';
import Nav from 'components/Nav/Nav';
import './Index.css';

const Item = List.Item;

class TenderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailItem:this.props.history.location.state.detailItem||{},
        }
    }

    componentDidMount() {
        console.log('detailItem',this.state.detailItem);
    }

    componentWillUnmount() {
        localStorage.setItem('fromUrl','TenderDetail');
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="TenderDetail vux-1px-tb">
                    <div className="TenderDetailTop flexBox">
                        <div className="flexItem">
                            <p className="weight">Rp{format.addDot(this.state.detailItem.amount)}</p>
                            <p className="thin">Jumlah pinjaman</p>
                        </div>
                        <div className="flexItem">
                            <p className="weight">{this.state.detailItem.term+(this.state.detailItem.termType=='DAY'?'hari':'bulan')}</p>
                            <p className="thin">Durasi Pinjaman</p>
                        </div>
                        <div className="flexItem">
                            <p className="weight">{this.state.detailItem.level}</p>
                            <p className="thin">Tingkat resiko</p>
                        </div>
                    </div>
                    <List renderHeader={() => 'Informasi Peminjam'} className="listTitleSuccess">
                        <Item extra={'Terverifikasi'}>Nama</Item>
                        <Item extra={'Terverifikasi'}>Identitas Diri</Item>
                        <Item extra={this.state.detailItem.phone}>Nomor Telepon</Item>
                        <Item extra={this.state.detailItem.gender=='0'?'Laki-laki':'Perempuan'}>Jenis Kelamin</Item>
                        <Item extra={this.state.detailItem.age}>Usia</Item>
                        <Item extra={'Terverifikasi'}>Tempat Bekerja</Item>
                        <Item extra={'Terverifikasi'}>Alamat</Item>
                        <Item extra={this.state.detailItem.bankName}>Nama Bank</Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default withRouter(TenderDetail);