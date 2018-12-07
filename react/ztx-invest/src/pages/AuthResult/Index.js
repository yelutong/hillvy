import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import FailStatus from './FailStatus';//交易失败状态
import SuccessStatus from './SuccessStatus';//交易成功状态
import './Index.css';

class TenderStatus extends Component {
    state = {
        token:'',
        cusId:'',
        status:'' //fail 认证失败，，success 认证成功
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var status = this.props.match.params.status;
        console.log('data',this.props.location.search);
        if(this.props.location.search){
            var token=this.props.location.search.split('token=')[1].split('&cusId=')[0];
            var cusId=this.props.location.search.split('cusId=')[1];
            this.setState({
                token:token,
                cusId:cusId
            })
            localStorage.setItem('token',token);
        }
        var token
        console.log(status);
        if(status){
            this.setState({
                status:status
            })
        }
    }

    render() {
        return (
            <div>
                <Nav/ >
                <div className="tradingStatus">
                    {this.state.status == 'fail'?
                    <FailStatus/>:
                    this.state.status == 'success'?
                    <SuccessStatus/>:<FailStatus/>}
                </div>
            </div>
        )
    }
}

export default withRouter(TenderStatus);