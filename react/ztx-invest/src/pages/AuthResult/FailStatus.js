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
        if(App){
            App.finish();
        }
    }

    render() {
        return (
            <div className="Status auth">
                <div className="head">
                    <img src={statusIcon} />
                    <div className="statusText">silahkan mencoba lagi setelah satu hari</div>
                </div>
                {/*<div className="statusTips">
                    <div className="statusTipsTitle">silahkan mencoba lagi setelah satu hari</div>
                </div>*/}
                <div className="btn">
                    <Button type="primary" onClick={this.goToTender.bind(this)}>Kembali</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(FailStatus);