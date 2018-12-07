import React, {Component} from 'react';
import { Button} from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import statusIcon from '../../images/refuse.png';

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
        this.props.history.push('/CommonTabs');
    }

    render() {
        return (
            <div className="Status">
                <div className="head">
                    <img src={statusIcon} />
                    <div className="statusText">Pendanaan Gagal</div>
                </div>
                <div className="statusTips">
                    <div className="statusTipsTitle">Mohon periksa kembali</div>
                    <ul>
                        <li>Koneksi jaringan</li>
                        <li>Batas waktu transaksi</li>
                    </ul>
                </div>
                <div className="btn">
                    <Button type="primary" onClick={this.goToTender.bind(this)}>Coba Lagi</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(FailStatus);