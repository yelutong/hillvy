import React from 'react';
import {Link } from 'react-router';

import menu from '../../images/menu.png';//menu
import close from '../../images/close.png';//cloase
import down from '../../images/down.png';//down
import Id from '../../images/Id.png';//down
import En from '../../images/En.png';//down

class MobildNav extends React.Component {
  state = {language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    //显示二级菜单
    $('.hasSec').on('click', (e) => {
      event.stopPropagation();
      $(e.target).parents('.name').siblings('.sec').toggle();
      $(e.target).toggleClass('active');
    })

    //关闭菜单
    $('.close').on('click',() => {
      $('.moreNav').hide();
    })
    $('.moreNav').on('click',() => {
      $('.moreNav').hide();
    })

    //开启菜单
    $('.open').on('click',()=>{
      $('.moreNav').show();
    })

    //点击切换语言
    $('.mobileNav .language').on('click',(e) => {
      event.stopPropagation();
      if($(e.target).parents('.language').html().indexOf('English')>=0){
        sessionStorage.setItem('language','En');
      }else{
        sessionStorage.setItem('language','Id');
      }
      window.location.reload();//刷新
    })

  }

  //下载
  download() {
    location.href = 'https://play.google.com/store/apps/details?id=com.kpt.android&hl=id-ID';
  }


  render() {
    return (
      <div className="mobileNav">
        <ul className="mainNav">
          <li className="left open">
            <img src={menu} />
          </li>
          <li className="middle">PINJAM GAMPANG</li>
          <li className="right" onClick={this.download}>
            <img src={down} />
          </li>
        </ul>
        <div className="moreNav">{/*下拉遮盖层*/}
          <ul className="mainNav">
            <li className="left close">
              <img src={close} />
            </li>
            <li className="middle">PINJAM GAMPANG</li>
          </ul>
          <div className="navTitle">
            <div className="name"><Link className="link" to='/'>{this.state.language == 'Id'?'Halaman Utama':'Home'}</Link></div>
          </div>
          <div className="navTitle">
            <div className="name"><Link className="link" to='/Loan'>{this.state.language == 'Id'?'Pinjaman':'Loan'}</Link></div>
          </div>
          <div className="navTitle">
            <div className="name"><div className="hasSec">{this.state.language == 'Id'?'Tentang Kami':'About Us'}</div></div>
            <div className="sec" style={{'display':'none'}}>
              <div><Link className="link" to='/Introduction'>{this.state.language == 'Id'?'Profil perusahaan':'Company profile'}</Link></div>
              <div><Link className="link" to='/Risk'>{this.state.language == 'Id'?'Disclaimer Risiko':'Risk statement'}</Link></div>
              <div><Link className="link" to='/Announcement'>{this.state.language == 'Id'?'Pengumuman situs':'Website announcement'}</Link></div>
            </div>
          </div>
          <div className="navTitle">
            <div className="name"><Link className="link" to='/HelpCenter'>{this.state.language == 'Id'?'Pusat Bantuan':'Help Center'}</Link></div>
          </div>
          <div className="navTitle">
            <div className="name mobildlan">
              <div className="hasSec"><img src={this.state.language == 'Id'?Id:En}/><span>{this.state.language == 'Id'?'Bahasa':'language'}</span></div>
            </div>
            <div className="sec" style={{'display':'none'}}>
              <div className="language Id"><img src={Id}/><span>Indonesian</span></div>
              <div className="language En"><img src={En}/><span>English</span></div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default MobildNav;
