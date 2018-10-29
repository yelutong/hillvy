import React from 'react';
import Swiper from '../../../js/idangerous.swiper.min.js';
import format from '../../../custom/format.js';

import TopNav from '../../public/topNav';//顶部导航
import PCBottom from '../../public/bottom';//底部
import loanTopBg from '../../../images/loanTopBg.png';//topBg
import scrollBtn from '../../../images/j.png';//滑动btn

import google from '../../../images/google.png';//google
import ojbk from '../../../images/ojbk.png';//ojbk

import headBg from '../../../images/headBg.png';//headBG
import phone from '../../../images/phone.png';//phone
import phone1 from '../../../images/iphone1.png';//phone

import people1 from '../../../images/people1.png';//people
import people2 from '../../../images/people2.png';//people
import people3 from '../../../images/people3.png';//people
import people4 from '../../../images/people4.png';//people
import people5 from '../../../images/people5.png';//people



class Loan extends React.Component {
  state = {indexs:0,flag:true,stepImg:'iphone1',language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    /*var mySwiper = new Swiper('.swiper-container',{
      //pagination: '.pagination',
      //paginationClickable: true,
      mode: 'vertical',
      mousewheelControl:true,
      speed:1000,
      followFinger:false, //鼠标拖动时候不会动，放开才可以动
    })*/

    //滑动条
    const scale = function (btn, bar, num) {
      this.btn = document.getElementById(btn);
      this.bar = document.getElementById(bar);
      this.applyAmount = document.getElementById(num);
      this.step = this.bar.getElementsByTagName("DIV")[0];
      this.init();
    };
    scale.prototype = {
      init: function () {
        var f = this, g = document, b = window, m = Math;
        f.btn.onmousedown = function (e) {
          var x = (e || b.event).clientX;
          var l = this.offsetLeft;
          var max = f.bar.offsetWidth - this.offsetWidth;
          g.onmousemove = function (e) {
            var thisX = (e || b.event).clientX;
            var to = m.min(max, m.max(-2, l + (thisX - x)));
            f.btn.style.left = to + 'px';
            f.ondrag(m.round(m.max(0, to / max) * 100), to);
            b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
          };
          g.onmouseup = new Function('this.onmousemove=null');
        };
      },
      ondrag: function (pos, x) {
        var maxNum = 5000000;
        var minNum = 600000;
        this.step.style.width = Math.max(0, x) + 'px';
        var apartAmount = Math.round((pos / 100)*(maxNum-minNum));
        if(apartAmount%100000 == 0){ //apartAmount 滑动的属猪
          apartAmount = apartAmount+minNum;//如果可以被100000整除，则直接取值，再加上最小额
        }else{
          apartAmount = (parseInt(apartAmount/100000)*100000)+minNum;//获取最小的整数，再加上最小额
        }
        var num = format.replaceNum(apartAmount);
        this.applyAmount.innerHTML = 'Rp' + num;
      }
    }
    new scale('btn0', 'bar0', 'applyAmount');

    //选择期数
    $('.chooseTerm').ready(() => {
      $(".chooseTerm li p").on("click",(e) => {
        $('.chooseTerm li').removeClass('active');
        $(e.target).parents('li').addClass('active');
      });
    });

    //鼠标滑动step
    $('.loanHead').ready(() => {
      $('.loanHead .step p').on("mouseover",(e) => {
        $('.loanHead .step').removeClass('active');
        $(e.target).parents('.step').addClass('active');
        console.log($(e.target).parents('.step').attr('step'));
        this.setState({'stepImg':$(e.target).parents('.step').attr('step')})
      })
    })


  }

  //下载
  download() {
    window.open('https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID');
  }

  render() {
    return (
      <div className="PCindex loan" style={{'overflow':'auto'}}>
        <TopNav />{/*顶部导航栏*/}
        <div className="loan">
          <div>
            <div className="topBanner erea">{/*top Banner*/}
              <div className="bannerMain">
                <div className="left">
                  <div className="middleMain">
                    <div className="mainText">
                      <div className="productName">PINJAM GAMPANG</div>
                      <div className="slogan">
                        <div>INCLUSIVE FINANCE</div>
                        <div>IMPACTING LIFE</div>
                      </div>
                      <div className="download">
                        <div className="google">
                          <img onClick={this.download} style={{'cursor':'pointer'}} src={google} />
                          <label className="ojkIcon">
                            <img src={ojbk} />
                            
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="loanErea">
                    <div className="middle">
                      <div className="box">
                        <p className="title">{this.state.language == 'Id'?'Jumlah pinjaman':'Amount of loan'}</p>
                        <p className="applyAmount" id="applyAmount">Rp2.800.000</p>

                        <div className="grade_warp">
                          <div className="User_ratings User_grade" id="div_fraction0">
                            <div className="ratings_bars">
                              <div className="scale" id="bar0">
                                <div></div>
                                <span className="scroll" id="btn0">
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="title littleTitle">{this.state.language == 'Id'?'Tenor Pinjaman':'Period of loan'}</p>
                        <ul className="chooseTerm">
                          <li className="align-left">
                            <p>
                              <span>7</span>
                              <span className="day">hari</span>
                            </p>
                          </li>
                          <li className="active align-right">
                            <p style={{'margin-left':'10%'}}>
                              <span>14</span>
                              <span className="day">hari</span>
                            </p>
                          </li>
                        </ul>
                        <p className="download" onClick={this.download}>DOWN THE APP</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img className="topBgImg" src={loanTopBg} />
            </div>
            <div className="loanHead erea">
              <div className="main">
                <div className="titles">{this.state.language == 'Id'?'Cara Pengajuan':'How to apply'}</div>
                <div className="middle">
                  <div className="mainMid">
                    <div className="left">
                      <img className="phoneBg" src={headBg} />
                      <img className="phone" src={phone} />
                      <img className="phoneMain" src={require('../../../images/'+this.state.stepImg+'.png')} />
                    </div>
                    <div className="right">
                      <ul>
                        <li className="step active" step="iphone1">
                          <p className="title">{this.state.language == 'Id'?'Tahap 1 : Daftar dan pilih jumlah serta  jangka waktu pinjaman':'Step 1 : registration then select loan amount and loan period.'}</p>
                          <p className="tips">{this.state.language == 'Id'?'Gunakan nomor HP untuk masuk kemudian pilih jumlah dan jangka waktu pinjaman yang anda inginkan.':'Login with mobile number and select the amount and period of loan that you want.'}</p>
                        </li>
                        <li className="step" step="iphone2">
                          <p className="title">{this.state.language == 'Id'?'Tahap 2 : Selesaikan 3 langkah proses verifikasi':'Step 2 : complete 3 step of certification process.'}</p>
                          <p className="tips">{this.state.language == 'Id'?'Anda hanya perlu melakukan Identifikasi wajah, foto KTP, foto ID Karyawan atau foto memakai baju kerja serta mengisi data diri pribadi.':'You only need to do face recognition, ID Card photo, ID worker photo or take a picture with your work cloths and then fill your personal information .'}</p>
                        </li>
                        <li className="step" step="iphone3">
                          <p className="title">{this.state.language == 'Id'?'Tahap 3 : Kirim permohonan pinjaman':'Step 3 : submit your loan application.'}</p>
                          <p className="tips">{this.state.language == 'Id'?'Setelah melalui proses evaluasi informasi, kami akan memberitahukan anda jumlah pinjaman, kemudian anda dapat melakukan konfirmasi dan mengirimkan permohonan pinjaman.':'After verifed information,we will inform you the amount of loan, then you can conform and submit your loan application.'}</p>
                        </li>
                        <li className="step" step="iphone4">
                          <p className="title">{this.state.language == 'Id'?'Tahap 4 : Audit cepat dan dana masuk rekening':'Step 4 : rapid verify and the loan will transfer to your bank account.'}</p>
                          <p className="tips">{this.state.language == 'Id'?'Kami akan mengkaji permohonan pinjaman anda, dalam proses ini mungkin anda akan ditelepon untuk verifikasi data, setelah kajian selesai dana akan cair paling cepat di hari tersebut.':'We will verify your loan application, during this period we’ll contact you to do confirmation about some information, the loan fastest will transfer to you on the day after approval.'}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="applyMember erea">
              <div className="main">
                <div className="titles">{this.state.language == 'Id'?'Siapa saja boleh mengajukan permohonan':'Who can apply'}</div>
                <div className="middle">
                  <div className="mainMid">
                    <ul style={{'width':'62%'}}>
                      <li className="width50">
            						<div><img src={people1} /></div>
            					  </li>
                                  <li className="width50">
            						<div><img src={people2} /></div>
            					  </li>
                    </ul>
                    <ul style={{'width':'93%'}}>
                      <li className="width30">
            						<div><img src={people3} /></div>
            					  </li>
                                  <li className="width30">
            						<div><img src={people4} /></div>
            					  </li>
                                  <li className="width30">
            						<div><img src={people5} /></div>
            					</li>
                    </ul>
                    <ul style={{'width':'93%','margin-top':'2em'}}>
                      <li className="width30">{this.state.language == 'Id'?'Warga Negara Indonesia':'Indonesian citizens'}</li>
                      <li className="width30">{this.state.language == 'Id'?'Usia di atas 21 tahun':'Over the age of 21'}</li>
                      <li className="width30">{this.state.language == 'Id'?'Mempunyai sumber pendapatan yang stabil':'Stable source of income'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="indexBottom erea">{/*bottom*/}
              <PCBottom/>
            </div>
          </div>
          {/*<div className="pagination" ></div>*/}{/*高亮控件*/}
        </div>
      </div>
    );
  }
}

export default Loan;
