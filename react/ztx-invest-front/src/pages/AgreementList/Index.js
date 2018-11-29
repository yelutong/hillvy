import React, {Component} from 'react';
import { List } from 'antd-mobile';
import {Link,withRouter} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import './Index.css';

const Item = List.Item;

class AgreementList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <div className="AgreementList">
                    <List className="list">
                        <Item className="agreementTitle">ID Produk ：PG1234</Item>
                        <Item className="agreementMian" arrow="horizontal" onClick={() => {}}>Perjanjian Layanan Kerja Sama</Item>
                    </List>
                    <List className="list">
                        <Item className="agreementTitle">ID Produk ：PG1234</Item>
                        <Item className="agreementMian" arrow="horizontal" onClick={() => {}}>Perjanjian Layanan Kerja Sama</Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default withRouter(AgreementList);