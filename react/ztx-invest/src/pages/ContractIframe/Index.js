import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import config from '../../config/config';
const httpUrl = location.protocol+'//'+config.frontDomain;
import './Index.css';

class ContractIframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Height:(document.documentElement.clientHeight-44)+'px',
            contractNo:this.props.history.location.state?this.props.history.location.state.contractNo : '',
            type:this.props.history.location.state?this.props.history.location.state.type : '',
            loanUrl:'',
            lendUrl:'',
        }
    }

    componentWillMount = () => {
        this.setState({
            loanUrl:httpUrl+"/#/loanAgreement?token="+localStorage.getItem('token')+'&contractNo='+this.state.contractNo,
            lendUrl:httpUrl+"/#/lendingAgreement?token="+localStorage.getItem('token')+'&contractNo='+this.state.contractNo
        },() => {
            console.log(this.state.loanUrl);
            console.log(this.state.lendUrl);
        })
    }

    componentDidMount = () => {
        this.setState({
            Height:(document.documentElement.clientHeight-44)+'px'
        })
    }

    componentWillUnmount = () => {

    }

    render() {
        return (
            <div>
                <Nav />
                <div className="contractIframe" style={{'marginTop':'50px'}}>
                    {this.state.type == 'loan'?
                        <iframe frameBorder="0" height={this.state.Height} scrolling="auto" width="100%" src={this.state.loanUrl}></iframe>:
                        <iframe frameBorder="0" height={this.state.Height} scrolling="auto" width="100%" src={this.state.lendUrl}></iframe>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(ContractIframe);