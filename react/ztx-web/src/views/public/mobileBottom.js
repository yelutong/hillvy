import React from 'react';
import {Link } from 'react-router';
import facebook from '../../images/s_facebook.png';
import instagram from '../../images/s_instagram.png';
import linked from '../../images/s_linked.png';

class MobileBottom extends React.Component {
  state = {language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    
  }

  render() {
    return (
      <div className="bottom mainErea">
        <div className="titles">{this.state.language == 'Id'?'Hubungi Kami':'Contact Us'}</div>
        <div className="main" style={{'padding':'1em 4% 0em 4%','box-sizing': 'border-box'}}>
            <p className="t">{this.state.language == 'Id'?'Kontak Layanan Konsumen':'Customer Service'}</p>
            <p className="phoneBottom">
              <span className="phoneL">Tel：</span>
              <span className="phoneR">
                <a href="tel:02130033358" className="phone">(021) 3003 3358</a>
              </span>
            </p>
            <p>Email：kpt@kreditplusteknologi.id</p>
            <p>{this.state.language == 'Id'?'Senin-Jumat 09:00 wib s/d 17:00 wib':'Monday to Friday 09:00 AM to 05:00 PM'}</p>
            <p className="shareIcon">
              <a href="https://www.facebook.com/Pinjam-Gampang-171945557005609/"><img src={facebook} /></a>
              <a style={{'margin':'0px 1.8em'}} href="https://www.instagram.com/pinjamgampang/"><img src={instagram} /></a>
              <a href="https://www.linkedin.com/company/pt-kredit-plus-teknologi/"><img src={linked} /></a>
            </p>
        </div>
        <div className="main" style={{'padding':'0px 4%','box-sizing': 'border-box'}}>
            <p className="t">{this.state.language == 'Id'?'Kontak Bisnis':'Business contact'}</p>
            <p>Email：marketing@kreditplusteknologi.id</p>
        </div>
        <div className="main" style={{'padding':'0px 4%','box-sizing': 'border-box','margin-bottom':'2em'}}>
          <p className="t">{this.state.language == 'Id'?'Alamat Kantor':'Address'}</p>
            <p>Unit A&F, 1st Floor, The Prominence Office Tower JI. Jalur Sutera Barat No.15, Alam Sutera</p>
        </div>
        <div className="copyRight">©Copyright©2017 All Rights Reserved by 
          <div>PT.Kredit Plus Teknologi</div></div>
      </div>
    );
  }
}

export default MobileBottom;
