import React from 'react';
import Swiper from 'swiper/dist/js/swiper.min';
import 'swiper/dist/css/swiper.min.css';

import repayStepA from './images/step1.jpg';
import repayStepB from './images/step2.jpg';
import repayStepC from './images/step3.jpg';
import repayStepD from './images/step4.jpg';
import repayStepE from './images/step5.jpg';
import repayStepF from './images/step6.jpg';
import repayStepG from './images/step7.jpg';
import repayStepH from './images/step8.jpg';
import repayStepI from './images/step9.jpg';

var normalSwiper,preViewSwiper;

class HowToRepay extends React.Component {
  state = {thisQuestion:{},languga:'Indonesian',swiperActive:0};

  componentWillMount() {
    var languga = this.props.location.query.languga || 'Indonesian';
    console.log(languga);
    this.setState({languga:languga});
    //localStorage.setItem('languga',languga);
  }

  componentDidMount() {
    $(function () {
      /*
      *轮播swiper
      */
      normalSwiper = new Swiper('.swiper-container', {
        //autoplay: true,//可选选项，自动滑动
        //loop : true,
        /*zoom : {
          toggle: false,
        },*/
        zoom:false,
        pagination: {
          el: '.swiper-pagination',
        }
      })
    })

    //阻止事件冒泡
    /*$(".preView img").on('click',function(){
      console.log('22222');
      return false;
    });*/

    //点击小图的时候，事件
    $(".swiper-container .swiper-slide .swiper-zoom-container").on('click',function(){
      $('.preView').show();
      $('.grayBg').show();
      preViewSwiper = new Swiper('.preView', {
        //autoplay: false,//可选选项，自动滑动
        //loop : true,
        zoom: {
          toggle: false,
        },
        initialSlide:normalSwiper.activeIndex, //设置放大的图片和底图的swiper一致
        on:{
          click: function(){
            $('.preView').hide();
            $('.grayBg').hide();
            $('.preView')
            .find('.swiper-zoom-container').css('transform','translate3d(0px, 0px, 0px)')
            .find('img').css('transform','scale(1)')
            .find('.swiper-slide').removeClass('swiper-slide-zoomed');
            preViewSwiper.zoom.disable();//禁用zoom
            setTimeout(() => {preViewSwiper.destroy();},1)
          },
        },
        pagination: {
          el: '#preView-pagination',
        }
      })
    });
  }

  /*
  *点击图片事件
  */
  /*preViewImg = () => {
    $('.preView').show();
    $('.grayBg').show();

    preViewSwiper = new Swiper('.preView', {
      //autoplay: false,//可选选项，自动滑动
      loop : true,
      initialSlide:normalSwiper.activeIndex-1, //设置放大的图片和底图的swiper一致
      zoom : true //开启zoom
    })
  }*/

  /*
  *点击背景隐藏图片
  */
  hidePreView = () => {
    $('.preView').hide();
    $('.grayBg').hide();
    $('.preView')
    .find('.swiper-zoom-container').css('transform','translate3d(0px, 0px, 0px)')
    .find('img').css('transform','scale(1)')
    .find('.swiper-slide').removeClass('swiper-slide-zoomed');
    preViewSwiper.zoom.disable();//禁用zoom
    preViewSwiper.destroy();
  }

  render() {
    return (
      <div className="mainHowToPay">
        {/*ATM还款*/}
        <div className="howToPay line">
          <div className="payQuestion">
              <div className="title">Cara bayar menggunakan ATM</div>
          </div>
          {/*可放大缩小的轮播图*/}
          <div className="swiper-container">
            <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepA}/>
                  </div>
                  <div className="slipeDesc">Silahkan masukkan PIN Anda</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepB}/>
                  </div>
                  <div className="slipeDesc">Pilih “PAYMENT/PURCHASE”</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepC}/>
                  </div>
                  <div className="slipeDesc">Pilih “E-COMMERCE”</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepD}/>
                  </div>
                  <div className="slipeDesc">Jika anda pengguna Rekening Bank Mandiri, silahkan masukkan 88899;Jika anda menggunakan Rekening Bank Lain, silahkan masukkan 008</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepE}/>
                  </div>
                  <div className="slipeDesc">Masukkan 16 digit kode pembayaran Anda sebagai nomor rekening tujuan lalu pilih " CORRECT "</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepF}/>
                  </div>
                  <div className="slipeDesc">Masukkan jumlah pembayaran lalu pilih " CORRECT ".Nominal pembayaran yang tidak sesuai akan menyebabkan transaksi gagal.</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepG}/>
                  </div>
                  <div className="slipeDesc">Astikan bahwa kode pembayaran,dan nominal yang dibayarkan telah sesuai,lalu pilih " YES "</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepH}/>
                  </div>
                  <div className="slipeDesc">Pilih Rekening Bank</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepI}/>
                  </div>
                  <div className="slipeDesc">Keluar</div>
                </div>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>

        {/*点击图片，显示大图大图*/}
        <div className="previewErea">
          <div className="grayBg" onClick={this.hidePreView}></div>
          <div className="preView">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepA}/>
                  </div>
                  <div className="slipeDesc">Silahkan masukkan PIN Anda</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepB}/>
                  </div>
                  <div className="slipeDesc">Pilih “PAYMENT/PURCHASE”</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepC}/>
                  </div>
                  <div className="slipeDesc">Pilih “E-COMMERCE”</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepD}/>
                  </div>
                  <div className="slipeDesc">Jika anda pengguna Rekening Bank Mandiri, silahkan masukkan 88899;Jika anda menggunakan Rekening Bank Lain, silahkan masukkan 008</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepE}/>
                  </div>
                  <div className="slipeDesc">Masukkan 16 digit kode pembayaran Anda sebagai nomor rekening tujuan lalu pilih " CORRECT "</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepF}/>
                  </div>
                  <div className="slipeDesc">Masukkan jumlah pembayaran lalu pilih " CORRECT ".Nominal pembayaran yang tidak sesuai akan menyebabkan transaksi gagal.</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepG}/>
                  </div>
                  <div className="slipeDesc">Astikan bahwa kode pembayaran,dan nominal yang dibayarkan telah sesuai,lalu pilih " YES "</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepH}/>
                  </div>
                  <div className="slipeDesc">Pilih Rekening Bank</div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-zoom-container">
                    <img src={repayStepI}/>
                  </div>
                  <div className="slipeDesc">Keluar</div>
                </div>
            </div>
            <div id="preView-pagination"></div>
          </div>
        </div>

        {/*便利店还款*/}
        <div className="howToPay">
          <div className="payQuestion">
            <div className="title">Cara melakukan pembayaran di Convenience Store</div>
            <div className="desc">
              <div className="num left">1.</div>
              <div className="detail right">Catat kode pembayaran dan datang ke gerai Alfamart,Alfa Midi,Alfa Express,Lawson,DAN+DAN terdekat</div>
            </div>
            <div className="desc">
              <div className="num left">2.</div>
              <div className="detail right">Katakan kepada kasir bahwa Anda akan menlakukan pengembalian ke “Doku Merchant”</div>
            </div>
            <div className="desc">
              <div className="num left">3.</div>
              <div className="detail right">Berikan kode pembayaran kepada kasir</div>
            </div>
            <div className="desc">
              <div className="num left">4.</div>
              <div className="detail right">Kasir akan mengkonfirmasi nama Merchant dan nominal yang harus dibayarkan</div>
            </div>
            <div className="desc">
              <div className="num left">5.</div>
              <div className="detail right">Lakukan pembayaran sesuai dengan nominal yang disebutkan</div>
            </div>
            <div className="desc">
              <div className="num left">6.</div>
              <div className="detail right">Selesai</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HowToRepay.defaultProps = {
};

export default HowToRepay;
