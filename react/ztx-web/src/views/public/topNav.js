import React from 'react';
import logo from '../../images/logo.png';
import Id from '../../images/Id.png';
import En from '../../images/En.png';
import {Link } from 'react-router';

class TopNav extends React.Component {
  state = {language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    const href = location.href;
    $('.PCnav .middle li').removeClass('active');
    $('.PCnav .AboutUs div').removeClass('active');
    if(href.indexOf('#/Loan')>=0){
      $('.PCnav .Loan').addClass('active');
    }else if(href.indexOf('#/Introduction')>=0){
      $('.PCnav .AboutUs').addClass('active');
      $('.PCnav .introduction').addClass('active');
    }else if(href.indexOf('#/Risk')>=0){
      $('.PCnav .AboutUs').addClass('active');
      $('.PCnav .Risk').addClass('active');
    }else if(href.indexOf('#/Announcement')>=0){
      $('.PCnav .AboutUs').addClass('active');
      $('.PCnav .Announcement').addClass('active');
    }else if(href.indexOf('#/HelpCenter')>=0){
      $('.PCnav .HelpCenter').addClass('active');
    }else{
      $('.PCnav .Home').addClass('active');
    }

    //点击切换语言
    $('.PCnav .lan .language').on('click',(e) => {
      if($(e.target).parents('.lanMain').html().indexOf('English')>=0){
        sessionStorage.setItem('language','En');
      }else{
        sessionStorage.setItem('language','Id');
      }
      window.location.reload();//刷新
    })
  }

  showSecNav() {
    if($('.AboutUs').find('.secNa').is(':visible')){
      $('.AboutUs').find('.secNa').css('display','none');
    }else{
      $('.AboutUs').find('.secNa').css('display','block');
    }
  }

  showSecLan() {
    if($('.PCnav .language').is(':visible')){
      $('.PCnav .language').hide();
    }else{
      $('.PCnav .language').show();
    }
  }

  render() {
    return (
      <div className="PCnav">
        <ul className="outSideUl">
          <li className="left">
            <Link className="link" to={''}><img src={logo} /></Link>
          </li>
          <li className="middle">
            <ul>
              <li className="Home active" style={this.state.language == 'Id'?{'width':'auto'}:{'width':'auto'}}>
                <Link className="link" to={''}>{this.state.language == 'Id'?'Halaman Utama':'Home'}</Link>
              </li>
              <li className="Loan" style={this.state.language == 'Id'?{'width':'auto'}:{'width':'auto'}}>
                <Link className="link" to={'/Loan'}>{this.state.language == 'Id'?'Pinjaman':'Loan'}</Link>
              </li>
              <li className="AboutUs" style={this.state.language == 'Id'?{'width':'auto'}:{'width':'auto'}} onMouseOver={this.showSecNav} onMouseOut={this.showSecNav}>
                <div className="link">{this.state.language == 'Id'?'Tentang Kami':'About Us'}</div>
                <div className="secNa" style={this.state.language == 'Id'?{'width':'11em'}:{'width':'14em'}}>
                  <div className="introduction"><Link className="link" to={'/Introduction'}>{this.state.language == 'Id'?'Profil perusahaan':'Company profile'}</Link></div>
                  <div className="Risk"><Link className="link" to={'/Risk'}>{this.state.language == 'Id'?'Disclaimer Risiko':'Risk statement'}</Link></div>
                  <div className="Announcement"><Link className="link" to={'/Announcement'}>{this.state.language == 'Id'?'Pengumuman situs':'Website announcement'}</Link></div>
                </div>
              </li>
              <li style={this.state.language == 'Id'?{'width':'auto'}:{'width':'auto'}} className="HelpCenter"><Link className="link" to={'/HelpCenter'}>{this.state.language == 'Id'?'Pusat Bantuan':'Help Center'}</Link></li>
            </ul>
          </li>
          <li className="right lan" onMouseOver={this.showSecLan} onMouseOut={this.showSecLan}>
            {/*<span className={this.state.language == 'En'?'active':''}>En</span>/<span className={this.state.language == 'Id'?'active':''}>Id</span>*/}
            <div className="PClan">
              <img src={this.state.language == 'Id'?Id:En} /><span>{this.state.language == 'Id'?'Bahasa':'language'}</span>
            </div>
            <div className="language"  style={{'display':'none'}}>
              <div className="lanMain">
                <img src={Id} /><span>Indonesian</span>
              </div>
              <div className="lanMain">
                <img src={En} /><span>English</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default TopNav;
