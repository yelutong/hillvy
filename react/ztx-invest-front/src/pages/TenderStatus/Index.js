import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import FailStatus from './FailStatus';//交易失败状态
import WaitStatus from './WaitStatus';//交易等待状态
import SuccessStatus from './SuccessStatus';//交易成功状态
import './Index.css';

class TenderStatus extends Component {
    state = {
        status:'' //fail 投标失败，waiting 投标等待，success 投标成功
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        var status = this.props.match.params.status;
        console.log(this.props);
        this.setState({
            status:status
        })
    }

    render() {
        return (
            <div>
                <Nav/ >
                <div className="tradingStatus">
                    {this.state.status == 'fail'?
                    <FailStatus/>:
                    this.state.status == 'waiting'?
                    <WaitStatus/>:
                    this.state.status == 'success'?
                    <SuccessStatus/>:<WaitStatus/>}
                </div>
            </div>
        )
    }
}

export default withRouter(TenderStatus);