import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './Index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="Tender">
                    <Link to="/TenderStatus">确认投标</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);