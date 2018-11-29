import React, {Component} from 'react';
import { List } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './Index.css';

const Item = List.Item;

class TenderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentWillUnmount() {
        localStorage.setItem('fromUrl','TenderDetail');
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="TenderDetail">
                    <div className="TenderDetailTop flexBox">
                        <div className="flexItem">
                            <p className="weight">Rp1.000.00</p>
                            <p className="thin">Jumlah pinjaman</p>
                        </div>
                        <div className="flexItem">
                            <p className="weight">7hari</p>
                            <p className="thin">Durasi Pinjaman</p>
                        </div>
                        <div className="flexItem">
                            <p className="weight">A</p>
                            <p className="thin">Tingkat resiko</p>
                        </div>
                    </div>
                    <List renderHeader={() => 'Informasi Peminjam'} className="listTitleSuccess">
                        <Item extra={'Terverifikasi'}>Nama-nama</Item>
                        <Item extra={'Terverifikasi'}>Kartu ID</Item>
                        <Item extra={'487****4412'}>Nomor telepon</Item>
                        <Item extra={'Perempuan'}>Seks</Item>
                        <Item extra={'28'}>Umur</Item>
                        <Item extra={'Terverifikasi'}>Nama organisasi</Item>
                        <Item extra={'Terverifikasi'}>Alamat unit</Item>
                        <Item extra={'CIMB'}>Nama Bank</Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default withRouter(TenderDetail);