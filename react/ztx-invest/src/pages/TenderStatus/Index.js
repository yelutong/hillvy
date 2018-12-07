import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import FailStatus from './FailStatus';//交易失败状态
import WaitStatus from './WaitStatus';//交易等待状态
import SuccessStatus from './SuccessStatus';//交易成功状态
import './Index.css';

class TenderStatus extends Component {
    state = {
        TenderResult:{},
        status:'' //fail 投标失败，waiting 投标等待，success 投标成功
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if(this.props.history.location.state){
            this.setState({
                TenderResult:this.props.history.location.state.TenderResult || {}
            })
        }
        var status = this.props.match.params.status;
        if(status){
            this.setState({
                status:status
            })
        }else{
            if(this.props.history.location.state && this.props.history.location.state.TenderResult == 'fail'){
                setTimeout(() => {
                    this.setState({
                        status:'fail'
                    })
                },2000)
            }else{
                setTimeout(() => {
                    this.setState({
                        status:'success'
                    })
                },2000)
            }
        }
        localStorage.removeItem('fromUrl');
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
                    <SuccessStatus TenderResult = {this.state.TenderResult}/>:<WaitStatus/>}
                </div>
            </div>
        )
    }
}

export default withRouter(TenderStatus);