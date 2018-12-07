import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button,Badge,Toast } from 'antd-mobile';
import { getTenderList,getPayWay  } from '../../config/api';
import format from '../../js/format';
import './index.css';
import NetError from '../../components/errorNet/NetError';

import RiskA from '../../images/a.png';
import RiskB from '../../images/b.png';
import RiskC from '../../images/c.png';
import RiskD from '../../images/d.png';
import RiskE from '../../images/e.png';
import add from '../../images/add.png';
import car from '../../images/car.png';
import cancel from '../../images/cancel.png';
import shopCar from '../../images/shop_car.png';
import deleteImg from '../../images/delete.png';
import empty from '../../images/empty.png';

class ProductContent extends React.Component{
    state = {
        chooseNum:0,
        amount:0,
        income:0,
        loading:false,
        notChoose:1,
        netError:false,
        tabHeight:(document.documentElement.clientHeight-44)+'px',
        //当choose == true的时候，就是已经选中当条记录
        /*tenderList:[
            {id:'1',choose:false},
            {id:'2',choose:false},
            {id:'3',choose:false},
            {id:'4',choose:false},
            {id:'5',choose:false},
        ]*/
        cusId:localStorage.getItem('cusId') || '',
        tenderList:[]
    }

    componentDidMount = () => {
        //筛选出选中的数量
        var chooseNum = this.state.tenderList.filter((item) => item.choose == true);
        this.setState({
            chooseNum:chooseNum.length
        })
        //获取标的列表
        console.log(localStorage.getItem('fromUrl'));
        localStorage.setItem('localStorageList',localStorage.getItem('fromUrl'));
        if(localStorage.getItem('fromUrl') && localStorage.getItem('fromUrl') == 'TenderDetail'){ //如果是从详情返回的，则不需重新获取
            console.log('1111');
            this.setState({
                tenderList:JSON.parse(localStorage.getItem('tenderList'))
            },() => {
                console.log('tenderList',this.state.tenderList);
                //筛选出选中的数量
                var chooseNum = this.state.tenderList.filter((item) => item.choose == true);
                //筛选出是否已经全投
                var notChoose = this.state.tenderList.filter((item) => item.choose != true);
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
                    notChoose:notChoose.length,
                    chooseNum:chooseNum.length
                })
                localStorage.removeItem('fromUrl');
            })
        }else{
            if(this.props.location.search){
                console.log('2222');
                var token=this.props.location.search.split('token=')[1].split('&cusId=')[0];
                var cusId=this.props.location.search.split('cusId=')[1];
                localStorage.setItem('token',token);
                localStorage.setItem('cusId',cusId);
                this.setState({
                    token:token,
                    cusId:cusId
                },() => {
                    this.getTenderList();
                })
            }else{
                console.log('3333');
                this.getTenderList();
            }
        }
    }
    componentWillUnmount = () => {
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
    }

    /*
    *@description 获取标的列表
    */
    getTenderList = () => {
        var data = {
            cusId : this.state.cusId
        }
        var loading;
        var _this = this;
        this.setState({
            loading:true,
            netError:false
        })
        getTenderList(data).then((res) => {
            if(res.data.code == '0000'){
                this.setState({
                    tenderList:res.data.body,
                    loading:false
                })
            }else{
                this.setState({
                    loading:false
                })
            }
            localStorage.setItem('localStorageList','fromUrl');
        }).catch((error) => {
            console.log('res',error);
            this.setState({
                netError:true
            })
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
        //筛选出是否已经全投
        var notChoose = newList.filter((item) => item.choose != true);
        console.log('notChoose',notChoose);
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
            notChoose:notChoose.length,
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
        var tenderChoose = this.state.tenderList.filter((item) => item.choose == true);
        localStorage.setItem('tenderChoose',JSON.stringify(tenderChoose));
        this.props.history.push({
            pathname:'TenderDetail', 
            state: {
              detailItem:this.state.tenderList.filter((item) => item.id == id)[0]
            }
          });
    }

    /*
    *@description 确认投标
    */
    confirmTender () {
        localStorage.setItem('tenderList',JSON.stringify(this.state.tenderList));
        //如果渠道是doku的话，就先去重一下
          this.props.history.push({
            pathname:'/TenderConfirm', 
            state: {
                chooseNum:this.state.chooseNum,
                amount:this.state.amount,
                income:this.state.income,
                tenderList:this.state.tenderList
            }
          });//依赖React-Router3.X版本
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
        //筛选出是否已经全投
        var notChoose = newList.filter((item) => item.choose != true);
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
            notChoose:notChoose.length,
            chooseNum:chooseNum.length,
            tenderList:newList
        })
    }

    render(){
        return (
        <div>
            {this.state.netError?
            <NetError refresh={this.getTenderList.bind(this)}/>:
            <div className="Tender">
                <div className="TenderMain" style={this.state.tenderList==0?{height:this.state.tabHeight}:{}}>
                    {/*遍历投标列表*/}
                    {this.state.tenderList&&this.state.tenderList.length>0?
                    this.state.tenderList.map((item,index) => {
                        return(
                            <div className="TenderItem chooseIt" key={item.id} onClick={this.goToDetail.bind(this,item.id)}>
                                <div className="mainItem">
                                    <div className="flexBox TenderItemTop vux-1px-tb">
                                        <div className="left">Pinjaman {item.phone}</div>
                                        <div className="right">
                                            <img className="riskImg" src={item.level=='A'?RiskA:item.level=='B'?RiskB:item.level=='C'?RiskC:item.level=='D'?RiskD:item.level=='E'?RiskE:''} />
                                            Grade
                                        </div>
                                    </div>
                                    <div className="flexBox TenderItemHead">
                                        <div className="left">
                                            <p className="num">{item.rate}%</p>
                                            <p className="Bunga">Bunga</p>
                                        </div>
                                        <div className="right vux-1px-l">
                                            <p className="term">Tenor {item.term+(item.termType=='DAY'?'Hari':'bulan')}</p>
                                            <p className="amount">Nominal Rp{format.addCommas(item.amount)}</p>
                                        </div>
                                    </div>
                                    {/*根据choose判断是否已选中*/}
                                    {item.choose?
                                    <div className="TenderItemBottom vux-1px-tb">
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
                                    <div className="TenderItemBottom vux-1px-tb">
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
                    <div className="empty">
                        {!this.state.loading?<div className="emptyMain" onClick={this.getTenderList.bind(this)}>
                            <img src={empty} />
                            <div className="text">Daftar Pinjaman sementara kosong Silahkan kembali lagi nanti</div>
                        </div>:''}
                    </div>
                    }

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
                        {this.state.notChoose!=0?
                        <div className="left notAll" onClick={this.allTender.bind(this,'all')}>Danai Penuh</div>:
                        <div className="left" onClick={this.allTender.bind(this,'none')}>
                            <div><img src={cancel} /></div>
                            Kosongkan
                        </div>}
                        <div className="right" onClick={this.confirmTender.bind(this)}>
                            <Badge text={this.state.chooseNum}><img src={car} /></Badge>
                            Daftar Pendanaan
                        </div>
                    </div>
                </div>:''}
            </div>
            }
        </div>
        )
    }
}

export default withRouter(ProductContent);