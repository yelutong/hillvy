import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button,Badge } from 'antd-mobile';
import { getTenderList  } from '../../config/api';
import format from '../../js/format';
import './index.css';

import RiskA from '../../images/a.png';
import RiskB from '../../images/b.png';
import RiskC from '../../images/c.png';
import add from '../../images/add.png';
import car from '../../images/car.png';
import cancel from '../../images/cancel.png';
import shopCar from '../../images/shop_car.png';
import deleteImg from '../../images/delete.png';

class ProductContent extends React.Component{
    state = {
        chooseNum:0,
        nerError:false,
        amount:0,
        income:0,
        tabHeight:(document.documentElement.clientHeight-44)+'px',
        //当choose == true的时候，就是已经选中当条记录
        /*tenderList:[
            {id:'1',choose:false},
            {id:'2',choose:false},
            {id:'3',choose:true},
            {id:'4',choose:true},
            {id:'5',choose:false},
        ]*/
        tenderList:[]
    }

    componentDidMount = () => {
        //筛选出选中的数量
        var chooseNum = this.state.tenderList.filter((item) => item.choose == true);
        this.setState({
            chooseNum:chooseNum.length
        })
        //获取标的列表
        if(localStorage.getItem('fromUrl') == 'TenderDetail'){ //如果是从详情返回的，则不需重新获取
            this.setState({
                tenderList:JSON.parse(localStorage.getItem('tenderList'))
            })
            localStorage.removeItem('fromUrl');
        }else{
            this.getTenderList();
        }
    }

    /*
    *@description 获取标的列表
    */
    getTenderList () {
        var data = {
            cusId : '109612'
        }
        getTenderList(data).then((res) => {
            if(res.data.code == '0000'){
                this.setState({
                    tenderList:res.data.body
                })
            }else{
                this.setState({
                    nerError:true
                })
            }
        });
    }

    /*
    *@description 选中投的
    */
    chooseTender (e,id) {
        e.stopPropagation();  
        e.nativeEvent.stopImmediatePropagation();  
        //设置choose为true，重新渲染数组
        var newList = new Array();
        this.state.tenderList.map((item) => {
            if(item.id == id){
                item.choose = !item.choose;
            }
            newList.push(item);
        })
        //筛选出选中的数量
        var chooseNum = newList.filter((item) => item.choose == true);
        //获取金额和利息总和
        var amount = 0;
        var income = 0;
        chooseNum.map((item) => {
            amount = amount+item.amount;
            income = income+item.antipatedIncome;
        })
        console.log('amount',amount,'income',income);
        this.setState({
            amount:amount,
            income:income,
            chooseNum:chooseNum.length,
            tenderList:newList
        })
    }

    /*
    *@description 查看标递详情
    */
    goToDetail (id) { 
        console.log(this.props);
        //筛选点击的标的
        var detailItem = this.state.tenderList.filter((item) => item.id == id);
        localStorage.setItem('detailItem',JSON.stringify(detailItem));
        localStorage.setItem('tenderList',JSON.stringify(this.state.tenderList));
        var tenderChoose = newList.filter((item) => item.choose == true);
        localStorage.setItem('tenderChoose',JSON.stringify(tenderChoose));
        this.props.history.push('/TenderDetail');
    }

    /*
    *@description 确认投标
    */
    confirmTender () {
        localStorage.setItem('tenderChoose',JSON.stringify(this.state.tenderList));
        this.props.history.push('/TenderConfirm');
    }

    /*
    *@description 全投和取消全投
    */
    allTender (all) {
        var newList = new Array();
        if(all == 'all'){
            this.state.tenderList.map((item) => {
                item.choose = true;
                newList.push(item);
            })
        }else{
            this.state.tenderList.map((item) => {
                item.choose = false;
                newList.push(item);
            })
        }
        //筛选出选中的数量
        var chooseNum = newList.filter((item) => item.choose == true);
        //获取金额和利息总和
        var amount = 0;
        var income = 0;
        chooseNum.map((item) => {
            amount = amount+item.amount;
            income = income+item.antipatedIncome;
        })
        this.setState({
            amount:amount,
            income:income,
            chooseNum:chooseNum.length,
            tenderList:newList
        })
    }

    render(){
        return (
        <div className="Tender">
            <div className="TenderMain" style={this.state.tenderList==0?{height:this.state.tabHeight}:{}}>
                {/*遍历投标列表*/}
                {this.state.tenderList&&this.state.tenderList.length>0?
                this.state.tenderList.map((item,index) => {
                    return(
                        <div className="TenderItem chooseIt" key={item.id} onClick={this.goToDetail.bind(this,item.id)}>
                            <div className="mainItem">
                                <div className="flexBox TenderItemTop">
                                    <div className="left">Pinjaman {item.phone}</div>
                                    <div className="right">
                                        <img className="riskImg" src={item.level=='A'?RiskA:item.level=='B'?RiskB:item.level=='C'?RiskC:''} />
                                        Grade
                                    </div>
                                </div>
                                <div className="flexBox TenderItemHead">
                                    <div className="left">
                                        <p className="num">{item.rate}%</p>
                                        <p className="Bunga">Bunga</p>
                                    </div>
                                    <div className="right">
                                        <p className="term">Tenor {item.term+(item.termType=='DAY'?'Hari':'bulan')}</p>
                                        <p className="amount">Nominal Rp{format.addCommas(item.amount)}</p>
                                    </div>
                                </div>
                                {/*根据choose判断是否已选中*/}
                                {item.choose?
                                <div className="TenderItemBottom">
                                    <div className="flexBox TenderItemChoose">
                                        <div className="left">
                                            <img src={shopCar} />
                                            Berhasil
                                        </div>
                                        <div className="right">
                                            <img src={deleteImg} onClick={e => this.chooseTender(e,item.id)}/>
                                        </div>
                                    </div>
                                </div>:
                                <div className="TenderItemBottom">
                                    <div className="flexBox">
                                        <Button className="btn" type="primary" onClick={e => this.chooseTender(e,item.id)}>
                                            <img src={add} />
                                            Danai
                                        </Button>
                                    </div>
                                </div>}

                            </div>
                        </div>
                    )}):
                <div>Daftar Pinjaman sementara kosong Silahkan kembali lagi nanti</div>
                }

                {/*<div className="TenderItem">
                    <div className="mainItem">
                        <div className="flexBox TenderItemTop">
                            <div className="left">Pinjaman 137****2323</div>
                            <div className="right">
                                <img className="riskImg" src={RiskA} />
                                Grade
                            </div>
                        </div>
                        <div className="flexBox TenderItemHead">
                            <div className="left">
                                <p className="num">0.1%</p>
                                <p className="Bunga">Bunga</p>
                            </div>
                            <div className="right">
                                <p className="term">Tenor 3bulan</p>
                                <p className="amount">Nominal Rp600.000</p>
                            </div>
                        </div>
                        <div className="TenderItemBottom">
                            <div className="flexBox">
                                <Button className="btn" type="primary">
                                    <img src={add} />
                                    Danai
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="TenderItem">
                    <div className="mainItem">
                        <div className="flexBox TenderItemTop">
                            <div className="left">Pinjaman 137****2323</div>
                            <div className="right">
                                <img className="riskImg" src={RiskA} />
                                Grade
                            </div>
                        </div>
                        <div className="flexBox TenderItemHead">
                            <div className="left">
                                <p className="num">0.1%</p>
                                <p className="Bunga">Bunga</p>
                            </div>
                            <div className="right">
                                <p className="term">Tenor 3bulan</p>
                                <p className="amount">Nominal Rp600.000</p>
                            </div>
                        </div>
                        <div className="TenderItemBottom">
                            <div className="flexBox">
                                <Button className="btn" type="primary">
                                    <img src={add} />
                                    Danai
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>*/}

            </div>
            {this.state.tenderList&&this.state.tenderList.length>0?
                this.state.chooseNum == 0 ?<div className="TenderBottom">
                <div className="flexBox bottomNum">
                    <div className="left">Total Pendanaan: <label>{format.addCommas(this.state.amount)}</label></div>
                    <div className="right">Estimasi Bunga: <label>{format.addCommas(this.state.income)}</label></div>
                </div>
                <div className="flexBox bottomCar">
                    <div className="left" onClick={this.allTender.bind(this,'all')}>Danai Penuh</div>
                    <div className="right">
                        <img src={car} />
                        Daftar Pendanaan
                    </div>
                </div>
            </div>:
            <div className="TenderBottom">
                <div className="flexBox bottomNum">
                    <div className="left">Total Pendanaan: <label>{format.addCommas(this.state.amount)}</label></div>
                    <div className="right">Estimasi Bunga: <label>{format.addCommas(this.state.income)}</label></div>
                </div>
                <div className="flexBox bottomCar hasChose">
                    <div className="left" onClick={this.allTender.bind(this,'none')}>
                        <div><img src={cancel} /></div>
                        Kosongkan
                    </div>
                    <div className="right" onClick={this.confirmTender.bind(this)}>
                        <Badge text={this.state.chooseNum}><img src={car} /></Badge>
                        Daftar Pendanaan
                    </div>
                </div>
            </div>:''}
        </div>
        )
    }
}

export default withRouter(ProductContent);