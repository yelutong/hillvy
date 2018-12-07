import React from 'react';
import facebook from '../../images/s_facebook.png';
import instagram from '../../images/s_instagram.png';
import linked from '../../images/s_linked.png';
import w_facebook from '../../images/sf_facebook.png';
import w_instagram from '../../images/sf_instagram.png';
import w_linked from '../../images/sf_linked.png';

class PCBottom extends React.Component {
  state = {whiteBottom:false,language:sessionStorage.getItem('language') || 'Id'};

  componentWillMount() {
    if(window.location.href.indexOf('/#/HelpCenter')>=0 || window.location.href.indexOf('/#/Introduction')>=0 || window.location.href.indexOf('/#/Risk')>=0 || window.location.href.indexOf('/#/Announcement')>=0){
      this.setState({whiteBottom:true});
    }else{
      this.setState({whiteBottom:false})
    }
  }

  render() {
    return (
      <div className="PCBottom">
        <div className="contactUs">
          <div className="mainBottom">
            <div className="titles">{this.state.language == 'Id'?'Hubungi Kami':'Contact Us'}</div>
            <div className="mainDesc">
              <div className="main">
                <ul>
                  <li>
                    <p className="title"><b>{this.state.language == 'Id'?'Alamat Kantor':'Address'}</b></p>
                    <p>Unit A&F, 1st Floor, The Prominence Office Tower JI. Jalur Sutera Barat No.15, Alam Sutera</p>
                  </li>
                  <li>
                    <p className="title"><b>{this.state.language == 'Id'?'Kontak Layanan Konsumen':'Customer Service'}</b></p>
                    <p className="bottomPhone">
                      <span className="phoneL">Tel：</span>
                      <span className="phoneR">
                        <label>(021) 3003 3358</label>
                      </span>
                    </p>
                    <p>Email：kpt@kreditplusteknologi.id</p>
                    <p>{this.state.language == 'Id'?'Senin-Jumat 09:00 wib s/d 17:00 wib':'Monday to Friday 09:00 AM to 05:00 PM'}</p>
                  </li>
                  <li>
                    <p className="title"><b>{this.state.language == 'Id'?'Kontak Bisnis':'Business contact'}</b></p>
                    <p>Email：marketing@kreditplusteknologi.id</p>
                  </li>
                </ul>
                <div className="shareIcon">
                  <a target="_blank" href="https://www.facebook.com/Pinjam-Gampang-171945557005609/"><img src={!this.state.whiteBottom?facebook:w_facebook} /></a>
                  <a target="_blank" style={{'margin':'0px 1.8em'}} href="https://www.instagram.com/pinjamgampang/"><img src={!this.state.whiteBottom?instagram:w_instagram} /></a>
                  <a target="_blank" href="https://www.linkedin.com/company/pt-kredit-plus-teknologi/"><img src={!this.state.whiteBottom?linked:w_linked} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyRight">
          <div className="mainBottom">©Copyright©2017 All Rights Reserved by PT.Kredit Plus Teknologi</div>
        </div>
      </div>
    );
  }
}

export default PCBottom;
