import React from 'react';
import TopNav from '../../public/topNav';//顶部导航
import PCBottom from '../../public/bottom';//底部

import city from '../../../images/city.jpg';


class Announcement extends React.Component {
  state = {indexs:0,language:sessionStorage.getItem('language') || 'Id'};

  componentDidMount() {
    //设置底部样式
    $('.PCindex .indexBottom').css('background-color','#ffffff');
    $('.PCindex .mainBottom .titles').css('color','#5A6169');
    $('.PCindex .PCBottom .mainDesc ul').css({'color':'#868E96','opacity':'1'});
    $('.PCindex .copyRight').css('background-color','#F8F9FA');

    //点击公告，显示公告详情
    $('.Announce li .mainInfo').on('click',(e) => {
      $('.Announce li .mainInfo .detail').slideUp();
      if($(e.target).parents('.mainInfo').siblings('.detail').is(':visible')){
        $(e.target).parents('.mainInfo').siblings('.detail').slideUp();
      }else{
        $(e.target).parents('.mainInfo').siblings('.detail').slideDown();
      }
    })
  }

  componentWillUnmount() {
    //还原底部样式
    $('.PCindex .indexBottom').css('background-color','#212529');
    $('.PCindex .copyRight').css('background-color','#ffffff');
    $('.PCindex .mainBottom .titles').css('color','#ffffff');
    $('.PCindex .PCBottom .mainDesc ul').css({'color':'#ffffff','opacity':'0.5'});
  }

  render() {
    return (
      <div className="PCindex" style={{'overflow':'auto'}}>
        <TopNav />{/*顶部导航栏*/}
        <div className="Introduction Announce">
          <div className="topBg">
            <img src={city} />
          </div>
          <div className="main announce">
            <div className="title">{this.state.language == 'Id'?'Pengumuman situs':'Website announcement'}</div>
            <ul className="announceInfo">
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Pengumuman pengaturan kerja periode HUT RI ke 73 tahun 2018</p>
                  <p className="time">13-Aug-2018</p>
                </div>
                <div className="detail">
                  <div className="name">Pelanggan yang terhormat:</div>
                  <div className="desc" style={{'margin-top': '0.8em'}}>Dengan ini kami sampaikan informasi tentang Libur Hari Raya Kemerdekaan Republik Indonesia yang ke 73 sebagai berikut :</div>
                  <div className="desc" style={{'margin-top': '0.8em'}}>
                    <div className="left">•</div>
                    <div className="right">17 Agustus 2018 adalah libur nasional Hari Raya Kemerdekaan. Selama hari tersebut, proses persetujuan dan peminjaman serta hotline Layanan Pelanggan tidak beroperasi. </div>
                  </div>
                  <div className="desc">
                    <div className="left">•</div>
                    <div className="right">Jika tanggal jatuh tempo pembayaran anda berada dalam periode ini, mohon siapkan dana lebih awal agar tidak menpengaruhi risiko pinjaman anda.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="mainInfo">
                  <p className="mianTitle">Pengumuman jadwal libur Idul Fitri 2018</p>
                  <p className="time">08-Jun-2018</p>
                </div>
                <div className="detail">
                  <div className="name">Pelanggan yang terhormat:</div>
                  <div className="desc" style={{'margin-top': '0.8em'}}>Idul Fitri akan segera tiba, dengan ini pengaturan jadwal libur kerja di perusahaan kami adalah sebagai berikut:</div>
                  <div className="desc" style={{'margin-top': '0.8em'}}>
                    <div className="left">•</div>
                    <div className="right">11 Juni 2018 hingga 20 Juni 2018 adalah hari libur cuti bersama. Selama libur tersebut, proses persetujuan dan peminjaman serta hotline layanan pelanggan tidak beroperasi. Operasi normal akan dimulai pada tanggal 21 Juni 2018. Silakan mengatur jadwal pengajuan pinjaman dan komunikasi dengan sebaik mungkin.</div>
                  </div>
                  <div className="desc">
                    <div className="left">•</div>
                    <div className="right">Jika tanggal jatuh tempo pembayaran pinjaman Anda berada dalam periode ini, harap mengatur pembayaran terlebih dahulu agar tidak mempengaruhi risiko pinjaman Anda</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="swiper-slide orange-slide indexBottom erea" style={{'padding':'2em'}}>{/*bottom*/}
          <PCBottom/>
        </div>
      </div>
    );
  }
}

export default Announcement;
