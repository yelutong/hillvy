import React, {Component} from 'react';
import { Button} from 'antd-mobile';
import { status } from '../../config/api';
import {Link,withRouter} from 'react-router-dom';
import statusIcon from '../../images/success.png';

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
        console.log('data',this.props.location.search);
        if(this.props.location.search){
            var token=this.props.location.search.split('token=')[1].split('&cusId=')[0];
            var cusId=this.props.location.search.split('cusId=')[1];
            localStorage.setItem('token',token);
            localStorage.setItem('cusId',cusId);
            var data = {id:cusId,stage:'AUTH'};
            this.setState({
                token:token,
                cusId:cusId
            },() => {
                status(data).then((res) => {
                    if(res.data.code == '0000'){
                        this.props.history.push('/CommonTabs');
                    }
                })
            })
        }
    }

    render() {
        return (
            <div className="Status auth">
                <div className="head">
                    <img src={statusIcon} />
                    <div className="statusText">Verifikasi berhasil</div>
                    <div className="statusTips">
                        <div className="statusTipsTitle">Anda dapat memulai Pendanaan</div>
                    </div>
                </div>
                <div className="btn">
                    <Button type="primary" onClick={this.goToTender.bind(this)}>OK</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(FailStatus);