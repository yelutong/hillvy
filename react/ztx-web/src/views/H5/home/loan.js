import React from 'react';
import Swiper from '../../../js/idangerous.swiper.min.js';
import format from '../../../custom/format.js';
import MobildNav from '../../public/mobildNav';//nav
import MobileBottom from '../../public/mobileBottom';//bottom
import loanTopBg from '../../../images/loanTopBg.png';//banner图片

import phone from '../../../images/phone.png';//phone
import phoneImg1 from '../../../images/iphone1.png';//phone
import phoneImg2 from '../../../images/iphone2.png';//phone
import phoneImg3 from '../../../images/iphone3.png';//phone
import phoneImg4 from '../../../images/iphone4.png';//phone
import cover1 from '../../../images/cover1.png';//cover
import cover3 from '../../../images/cover3.png';//cover
import cover4 from '../../../images/cover4.png';//cover

import applyMember from '../../../images/applyMember.png';//cover


class MobileHome extends React.Component {
  state = {language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    //改变轮播动效
    this.changeAnimate();
    //激活轮播
    setTimeout(() => {
      var mySwiper = new Swiper('.mobild-swiper-container',{
        pagination: '.pagination',
        calculateHeight : true,
        paginationClickable: true,
        //autoplay : 5000,//可选选项，自动滑动
        //loop : true,//可选选项，开启循环
      })
    },100);

    //滑动条
    var scale = function (btn, bar, num) {
      this.btn = document.getElementById(btn);
      this.bar = document.getElementById(bar);
      this.applyAmount = document.getElementById(num);
      this.step = this.bar.getElementsByTagName("DIV")[0];
      this.init();
    };
    scale.prototype = {
      init: function () {
        var f = this, g = document, b = window, m = Math;
        f.btn.ontouchstart = function (e) {
          var x=(e||b.event).touches[0].clientX;
          var l = this.offsetLeft;
          var max = f.bar.offsetWidth - this.offsetWidth;
          g.ontouchmove = function (e) {
            var thisX=(e||b.event).touches[0].clientX;
            var to = m.min(max, m.max(-2, l + (thisX - x)));
            f.btn.style.left = to + 'px';
            f.ondrag(m.round(m.max(0, to / max) * 100), to);
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
          };
          g.ontouchend = new Function('this.ontouchmove=null');
        };
      },
      ondrag: function (pos, x) {
        var maxNum = 5000000;
        var minNum = 600000;
        this.step.style.width = Math.max(0, x) + 'px';
        var apartAmount = Math.round((pos / 100)*(maxNum-minNum));
        console.log('apartAmount',apartAmount);
        if(apartAmount%100000 == 0){ //apartAmount 滑动的属猪
          apartAmount = apartAmount+minNum;//如果可以被100000整除，则直接取值，再加上最小额
        }else{
          apartAmount = (parseInt(apartAmount/100000)*100000)+minNum;//获取最小的整数，再加上最小额
        }
        var num = format.replaceNum(apartAmount);
        this.applyAmount.innerHTML = 'Rp' + num;
        console.log(num);
      }
    }
    new scale('mobileBtn0', 'mobileBar0', 'mobileApplyAmount');

    //选择额度
    $('.chooseTerm li').on('click',(e) => {
      $('.chooseTerm li').removeClass('active');
      $(e.target).parents('li').addClass('active');
    })
  }

  //下载
  download() {
    location.href = 'https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID';
  }

  //改变轮播动效
  changeAnimate = () => {
    Swiper.prototype.plugins.progress = function(swiper, params) {
      var isH = swiper.params.mode == 'horizontal';
      var wrapperMaxPosition;
      function initSlides(){
        for (var i=0; i<swiper.slides.length; i++) {
          var slide = swiper.slides[i];
          slide.progressSlideSize = isH ? swiper.h.getWidth(slide) : swiper.h.getHeight(slide);
          if ('offsetLeft' in slide) {
            slide.progressSlideOffset = isH ? slide.offsetLeft : slide.offsetTop;
          }
          else {
            slide.progressSlideOffset = isH ? slide.getOffset().left - swiper.h.getOffset(swiper.container).left : slide.getOffset().top - swiper.h.getOffset(swiper.container).top;  
          }
        }
        if (isH) {
          wrapperMaxPosition = swiper.h.getWidth(swiper.wrapper) + swiper.wrapperLeft + swiper.wrapperRight - swiper.width;
        }
        else {
          wrapperMaxPosition = swiper.h.getHeight(swiper.wrapper) + swiper.wrapperTop + swiper.wrapperBottom - swiper.height;
        }
      }
      function calcProgress(transform) {
        var transform = transform || {x:0, y:0, z:0};
        var offsetCenter;
        if(swiper.params.centeredSlides==true) offsetCenter = isH ? -transform.x+swiper.width/2 : -transform.y+swiper.height/2 ;
        else offsetCenter = isH ? -transform.x : -transform.y ;
        //Each slide offset from offset center
        for (var i=0; i<swiper.slides.length; i++) {
          var slide = swiper.slides[i];
          var slideCenterOffset = (swiper.params.centeredSlides==true) ? slide.progressSlideSize/2 : 0;

          var offsetMultiplier = (offsetCenter - slide.progressSlideOffset - slideCenterOffset)/slide.progressSlideSize;
          slide.progress = offsetMultiplier;

        }
        // Global Swiper Progress
        swiper.progress = isH ? -transform.x/wrapperMaxPosition : -transform.y/wrapperMaxPosition;
        // Callback
        if(swiper.params.onProgressChange) swiper.fireCallback(swiper.params.onProgressChange,swiper);
      }
      
      //Plugin Hooks
      var hooks = {
        onFirstInit : function(args){
          initSlides()
          calcProgress({
            x: swiper.getWrapperTranslate('x'),
            y: swiper.getWrapperTranslate('y')
          });
        },
        onInit : function(args) {
          initSlides()
        },
        onSetWrapperTransform: function(transform){
          calcProgress(transform);
        }
      }
      return hooks
    }
  }

  render() {
    return (
      <div className="MobileIndex">
        <MobildNav/>{/*nav*/}
        <div className="Loan">
          <div className="topBanner">{/*top*/}
            <p>INCLUSIVE FINANCE</p>
            <p>IMPACTING LIFE</p>
            <img className="loanTopBg" src={loanTopBg}/>
          </div>
          <div className="chooseAmount">{/**选择额度期限 下载app scroll*/}
            <div className="main">
              <p className="title">{this.state.language == 'Id'?'Jumlah pinjaman':'Amount of loan'}</p>
              <div id="mobileApplyAmount" className="mobileApplyAmount">Rp2.800.000</div>
              <div className="grade_warp">
                <div className="User_ratings User_grade" id="div_fraction0">
                  <div className="ratings_bars">
                    <div className="scale" id="mobileBar0">
                      <div></div>
                      <span className="scroll" id="mobileBtn0">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="title">{this.state.language == 'Id'?'Tenor Pinjaman':'Period of loan'}</p>
              <ul className="chooseTerm">
                <li><p className="term">7</p><p className="day">hari</p></li>
                <li className="active"><p className="term">14</p><p className="day">hari</p></li>
              </ul>
              <div className="down" onClick={this.download}>DOWN THE APP</div>
            </div>
          </div>
          <div className="mainErea howToApply">{/*How to apply*/}
            <div className="titles">{this.state.language == 'Id'?'Cara Pengajuan':'How to apply'}</div>
            <div className="mobild-swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img className="phone" src={phone} />
                  <img className="phoneImg" src={phoneImg1} />
                  <img className="phoneCover" src={cover1} />
                  <div className="text">
                    <div className="phoneTitle">{this.state.language == 'Id'?'Tahap 1 : Daftar dan pilih jumlah serta  jangka waktu pinjaman':'Step 1 : registration then select loan amount and loan period.'}</div>
                    <div className="phoneText">{this.state.language == 'Id'?'Gunakan nomor HP untuk masuk kemudian pilih jumlah dan jangka waktu pinjaman yang anda inginkan.':'Login with mobile number and select the amount and period of loan that you want.'}</div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img className="phone" src={phone} />
                  <img className="phoneImg" src={phoneImg2} />
                  <div className="text">
                    <div className="phoneTitle">{this.state.language == 'Id'?'Tahap 2 : Selesaikan 3 langkah proses verifikasi':'Step 2 : complete 3 step of certification process.'}</div>
                    <div className="phoneText">{this.state.language == 'Id'?'Anda hanya perlu melakukan Identifikasi wajah, foto KTP, foto ID Karyawan atau foto memakai baju kerja serta mengisi data diri pribadi.':'You only need to do face recognition, ID Card photo, ID worker photo or take a picture with your work cloths and then fill your personal information .'}</div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img className="phone" src={phone} />
                  <img className="phoneImg" src={phoneImg3} />
                  <img style={{'top':'20%'}} className="phoneCover" src={cover3} />
                  <div className="text">
                    <div className="phoneTitle">{this.state.language == 'Id'?'Tahap 3 : Kirim permohonan pinjaman':'Step 3 : submit your loan application.'}</div>
                    <div className="phoneText">{this.state.language == 'Id'?'Setelah melalui proses evaluasi informasi, kami akan memberitahukan anda jumlah pinjaman, kemudian anda dapat melakukan konfirmasi dan mengirimkan permohonan pinjaman.':'After verifed information,we will inform you the amount of loan, then you can conform and submit your loan application.'}</div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img className="phone" src={phone} />
                  <img className="phoneImg" src={phoneImg4} />
                  <img className="phoneCover" style={{'top':'25%'}} src={cover4} />
                  <div className="text">
                    <div className="phoneTitle">{this.state.language == 'Id'?'Tahap 4 : Audit cepat dan dana masuk rekening':'Step 4 : rapid verify and the loan will transfer to your bank account.'}</div>
                    <div className="phoneText">{this.state.language == 'Id'?'Kami akan mengkaji permohonan pinjaman anda, dalam proses ini mungkin anda akan ditelepon untuk verifikasi data, setelah kajian selesai dana akan cair paling cepat di hari tersebut.':'We will verify your loan application, during this period we’ll contact you to do confirmation about some information, the loan fastest will transfer to you on the day after approval.'}</div>
                  </div>
                </div>
              </div>
              <div className="pagination"></div>
            </div>
          </div>
          <div className="mainErea applyMember">{/*who can apply*/}
            <div className="titles">{this.state.language == 'Id'?'Siapa saja boleh mengajukan permohonan':'Who can apply'}</div>
            <img className="applyImg" src={applyMember} />
            <ul>
              <li>{this.state.language == 'Id'?'Warga Negara Indonesia':'Indonesian citizens'}</li>
              <li>{this.state.language == 'Id'?'Usia di atas 21 tahun':'Over the age of 21'}</li>
              <li>{this.state.language == 'Id'?'Mempunyai sumber pendapatan yang stabil':'Stable source of income'}</li>
            </ul>
          </div>
        </div>
        <MobileBottom/>{/*bottom*/}
      </div>
    );
  }
}

export default MobileHome;
