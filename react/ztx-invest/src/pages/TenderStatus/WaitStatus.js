import React, {Component} from 'react';
import { Button} from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import statusIcon from '../../images/wait.png';

class FailStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount () {

    }

    render() {
        return (
            <div className="Status Waiting">
                <div className="head">
                    <img src={statusIcon} />
                    <div className="statusText">Menunggu Pencairan</div>
                    <div className="topTips">Estimasi 1 hari kerja</div>
                </div>
                <div className="statusTips alignCenter">
                    <div className="statusTipsTitle">Pengembalian aktual akan dikalkulasi setelah pendanaan berhasil dicairkan ke peminjam</div>
                </div>
            </div>
        )
    }
}

export default withRouter(FailStatus);