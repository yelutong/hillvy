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
        }
    }

    componentWillMount = () => {

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
                    <iframe frameBorder="0" height={this.state.Height} scrolling="auto" width="100%" src={httpUrl+"/#/HowToRepay"}></iframe>:
                </div>
            </div>
        )
    }
}

export default withRouter(ContractIframe);