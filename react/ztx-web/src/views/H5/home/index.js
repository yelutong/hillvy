import React from 'react';
import Swiper from '../../../js/idangerous.swiper.min.js';
import MobildNav from '../../public/mobildNav';//nav
import MobileBottom from '../../public/mobileBottom';//bottom
import homeh5_bg from '../../../images/home_bg@2x.png';//banner图片
import advantage1 from '../../../images/advantage1.png';//advantage
import advantage2 from '../../../images/advantage2.png';//advantage
import advantage3 from '../../../images/advantage3.png';//advantage

import ojk from '../../../images/ojk.png';//ojk


class MobileHome extends React.Component {
  state = {language:sessionStorage.getItem('language') || 'Id'};

  componentWillMount(){
    console.log(window.location.search);
      var type = window.location.search.split('?downloadUrl=')[1];
      if(type){
        location.href=type;
        //location.href="https://static.kreditplusteknologi.id/install/PinjamGampang.apk";
      }
  }

  componentDidMount() {
    setTimeout(() => {
      var mySwiper = new Swiper('.mobild-swiper-container',{
        pagination: '.pagination',
        calculateHeight : true,
        paginationClickable: true,
        initialSlide: 1,//初始页
        //autoplay : 5000,//可选选项，自动滑动
        //loop : true,//可选选项，开启循环
      })
    },100);
  


  }

  render() {
    return (
      <div className="MobileIndex">
        <MobildNav/>{/*nav*/}
        <div className="IndexTop">{/*top*/}
          <div className="mianTop">
          <div className="homeh5_bg"><img src={homeh5_bg} /></div>
            <div className="left">
              <p className="title">PT KREDIT PLUS</p> 
              <p className="title">TEKNOLOGI</p>
              <p className="title">IMPACTING LIFE</p>
              {/*<p className="slogan">{this.state.language == 'Id'?'3 menit! Anda bisa mendapat kredit tunai sampai dengan Rp5.000.000':'3 minutes! You can get a cash loan up to Rp5.000.000'}</p>*/}
            </div>
             
          </div>
          <img className="ojk" src={ojk} />
        </div>
        <div className="mainErea mainIndex">{/*advantage*/}
          <div className="titles" style={{'margin-top':'1.8em'}}>{this.state.language == 'Id'?'Keunggulan Kami':'Our Advantages'}</div>
          <div className="mobild-swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide"> 
                <div className="box">
                  <img className="advantage1" src={advantage1} />
                  <p className="advantageTitle">{this.state.language == 'Id'?'Nominal pinjaman tinggi':'High loan amount'}</p>
                  <p className="advantageDesc">{this.state.language == 'Id'?'hingga Rp5.000.000,-':'up to Rp5.000.000,-'}</p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img className="advantage2" src={advantage2} />
                  <p className="advantageTitle">{this.state.language == 'Id'?'Verifikasi sederhana':'Simple verification'}</p>
                  <p className="advantageDesc">{this.state.language == 'Id'?'3 langkah untuk menyelesaikan aplikasi':'3 step to complete the application'}</p>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box">
                  <img className="advantage3" src={advantage3} />
                  <p className="advantageTitle">{this.state.language == 'Id'?'Bunga rendah':'Low interest rate'}</p>
                  <p className="advantageDesc">{this.state.language == 'Id'?'Bunga per hari 0.1% hingga 0.5%':'Daily Interest Rate 0.1%-0.5%'}</p>
                </div>
              </div>
            </div>
            <div className="pagination"></div>
          </div>
        </div>
        <MobileBottom/>{/*bottom*/}
      </div>
    );
  }
}

export default MobileHome;
