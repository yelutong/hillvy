import React from 'react';
//import Swiper from '../../../js/idangerous.swiper.min.js';
import TopNav from '../../public/topNav';//顶部导航
import PCBottom from '../../public/bottom';//底部
 
import google from '../../../images/google.png';//google
import ojbk from '../../../images/ojbk.png';//ojbk

import advantage1 from '../../../images/advantage1.png';//advantage1
import advantage2 from '../../../images/advantage2.png';//advantage2
import advantage3 from '../../../images/advantage3.png';//advantage3



class Index extends React.Component {
  state = {indexs:0,flag:true,language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    $('.PCnav').css('background','#333333');
    /*var mySwiper = new Swiper('.swiper-container',{
      //pagination: '.pagination',
      //paginationClickable: true,
      mode: 'vertical',
      mousewheelControl:true,
      speed:1000,
      followFinger:false, //鼠标拖动时候不会动，放开才可以动
    })*/
  }

  componentWillUnmount() {
    $('.PCnav').css('background','#212529');
  }

  //下载
  download() {
    window.open('https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID');
  }

  render() {
    return (
      <div className="PCindex" style={{'overflow':'auto'}}>
        <TopNav />{/*顶部导航栏*/}
        <div className="indexEare">
          <div>
            <div className="topBanner erea">{/*top Banner*/}
              <div className="bannerMain">
                <div className="left">
                  <div className="middleMain">
                    <div className="mainText">
                      <div className="slogan">
                        <div>PT KREDIT PLUS TEKNOLOGI</div>
                        <div>IMPACTING LIFE</div>
                      </div>
                      {/*<div className="sloganDesc">
                        <div>{this.state.language == 'Id'?'3 menit! Anda bisa mendapat kredit tunai':'3 minutes! You can get a cash loan up'}</div>
                        <div>{this.state.language == 'Id'?'sampai dengan Rp5.000.000':'to Rp5.000.000'}</div>
                      </div>*/}
                      <div className="download">
                        <span onClick={this.download} style={{'cursor':'pointer'}}>Download</span>
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
              </div>
            </div>
            <div className="advantage erea">{/*advantage*/}
              <div className="advantageMain">
                <div className="titles">{this.state.language == 'Id'?'Keunggulan Kami':'Our Advantages'}</div>
                <div className="mainDesc">
                  <ul>
                    <li>
                      <div className="advantageBox">
                        <div className="middleImg">
                          <div className="img">
                            <img style={{'width':'32%'}} src={advantage1} />
                          </div>
                        </div>
                        <div className="advantageTitle">{this.state.language == 'Id'?'Nominal pinjaman tinggi':'High loan amount'}</div>
                        <p>{this.state.language == 'Id'?'hingga Rp5.000.000,-':'up to Rp5.000.000,-'}</p>
                      </div>
                    </li>
                    <li style={{'margin': '0% 3%'}}>
                      <div className="advantageBox">
                        <div className="middleImg">
                          <div className="img">
                            <img style={{'width':'60%'}} src={advantage2} />
                          </div>
                        </div>
                        <div className="advantageTitle">{this.state.language == 'Id'?'Verifikasi sederhana':'Simple verification'}</div>
                        <p>{this.state.language == 'Id'?'3 langkah untuk menyelesaikan aplikasi':'3 step to complete the application'}</p>
                      </div>
                    </li>
                    <li>
                      <div className="advantageBox">
                        <div className="middleImg">
                          <div className="img">
                            <img style={{'width':'40%'}} src={advantage3} />
                          </div>
                        </div>
                        <div className="advantageTitle">{this.state.language == 'Id'?'Bunga rendah':'Low interest rate'}</div>
                        <p>{this.state.language == 'Id'?'bunga perhari mulai dari 0,07%':'daily interest rate start from 0,07%'}</p>
                      </div>
                    </li>
                  </ul>
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

export default Index;
