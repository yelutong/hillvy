import React from 'react';
import Swiper from 'swiper/dist/js/swiper.min';
import format from '../../custom/format.js';
import axios from 'axios';
import restStore from './store';
import 'swiper/dist/css/swiper.min.css';
import './style/coupon.css';

import ing from './images/ing.png';
import used from './images/used.png';
import noCoupon from './images/noCoupon.png';

var mySwiper;
class Coupon extends React.Component {
  state = {
    navList:['Tersedia','Kadaluarsa','Terpakai'],
    couponValid:null,
    couponInvalid:null,
    couponUsed:null,
    tabIndex:0
  };

  componentDidMount() {
    $('html,body,#app').css('height','100%');
    /*设置背景颜色*/
    $('body').css('background-color','#f6f6f6');
    //获取优惠券
    this.getCoupon('UNUSED');
    this.getCoupon('INVALID');
    this.getCoupon('USED');
    var _this = this;
    //触摸滑动切换tabs
    mySwiper = new Swiper('.swiper-container',{

      pagination: {
        el: '.nav',
        paginationClickable :true,
        type: 'custom', //自定义分页器
        renderCustom: function (swiper,current, total) { //自定义分页器
          var html = [];
          _this.state.navList.map((item,index) => {
              if(index === (current -1)){
                html.push('<li class="on">'+item+'</li>');
              }else{
                html.push('<li>'+item+'</li>');
              }
          })
          return html.join('');
        }
      },
      on: { 
        slideChangeTransitionEnd: function(){
          //$('.swiper-slide').css('height',activeHeight+'px');
          //优惠券状态 UNUSED-未使用，USED-已使用（“合并USING-使用中的记录”），INVALID-失效
          var status = this.activeIndex == '0'? 'UNUSED':this.activeIndex == '1'? 'INVALID': this.activeIndex == '2'?'USED':'';
          if((status == 'UNUSED' && sessionStorage.getItem('couponValid')) || (status == 'INVALID' && sessionStorage.getItem('couponInvalid')) || (status == 'USED' && sessionStorage.getItem('couponUsed'))){
            //有缓存的时候不需要调用
            //_this.getCoupon(status);//获取优惠券
          }else{
            _this.getCoupon(status);//获取优惠券
          }
        },
      },
    })
    $(".nav").on("click","li",function(){
      var index = $(this).index();
      mySwiper.slideTo(index);
    })
  }

  /*生命周期即将结束*/
  componentWillUnmount() {
    $('html,body,#app').css('height','auto');
    /*设置背景颜色*/
    $('body').css('background-color','#ffffff');
  }

  //获取优惠券信息
  getCoupon = (status) => {
    //转换金额数字格式
    var token = this.props.location.query.token || '';
    var registId = this.props.location.query.registId || '';
    localStorage.setItem('token',token);
    if(App){
      App.showLoading(true);
    }
    axios.get(restStore.couponInfo,{params:{
      status:status,
      registId:registId
      //couponType 优惠券类型 参数非必填 
      //INTEREST_DEDUCTION-利息抵扣券,PRINCIPAL_DEDUCTION-本金抵扣券，PRINCIPAL_DEDUCTION-本金抵扣券,REPAY_DEDUCTION-还款抵扣券
    }}).then((res) => {
        if(App){
          App.showLoading(false);
        }
        if(res.data.code == '0000'){
          if(status == 'UNUSED'){
            res.data.body.map((item) => {
              item.discounAmt = format.replaceNum(item.discounAmt);//转化金额
              item.couponEndDate = format.timestampToTime(item.couponEndDate);//转化时间戳
            })
            this.setState({
              couponValid:res.data.body
            },() => {
              sessionStorage.setItem('couponValid',JSON.stringify(res.data.body));
            })
          }else if(status == 'INVALID'){
            res.data.body.map((item) => {
              item.discounAmt = format.replaceNum(item.discounAmt);//转化金额
              item.couponEndDate = format.timestampToTime(item.couponEndDate);//转化时间戳
            })
            this.setState({
              couponInvalid:res.data.body
            },() => {
              sessionStorage.setItem('couponInvalid',JSON.stringify(res.data.body));
            })
          }else if(status == 'USED'){
            res.data.body.map((item) => {
              item.discounAmt = format.replaceNum(item.discounAmt);//转化金额
              item.couponEndDate = format.timestampToTime(item.couponEndDate);//转化时间戳
            })
            this.setState({
              couponUsed:res.data.body
            },() => {
              sessionStorage.setItem('couponUsed',JSON.stringify(res.data.body));
            })
          }
          //三分钟后 清除缓存
          setTimeout(() => {
            sessionStorage.removeItem('couponValid');
            sessionStorage.removeItem('couponInvalid');
            sessionStorage.removeItem('couponUsed');
          },180000);
        }
    },(res) => {
      if(status == 'UNUSED'){
        this.setState({
          couponValid:[]
        })
      }else if(status == 'INVALID'){
        this.setState({
          couponInvalid:[]
        })
      }else if(status == 'USED'){
        this.setState({
          couponUsed:[]
        })
      }
    });
  }

  closeActivity(){
    App.finish();
  }


  render() {
    return (
      <div className="coupon">
        <ul className="nav"></ul>
        <div className="swiper-container">
          <div className="swiper-wrapper">
              <div className="swiper-slide couponIng">{/*有效的优惠券*/}
                {(this.state.couponValid && this.state.couponValid.length>0)?
                  <div className="hasCoupon">
                    {
                      this.state.couponValid.map((item) => {
                        return (
                          <div className="couponImg">
                            <img src={ing} />
                            <div className="amountArea">
                              <span className="amount">
                                <label>Rp</label>
                                {item.discounAmt}
                              </span>
                            </div>
                            <div className="validTime">Berlaku sampai {item.couponEndDate}</div>
                          </div>
                        )
                      })
                    }
                  </div>:
                  (this.state.couponValid && this.state.couponValid.length==0)?
                  <div className="hasNoCoupon">{/*暂无优惠券*/}
                    <img src={noCoupon} />
                    <div className="noCouponTip">kupon tidak ditemukan</div>
                  </div>:''
                }
              </div>
              <div className="swiper-slide couponInvalid">{/*已失效的优惠券*/}
                {(this.state.couponInvalid && this.state.couponInvalid.length>0)?
                  <div className="hasCoupon">
                    {
                      this.state.couponInvalid.map((item) => {
                        return (
                          <div className="couponImg">
                            <img src={ing} />
                            <div className="amountArea">
                              <span className="amount">
                                <label>Rp</label>
                                {item.discounAmt}
                              </span>
                            </div>
                            <div className="validTime">Berlaku sampai {item.couponEndDate}</div>
                            <div className="cover"><span>Kadaluarsa</span></div>
                          </div>
                        )
                      })
                    }
                  </div>:
                  (this.state.couponInvalid && this.state.couponInvalid.length==0)?
                  <div className="hasNoCoupon">{/*暂无优惠券*/}
                    <img src={noCoupon} />
                    <div className="noCouponTip">kupon tidak ditemukan</div>
                  </div>:''
                }
              </div>
              <div className="swiper-slide couponUsed">{/*已使用的优惠券*/}
                {(this.state.couponUsed && this.state.couponUsed.length>0)?
                  <div className="hasCoupon">
                    {
                      this.state.couponUsed.map((item) => {
                        return (
                          <div className="couponImg">
                            <img src={used} />
                            <div className="amountArea">
                              <span className="amount">
                                <label>Rp</label>
                                {item.discounAmt}
                              </span>
                            </div>
                            <div className="validTime">Berlaku sampai {item.couponEndDate}</div>
                          </div>
                        )
                      })
                    }
                  </div>:
                  (this.state.couponUsed && this.state.couponUsed.length==0)?
                  <div className="hasNoCoupon">{/*暂无优惠券*/}
                    <img src={noCoupon} />
                    <div className="noCouponTip">kupon tidak ditemukan</div>
                  </div>:''
                }
              </div>
          </div>
        </div>
      </div>
    );
  }
}

Coupon.defaultProps = {
};

export default Coupon;
